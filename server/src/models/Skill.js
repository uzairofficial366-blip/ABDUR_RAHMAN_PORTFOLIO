import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Design', 'Tools', 'Marketing & SEO', 'Media'],
      default: 'Design',
    },
    icon: {
      type: String,
      default: 'Sparkles',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
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

SkillSchema.index({ isPublished: 1, displayOrder: 1 });

export const Skill = mongoose.model('Skill', SkillSchema);

