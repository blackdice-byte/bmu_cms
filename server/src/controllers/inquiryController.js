const Inquiry = require('../models/Inquiry');
const asyncHandler = require('../utils/asyncHandler');
const { notifyNewInquiry } = require('../utils/notifyWebhook');

// Hospital appointment hours: hourly slots, Monday-Saturday (closed Sundays).
const CLINIC_SLOT_TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const parseDateOnly = (value) => {
  // Interprets an incoming "YYYY-MM-DD" as a calendar day, independent of timezone
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return null;
  return { start: new Date(Date.UTC(year, month - 1, day, 0, 0, 0)), end: new Date(Date.UTC(year, month - 1, day, 23, 59, 59)), dayOfWeek: new Date(Date.UTC(year, month - 1, day)).getUTCDay() };
};

// Public: given a department + date, returns which hourly slots are still open
// (checked against existing, non-cancelled appointment inquiries in Mongo -
// this is real availability, not a static list).
const getAvailability = asyncHandler(async (req, res) => {
  const { department, date } = req.query;

  if (!department || !date) {
    return res.status(400).json({ message: 'department and date are required' });
  }

  const parsed = parseDateOnly(date);
  if (!parsed) return res.status(400).json({ message: 'Invalid date' });

  // Closed Sundays
  if (parsed.dayOfWeek === 0) {
    return res.json({ data: { date, slots: [] } });
  }

  const booked = await Inquiry.find({
    type: 'appointment',
    department,
    status: { $ne: 'resolved' },
    preferredDate: { $gte: parsed.start, $lte: parsed.end },
  }).select('preferredTime');

  const bookedTimes = new Set(booked.map((b) => b.preferredTime));
  const isToday = new Date().toDateString() === new Date(`${date}T00:00:00`).toDateString();
  const nowHour = new Date().getHours();

  const slots = CLINIC_SLOT_TIMES.map((time) => {
    const hour = parseInt(time.split(':')[0], 10);
    const isPast = isToday && hour <= nowHour;
    return { time, available: !bookedTimes.has(time) && !isPast };
  });

  res.json({ data: { date, slots } });
});

// Public: submit a contact message or appointment request
const createInquiry = asyncHandler(async (req, res) => {
  const { type, name, email, phone, subject, message, department, preferredDate, preferredTime } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' });
  }

  if (type === 'appointment') {
    if (!department || !preferredDate || !preferredTime) {
      return res.status(400).json({ message: 'Department, date and time slot are required for appointments' });
    }

    const parsed = parseDateOnly(preferredDate);
    const alreadyBooked = await Inquiry.findOne({
      type: 'appointment',
      department,
      status: { $ne: 'resolved' },
      preferredTime,
      preferredDate: { $gte: parsed.start, $lte: parsed.end },
    });
    if (alreadyBooked) {
      return res.status(409).json({ message: 'That time slot was just booked. Please pick another.' });
    }
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
    preferredTime: preferredTime || undefined,
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

module.exports = { getAvailability, createInquiry, getInquiries, getInquiry, updateInquiryStatus, deleteInquiry };
