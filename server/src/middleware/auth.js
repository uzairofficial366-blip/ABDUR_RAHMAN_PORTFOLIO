import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser.js';

export const requireAuth = async (req, res, next) => {
  try {
    let token = null;

    // Check Authorization Header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. No access token provided.'
      });
    }

    const secret = process.env.JWT_SECRET || 'fallback_secret_for_dev_mode';
    const decoded = jwt.verify(token, secret);

    const user = await AdminUser.findById(decoded.userId).select('-passwordHash');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session. Admin user no longer exists.'
      });
    }

    req.admin = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization token.'
    });
  }
};

