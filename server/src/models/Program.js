const mongoose = require('mongoose');
const slugify = require('slugify');

const programSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g. "MBBS", "B.NSc Nursing Science"
    slug: { type: String, unique: true, index: true },
    level: { type: String, enum: ['undergraduate', 'postgraduate'], default: 'undergraduate' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    duration: { type: String, default: '' }, // e.g. "6 years"
    summary: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

programSchema.pre('validate', function generateSlug(next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Program', programSchema);
