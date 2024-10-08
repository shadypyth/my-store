// routes/couponManagement.js
const express = require('express');
const Coupon = require('../models/Coupon');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// إنشاء كوبون جديد من قبل المسؤول
router.post('/create', checkRole(['admin']), async (req, res) => {
  const { code, discountPercentage, validUntil } = req.body;

  try {
    const newCoupon = new Coupon({
      code,
      discountPercentage,
      validUntil,
    });

    await newCoupon.save();
    res.status(201).json({ message: 'تم إنشاء الكوبون بنجاح', newCoupon });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الكوبون' });
  }
});

// التحقق من صلاحية الكوبون
router.post('/validate', async (req, res) => {
  const { code } = req.body;

  try {
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ message: 'الكوبون غير موجود' });
    }

    if (new Date() > new Date(coupon.validUntil)) {
      return res.status(400).json({ message: 'الكوبون منتهي الصلاحية' });
    }

    res.status(200).json({ message: 'الكوبون صالح', coupon });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء التحقق من الكوبون' });
  }
});

module.exports = router;