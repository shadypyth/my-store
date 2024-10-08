// routes/productReviews.js
const express = require('express');
const ProductReview = require('../models/ProductReview');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// إضافة مراجعة جديدة لمنتج
router.post('/add', async (req, res) => {
  const { product, rating, comment } = req.body;
  const user = req.user._id;

  try {
    const newReview = new ProductReview({
      product,
      user,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: 'تم إضافة المراجعة بنجاح', newReview });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة المراجعة' });
  }
});

// جلب جميع المراجعات لمنتج معين
router.get('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await ProductReview.find({ product: productId }).populate('user', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب المراجعات' });
  }
});

module.exports = router;