// routes/wishlist.js
const express = require('express');
const Wishlist = require('../models/Wishlist');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// إضافة منتج إلى قائمة الرغبات
router.post('/add', async (req, res) => {
  const { productId } = req.body;
  const user = req.user._id;

  try {
    let wishlist = await Wishlist.findOne({ user });
    if (!wishlist) {
      wishlist = new Wishlist({ user, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }
    wishlist.updatedAt = Date.now();

    await wishlist.save();
    res.status(200).json({ message: 'تم إضافة المنتج إلى قائمة الرغبات بنجاح', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة المنتج إلى قائمة الرغبات' });
  }
});

// جلب قائمة الرغبات للمستخدم الحالي
router.get('/', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب قائمة الرغبات' });
  }
});

// إزالة منتج من قائمة الرغبات
router.delete('/remove/:productId', async (req, res) => {
  const { productId } = req.params;
  const user = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user });
    if (!wishlist) {
      return res.status(404).json({ message: 'قائمة الرغبات غير موجودة' });
    }

    wishlist.products = wishlist.products.filter((product) => product.toString() !== productId);
    wishlist.updatedAt = Date.now();

    await wishlist.save();
    res.status(200).json({ message: 'تم إزالة المنتج من قائمة الرغبات بنجاح', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إزالة المنتج من قائمة الرغبات' });
  }
});

module.exports = router;