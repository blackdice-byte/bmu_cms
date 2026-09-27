const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['contact', 'appointment'], default: 'contact' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '' },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    preferredDate: { type: Date },
    status: { type: String, enum: ['new', 'in-progress', 'resolved'], default: 'new' },
    handledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
