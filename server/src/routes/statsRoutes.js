const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getOverview } = require('../controllers/statsController');

const router = express.Router();

router.get('/overview', protect, authorize('admin', 'editor', 'viewer'), getOverview);

module.exports = router;
