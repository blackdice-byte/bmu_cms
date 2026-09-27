const mongoose = require('mongoose');
const slugify = require('slugify');

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g. "Emergency & Trauma Care"
    slug: { type: String, unique: true, index: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    summary: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: 'HeartPulse' },
    image: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

serviceSchema.pre('validate', function generateSlug(next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Service', serviceSchema);
