import mongoose from 'mongoose';

const ContactEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: 150,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required'],
      default: 'Logo Designing',
    },
    budget: {
      type: String,
      default: 'Flexible / Not Specified',
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: 5000,
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'responded', 'archived'],
      default: 'new',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    emailStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed', 'not_configured'],
      default: 'pending',
    },
    emailError: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

ContactEnquirySchema.index({ status: 1, isRead: 1, createdAt: -1 });

export const ContactEnquiry = mongoose.model('ContactEnquiry', ContactEnquirySchema);

