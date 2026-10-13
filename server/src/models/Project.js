import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'Logo Designing',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: 300,
    },
    fullDescription: {
      type: String,
      trim: true,
    },
    objectives: {
      type: [String],
      default: [],
    },
    process: {
      type: [String],
      default: [],
    },
    solution: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '/images/project-placeholder.svg',
    },
    gallery: {
      type: [String],
      default: [],
    },
    tools: {
      type: [String],
      default: ['Figma', 'Adobe Photoshop'],
    },
    externalUrl: {
      type: String,
      default: '',
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    isSamplePlaceholder: {
      type: Boolean,
      default: true, // Clearly marked per requirement
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ status: 1, featured: -1, displayOrder: 1, createdAt: -1 });

export const Project = mongoose.model('Project', ProjectSchema);

