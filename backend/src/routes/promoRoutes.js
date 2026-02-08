import express from 'express';
import PromoCode from '../models/PromoCode.js';

const router = express.Router();

// Get active promo codes
router.get('/', async (req, res) => {
  try {
    const promos = await PromoCode.find({
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() }
    }).select('code discountType discountValue maxDiscount minPurchaseAmount -usedBy');

    res.json(promos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
