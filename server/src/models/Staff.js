const mongoose = require('mongoose');
const slugify = require('slugify');

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    title: { type: String, required: true, trim: true }, // e.g. "Consultant Physician", "Professor of Surgery"
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    bio: { type: String, default: '' },
    qualifications: { type: String, default: '' },
    photo: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

staffSchema.pre('validate', function generateSlug(next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = `${slugify(this.name, { lower: true, strict: true })}-${Math.random().toString(36).slice(2, 7)}`;
  }
  next();
});

module.exports = mongoose.model('Staff', staffSchema);
