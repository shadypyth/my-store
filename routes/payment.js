// routes/payment.js
const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');  // ضع مفتاحك السري من Stripe هنا
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;  // الحصول على المبلغ المطلوب للدفع

  try {
    // إنشاء طلب دفع جديد باستخدام Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,  // المبلغ هنا بالسنتات (لذا يتم ضربه في 100)
      currency: 'usd',
      payment_method_types: ['card'],  // دعم بطاقات الائتمان
    });

    res.json({
      clientSecret: paymentIntent.client_secret,  // إعادة الـ clientSecret إلى الواجهة الأمامية
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Error creating payment intent' });
  }
});

module.exports = router;

