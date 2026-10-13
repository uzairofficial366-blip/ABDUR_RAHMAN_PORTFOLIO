import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    name: {
      type: String,
      default: 'Administrator',
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
);

// Method to verify password
AdminUserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Static helper to hash password
AdminUserSchema.statics.hashPassword = async function (plainPassword) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
};

export const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

