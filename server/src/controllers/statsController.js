const asyncHandler = require('../utils/asyncHandler');
const Department = require('../models/Department');
const Staff = require('../models/Staff');
const Program = require('../models/Program');
const Service = require('../models/Service');
const News = require('../models/News');
const Gallery = require('../models/Gallery');
const Event = require('../models/Event');
const Page = require('../models/Page');
const Inquiry = require('../models/Inquiry');
const User = require('../models/User');

// GET /api/stats/overview - powers the admin dashboard summary cards
const getOverview = asyncHandler(async (req, res) => {
  const [
    departments,
    staff,
    programs,
    services,
    news,
    gallery,
    events,
    pages,
    newInquiries,
    totalInquiries,
    users,
    recentInquiries,
    recentNews,
  ] = await Promise.all([
    Department.countDocuments(),
    Staff.countDocuments(),
    Program.countDocuments(),
    Service.countDocuments(),
    News.countDocuments(),
    Gallery.countDocuments(),
    Event.countDocuments(),
    Page.countDocuments(),
    Inquiry.countDocuments({ status: 'new' }),
    Inquiry.countDocuments(),
    User.countDocuments(),
    Inquiry.find().sort('-createdAt').limit(5),
    News.find().sort('-createdAt').limit(5).select('title status createdAt'),
  ]);

  res.json({
    data: {
      counts: { departments, staff, programs, services, news, gallery, events, pages, users, totalInquiries, newInquiries },
      recentInquiries,
      recentNews,
    },
  });
});

module.exports = { getOverview };
