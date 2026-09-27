const Inquiry = require('../models/Inquiry');
const asyncHandler = require('../utils/asyncHandler');
const { notifyNewInquiry } = require('../utils/notifyWebhook');

// Public: submit a contact message or appointment request
const createInquiry = asyncHandler(async (req, res) => {
  const { type, name, email, phone, subject, message, department, preferredDate } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' });
  }

  const inquiry = await Inquiry.create({
    type: type === 'appointment' ? 'appointment' : 'contact',
    name,
    email,
    phone,
    subject,
    message,
    department: department || undefined,
    preferredDate: preferredDate || undefined,
  });

  notifyNewInquiry(inquiry); // fire-and-forget

  res.status(201).json({ data: { _id: inquiry._id } });
});

// Admin/editor: list all inquiries
const getInquiries = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.type) filter.type = req.query.type;
  if (req.query.status) filter.status = req.query.status;

  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);

  const [items, total] = await Promise.all([
    Inquiry.find(filter)
      .populate('department', 'name')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(limit),
    Inquiry.countDocuments(filter),
  ]);

  res.json({ data: items, pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 } });
});

const getInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id).populate('department', 'name');
  if (!inquiry) return res.status(404).json({ message: 'Not found' });
  res.json({ data: inquiry });
});

const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const inquiry = await Inquiry.findByIdAndUpdate(
    req.params.id,
    { status, handledBy: req.user._id },
    { new: true, runValidators: true }
  );
  if (!inquiry) return res.status(404).json({ message: 'Not found' });
  res.json({ data: inquiry });
});

const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) return res.status(404).json({ message: 'Not found' });
  res.json({ data: { _id: req.params.id } });
});

module.exports = { createInquiry, getInquiries, getInquiry, updateInquiryStatus, deleteInquiry };
