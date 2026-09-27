const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    visitDate: { type: Date, default: Date.now, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    symptoms: { type: String, default: '' },
    diagnosis: { type: String, default: '' },
    treatment: { type: String, default: '' },
    notes: { type: String, default: '' },
    vitals: {
      bloodPressure: { type: String, default: '' },
      temperature: { type: String, default: '' },
      weight: { type: String, default: '' },
      height: { type: String, default: '' },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
