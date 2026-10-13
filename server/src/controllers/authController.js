import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser.js';
import { loginSchema } from '../validators/schemas.js';

export const login = async (req, res, next) => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parseResult.data;
    const user = await AdminUser.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials',
      });
    }

    const secret = process.env.JWT_SECRET || 'fallback_secret_for_dev_mode';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      secret,
      { expiresIn }
    );

    // Set secure cookie if possible
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin,
  });
};

export const logout = async (req, res) => {
  res.clearCookie('admin_token');
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

