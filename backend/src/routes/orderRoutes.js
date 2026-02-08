import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Order from '../models/Order.js';
import PromoCode from '../models/PromoCode.js';
import axios from 'axios';

const router = express.Router();

// Create order
router.post('/', authenticate, async (req, res) => {
  try {
    const { items, shippingAddress, deliveryType, paymentMethod, promoCode } = req.body;

    let totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    // Apply promo code
    if (promoCode) {
      const promo = await PromoCode.findOne({ code: promoCode.toUpperCase() });
      if (promo && promo.isActive) {
        if (promo.discountType === 'percentage') {
          discount = totalAmount * (promo.discountValue / 100);
          if (promo.maxDiscount) {
            discount = Math.min(discount, promo.maxDiscount);
          }
        } else {
          discount = promo.discountValue;
        }

        // Update promo usage
        promo.usageCount += 1;
        promo.usedBy.push({ user: req.user.userId, usedAt: new Date() });
        await promo.save();
      }
    }

    const finalAmount = totalAmount - discount;
    const orderNumber = `ORD-${Date.now()}`;

    const order = new Order({
      orderNumber,
      user: req.user.userId,
      items,
      totalAmount,
      discount,
      finalAmount,
      shippingAddress,
      deliveryType,
      paymentMethod,
      promoCode
    });

    await order.save();

    // Generate payment link for 'link' method
    let paymentLink = null;
    if (paymentMethod === 'link') {
      paymentLink = `https://payment.furrymarket.com/pay/${order._id}`;
    }

    // For SBP - generate QR
    if (paymentMethod === 'sbp') {
      // Here you would integrate with actual SBP provider
      const sbpData = {
        phone: shippingAddress.phone,
        amount: finalAmount,
        description: `FURRY MARKET Order ${orderNumber}`
      };
      // Call SBP API
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        ...order.toObject(),
        paymentLink
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user orders
router.get('/', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'firstName lastName phone email');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check ownership
    if (order.user._id.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin)
router.put('/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    res.json({ message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Validate promo code
router.post('/validate-promo', authenticate, async (req, res) => {
  try {
    const { code, amount } = req.body;

    const promo = await PromoCode.findOne({ 
      code: code.toUpperCase(),
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() }
    });

    if (!promo) {
      return res.status(404).json({ error: 'Promo code not found or expired' });
    }

    if (promo.minPurchaseAmount && amount < promo.minPurchaseAmount) {
      return res.status(400).json({ 
        error: `Minimum purchase amount is ${promo.minPurchaseAmount}` 
      });
    }

    if (promo.usageLimit && promo.usageCount >= promo.usageLimit) {
      return res.status(400).json({ error: 'Promo code usage limit exceeded' });
    }

    let discount = 0;
    if (promo.discountType === 'percentage') {
      discount = amount * (promo.discountValue / 100);
      if (promo.maxDiscount) {
        discount = Math.min(discount, promo.maxDiscount);
      }
    } else {
      discount = promo.discountValue;
    }

    res.json({
      valid: true,
      discount,
      finalAmount: amount - discount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
