import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Register with phone
router.post('/register/phone', async (req, res) => {
  try {
    const { phone, firstName, lastName, password, confirmPassword } = req.body;

    if (!phone || !firstName || !lastName || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: 'Phone already registered' });
    }

    const user = new User({
      phone,
      firstName,
      lastName,
      password,
      authMethod: 'phone'
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login with phone
router.post('/login/phone', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone and password required' });
    }

    const user = await User.findOne({ phone }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        preferences: user.preferences
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Google Auth
router.post('/auth/google', async (req, res) => {
  try {
    const { googleId, email, firstName, lastName } = req.body;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({
        googleId,
        email,
        firstName,
        lastName,
        phone: `google_${googleId}`,
        authMethod: 'google',
        verified: true
      });
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Google auth successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { firstName, lastName, address, preferences } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        firstName,
        lastName,
        address,
        preferences,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
