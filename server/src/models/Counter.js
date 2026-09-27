const mongoose = require('mongoose');

// Backs atomic auto-incrementing IDs (e.g. Patient.patientId) via findByIdAndUpdate's
// $inc, which Mongo executes atomically - safe under concurrent inserts, unlike
// deriving a sequence number from countDocuments().
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

module.exports = mongoose.model('Counter', counterSchema);
