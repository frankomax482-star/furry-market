import express from 'express';
import Product from '../models/Product.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, rating, page = 1, limit = 20, sort = '-createdAt' } = req.query;
    
    let filter = { isActive: true };

    if (search) {
      filter.$text = { $search: search };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (rating) {
      filter.ratings = { $gte: parseFloat(rating) };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter)
      .populate('category')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('seller', 'firstName lastName avatar');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find({ category: req.params.categoryId, isActive: true })
      .populate('category')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments({ category: req.params.categoryId, isActive: true });

    res.json({
      total,
      pages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recommend products
router.get('/recommended/top', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ ratings: -1, delivered: -1 })
      .limit(20)
      .populate('category');

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
