import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1 })
      .populate('parent', 'name');

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get category with subcategories
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    const subcategories = await Category.find({ parent: req.params.id, isActive: true });

    res.json({
      category,
      subcategories
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
