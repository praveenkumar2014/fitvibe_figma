import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { sendEmail } from '../utils/email.js';
import { sendSMS } from '../utils/sms.js';
import { generateOTP } from '../utils/helpers.js';

const router = express.Router();

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').trim().isLength({ min: 2 }),
  body('lastName').trim().isLength({ min: 2 }),
  body('phone').isMobilePhone('en-IN')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, phone, role = 'user' } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with this email or phone' 
      });
    }

    // Create user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
      verification: {
        emailToken: generateOTP(),
        phoneToken: generateOTP(),
        emailTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        phoneTokenExpires: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      }
    });

    await user.save();

    // Send verification email and SMS
    await sendEmail(
      email,
      'Verify your FitVibe account',
      `Your verification code is: ${user.verification.emailToken}`
    );

    await sendSMS(
      phone,
      `Your FitVibe verification code is: ${user.verification.phoneToken}`
    );

    res.status(201).json({
      message: 'User registered successfully. Please verify your email and phone.',
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(400).json({ message: 'Account is deactivated' });
    }

    // Update last login
    user.lastLogin = new Date();
    user.loginHistory.push({
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        hasAccessPass: user.hasAccessPass,
        isVerified: user.isVerified,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify Email
router.post('/verify-email', async (req, res) => {
  try {
    const { userId, token } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user' });
    }

    if (user.verification.emailToken !== token || 
        user.verification.emailTokenExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verification.emailToken = undefined;
    user.verification.emailTokenExpires = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify Phone
router.post('/verify-phone', async (req, res) => {
  try {
    const { userId, token } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user' });
    }

    if (user.verification.phoneToken !== token || 
        user.verification.phoneTokenExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.verification.phoneToken = undefined;
    user.verification.phoneTokenExpires = undefined;
    await user.save();

    res.json({ message: 'Phone verified successfully' });
  } catch (error) {
    console.error('Phone verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Google OAuth
router.post('/google', async (req, res) => {
  try {
    const { googleToken, userData } = req.body;
    
    // Verify Google token (implement Google OAuth verification)
    // This is a simplified version - implement proper Google OAuth verification
    
    let user = await User.findOne({ 
      $or: [
        { email: userData.email },
        { 'socialAuth.googleId': userData.googleId }
      ]
    });

    if (user) {
      // Update Google ID if not set
      if (!user.socialAuth.googleId) {
        user.socialAuth.googleId = userData.googleId;
        await user.save();
      }
    } else {
      // Create new user
      user = new User({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar,
        isVerified: true,
        socialAuth: {
          googleId: userData.googleId
        }
      });
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        hasAccessPass: user.hasAccessPass,
        isVerified: user.isVerified,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// LinkedIn OAuth
router.post('/linkedin', async (req, res) => {
  try {
    const { linkedinToken, userData } = req.body;
    
    // Verify LinkedIn token (implement LinkedIn OAuth verification)
    // This is a simplified version - implement proper LinkedIn OAuth verification
    
    let user = await User.findOne({ 
      $or: [
        { email: userData.email },
        { 'socialAuth.linkedinId': userData.linkedinId }
      ]
    });

    if (user) {
      // Update LinkedIn ID if not set
      if (!user.socialAuth.linkedinId) {
        user.socialAuth.linkedinId = userData.linkedinId;
        await user.save();
      }
    } else {
      // Create new user
      user = new User({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar,
        isVerified: true,
        socialAuth: {
          linkedinId: userData.linkedinId
        }
      });
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        hasAccessPass: user.hasAccessPass,
        isVerified: user.isVerified,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('LinkedIn OAuth error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot Password
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = generateOTP(6);
    user.resetPassword = {
      token: resetToken,
      expires: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    };
    await user.save();

    // Send reset email
    await sendEmail(
      email,
      'Reset your FitVibe password',
      `Your password reset code is: ${resetToken}. This code expires in 10 minutes.`
    );

    res.json({ message: 'Password reset code sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password
router.post('/reset-password', [
  body('email').isEmail().normalizeEmail(),
  body('token').isLength({ min: 6, max: 6 }),
  body('newPassword').isLength({ min: 6 })
], async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    const user = await User.findOne({ 
      email,
      'resetPassword.token': token,
      'resetPassword.expires': { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Update password
    user.password = newPassword;
    user.resetPassword = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;