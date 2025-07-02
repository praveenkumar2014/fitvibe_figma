import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    req.user = {
      userId: user._id,
      role: user.role,
      hasAccessPass: user.hasAccessPass
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const requireAccess = (req, res, next) => {
  if (!req.user.hasAccessPass && req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: 'Access pass required. Please purchase access pass for ₹500 to continue.',
      requiresPayment: true 
    });
  }
  next();
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

export const requireAdmin = requireRole(['admin']);
export const requireTrainer = requireRole(['trainer', 'admin']);
export const requireVendor = requireRole(['vendor', 'admin']);