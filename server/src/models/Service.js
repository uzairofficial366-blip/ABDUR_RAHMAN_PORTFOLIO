import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true,
    },
    icon: {
      type: String,
      default: 'Layout',
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ServiceSchema.index({ isPublished: 1, displayOrder: 1 });

export const Service = mongoose.model('Service', ServiceSchema);

