const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getAvailability,
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiryStatus,
  deleteInquiry,
} = require('../controllers/inquiryController');

const router = express.Router();

// Public: anyone can check open appointment slots or submit a request
router.get('/availability', getAvailability);
router.post('/', createInquiry);

// Admin + editor + viewer: everyone with dashboard access can view inquiries
router.get('/', protect, authorize('admin', 'editor', 'viewer'), getInquiries);
router.get('/:id', protect, authorize('admin', 'editor', 'viewer'), getInquiry);
// Admin + editor: only they can update status or remove an inquiry
router.put('/:id', protect, authorize('admin', 'editor'), updateInquiryStatus);
router.delete('/:id', protect, authorize('admin'), deleteInquiry);

module.exports = router;
