// routes/refundManagement.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// تقديم طلب استرداد من قبل المستخدم
router.post('/request-refund/:orderId', checkRole(['user']), async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'ليس لديك الصلاحيات لطلب استرداد لهذا الطلب' });
    }

    // تقديم طلب استرداد باستخدام Stripe
    const refund = await stripe.refunds.create({
      payment_intent: order.paymentIntentId,
    });

    order.status = 'Refund Requested';
    order.updatedAt = Date.now();
    await order.save();

    res.status(200).json({ message: 'تم تقديم طلب الاسترداد بنجاح', refund });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تقديم طلب الاسترداد' });
  }
});

module.exports = router;