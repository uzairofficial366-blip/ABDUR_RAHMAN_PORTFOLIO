import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    authorTitle: {
      type: String,
      default: '',
      trim: true,
    },
    company: {
      type: String,
      default: '',
      trim: true,
    },
    quote: {
      type: String,
      required: [true, 'Quote text is required'],
      trim: true,
    },
    photo: {
      type: String,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: false, // Must be verified by admin
    },
    isPublished: {
      type: Boolean,
      default: false, // Default unpublished
    },
  },
  {
    timestamps: true,
  }
);

TestimonialSchema.index({ isPublished: 1, isVerified: 1, createdAt: -1 });

export const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

