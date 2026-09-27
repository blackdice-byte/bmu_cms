const mongoose = require('mongoose');
const Counter = require('./Counter');

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, unique: true, index: true },
    fullName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
    phone: { type: String, default: '' },
    email: { type: String, default: '', trim: true },
    address: { type: String, default: '' },
    bloodGroup: {
      type: String,
      enum: ['Unknown', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      default: 'Unknown',
    },
    genotype: { type: String, enum: ['Unknown', 'AA', 'AS', 'SS', 'AC'], default: 'Unknown' },
    allergies: { type: String, default: '' },
    emergencyContactName: { type: String, default: '' },
    emergencyContactPhone: { type: String, default: '' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Human-readable sequential ID (e.g. BMU-P-00001) generated on first save -
// separate from Mongo's _id, which is what's actually used in API routes.
// Backed by an atomic counter (not countDocuments()) so it stays unique even
// when several patients are created concurrently - Model.create() with an
// array runs each save() in parallel, not sequentially.
patientSchema.pre('validate', async function generatePatientId(next) {
  if (!this.patientId) {
    const counter = await Counter.findByIdAndUpdate(
      'patientId',
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );
    this.patientId = `BMU-P-${String(counter.seq).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Patient', patientSchema);
