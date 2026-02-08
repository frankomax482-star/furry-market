import express from 'express';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { firstName, lastName, email, address, dateOfBirth } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        firstName,
        lastName,
        email,
        address,
        dateOfBirth,
        updatedAt: new Date()
      },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle theme
router.put('/theme', authenticate, async (req, res) => {
  try {
    const { theme } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { 'preferences.theme': theme },
      { new: true }
    ).select('preferences');

    res.json({ message: 'Theme updated', preferences: user.preferences });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
