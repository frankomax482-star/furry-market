import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import PromoCode from '../models/PromoCode.js';

const router = express.Router();

// Middleware to check admin
router.use(authenticate);
router.use(authorize(['admin']));

// ========== PRODUCT MANAGEMENT ==========

// Add product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, discountPrice, category, images, stock, attributes, tags } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      category,
      images,
      mainImage: images?.[0]?.url,
      stock,
      attributes,
      tags,
      seller: req.user.userId
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    res.json({ message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products (admin view)
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('seller', 'firstName lastName');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== CATEGORY MANAGEMENT ==========

// Add category
router.post('/categories', async (req, res) => {
  try {
    const { name, description, image, parent, slug } = req.body;

    const category = new Category({
      name,
      description,
      image,
      parent,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-')
    });

    await category.save();
    res.status(201).json({ message: 'Category added', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update category
router.put('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Category updated', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete category
router.delete('/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== ADMIN MANAGEMENT ==========

// Add admin
router.post('/admins', async (req, res) => {
  try {
    const { phone, email, firstName, lastName, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const admin = new User({
      phone,
      email,
      firstName,
      lastName,
      password,
      role: 'admin',
      authMethod: 'phone'
    });

    await admin.save();
    res.status(201).json({ message: 'Admin added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove admin
router.delete('/admins/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { role: 'user' });
    res.json({ message: 'Admin removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== PROMO CODE MANAGEMENT ==========

// Create promo code
router.post('/promos', async (req, res) => {
  try {
    const { code, discountType, discountValue, maxDiscount, minPurchaseAmount, validFrom, validUntil, usageLimit } = req.body;

    const promo = new PromoCode({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      maxDiscount,
      minPurchaseAmount,
      validFrom,
      validUntil,
      usageLimit,
      createdBy: req.user.userId
    });

    await promo.save();
    res.status(201).json({ message: 'Promo code created', promo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all promos
router.get('/promos', async (req, res) => {
  try {
    const promos = await PromoCode.find().populate('createdBy', 'firstName lastName');
    res.json(promos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update promo
router.put('/promos/:id', async (req, res) => {
  try {
    const promo = await PromoCode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Promo updated', promo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete promo
router.delete('/promos/:id', async (req, res) => {
  try {
    await PromoCode.findByIdAndDelete(req.params.id);
    res.json({ message: 'Promo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard stats
router.get('/stats/dashboard', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalUsers = await User.countDocuments({ role: 'user' });

    res.json({
      totalProducts,
      totalCategories,
      totalAdmins,
      totalUsers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
