// routes/payment.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// إنشاء نية دفع جديدة
router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // إنشاء نية دفع باستخدام Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // المبلغ بالسنتات
      currency: currency || 'usd',
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء نية الدفع' });
  }
});

// استرداد تفاصيل نية الدفع
router.get('/payment-intent/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء استرداد تفاصيل نية الدفع' });
  }
});

module.exports = router;

