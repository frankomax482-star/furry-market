import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  promoCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PromoCode'
  },
  discount: {
    type: Number,
    default: 0
  },
  finalAmount: Number,
  shippingAddress: {
    street: String,
    city: String,
    region: String,
    postalCode: String,
    country: String,
    phone: String,
    name: String
  },
  deliveryType: {
    type: String,
    enum: ['online', 'offline', 'pickup'],
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['sbp', 'card', 'cash', 'link'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  paymentLink: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },
  trackingNumber: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', orderSchema);
