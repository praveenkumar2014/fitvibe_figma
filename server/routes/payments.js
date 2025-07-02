import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Consultation from '../models/Consultation.js';

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order for access pass (₹500)
router.post('/create-access-order', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (user.hasAccessPass) {
      return res.status(400).json({ message: 'Access pass already purchased' });
    }

    const options = {
      amount: 50000, // ₹500 in paise
      currency: 'INR',
      receipt: `access_${user._id}_${Date.now()}`,
      notes: {
        userId: user._id.toString(),
        type: 'access_pass',
        description: 'FitVibe Access Pass - Unlock full platform access'
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Create access order error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Verify access pass payment
router.post('/verify-access-payment', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Update user access
    const user = await User.findById(req.user.userId);
    user.hasAccessPass = true;
    user.accessPassPurchasedAt = new Date();
    await user.save();

    res.json({ 
      message: 'Access pass activated successfully',
      hasAccess: true 
    });
  } catch (error) {
    console.error('Verify access payment error:', error);
    res.status(500).json({ message: 'Payment verification failed' });
  }
});

// Create order for products
router.post('/create-product-order', auth, async (req, res) => {
  try {
    const { items, shippingAddress, total } = req.body;

    const options = {
      amount: total * 100, // Convert to paise
      currency: 'INR',
      receipt: `order_${req.user.userId}_${Date.now()}`,
      notes: {
        userId: req.user.userId,
        type: 'product_order',
        itemCount: items.length
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create order in database
    const order = new Order({
      user: req.user.userId,
      items,
      shippingAddress,
      pricing: {
        subtotal: total - (shippingAddress.shipping || 0),
        shipping: shippingAddress.shipping || 0,
        total
      },
      payment: {
        method: 'upi',
        razorpayOrderId: razorpayOrder.id
      }
    });

    await order.save();

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      orderNumber: order.orderNumber
    });
  } catch (error) {
    console.error('Create product order error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Verify product payment
router.post('/verify-product-payment', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderNumber } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Update order
    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.payment.status = 'completed';
    order.payment.razorpayPaymentId = razorpay_payment_id;
    order.payment.razorpaySignature = razorpay_signature;
    order.payment.paidAt = new Date();
    order.status = 'confirmed';

    await order.save();

    res.json({ 
      message: 'Payment successful',
      order: order 
    });
  } catch (error) {
    console.error('Verify product payment error:', error);
    res.status(500).json({ message: 'Payment verification failed' });
  }
});

// Create consultation payment
router.post('/create-consultation-order', auth, async (req, res) => {
  try {
    const { consultationId } = req.body;

    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    if (consultation.payment.status === 'completed') {
      return res.status(400).json({ message: 'Consultation already paid' });
    }

    const options = {
      amount: consultation.pricing.total * 100, // Convert to paise
      currency: 'INR',
      receipt: `consultation_${consultationId}_${Date.now()}`,
      notes: {
        userId: req.user.userId,
        consultationId: consultationId,
        type: 'consultation',
        consultantId: consultation.consultant.toString()
      }
    };

    const order = await razorpay.orders.create(options);

    consultation.payment.razorpayOrderId = order.id;
    await consultation.save();

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Create consultation order error:', error);
    res.status(500).json({ message: 'Failed to create consultation order' });
  }
});

// Verify consultation payment
router.post('/verify-consultation-payment', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, consultationId } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Update consultation
    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    consultation.payment.status = 'completed';
    consultation.payment.razorpayPaymentId = razorpay_payment_id;
    consultation.payment.paidAt = new Date();
    consultation.status = 'confirmed';

    // Generate meeting URL
    await consultation.generateMeetingUrl();

    res.json({ 
      message: 'Consultation payment successful',
      consultation: consultation 
    });
  } catch (error) {
    console.error('Verify consultation payment error:', error);
    res.status(500).json({ message: 'Payment verification failed' });
  }
});

// Get payment history
router.get('/history', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Get product orders
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get consultations
    const consultations = await Consultation.find({ user: req.user.userId })
      .populate('consultant', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get access pass info
    const user = await User.findById(req.user.userId);
    const accessPass = user.hasAccessPass ? {
      type: 'access_pass',
      amount: 500,
      status: 'completed',
      purchasedAt: user.accessPassPurchasedAt
    } : null;

    res.json({
      orders,
      consultations,
      accessPass,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: orders.length + consultations.length
      }
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ message: 'Failed to fetch payment history' });
  }
});

export default router;