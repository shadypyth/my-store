// routes/ads.js
const express = require('express');
const Ad = require('../models/Ad');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// إنشاء إعلان جديد
router.post('/', checkRole(['small_merchant']), async (req, res) => {
  const { title, description, product, startDate, endDate } = req.body;
  const merchant = req.user._id;

  try {
    const newAd = new Ad({
      title,
      description,
      product,
      merchant,
      startDate,
      endDate,
    });

    await newAd.save();
    res.status(201).json(newAd);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الإعلان' });
  }
});

// جلب جميع الإعلانات
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find().populate('product').populate('merchant');
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الإعلانات' });
  }
});

// تعديل إعلان موجود
router.put('/:id', checkRole(['small_merchant']), async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate, isActive } = req.body;

  try {
    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ message: 'الإعلان غير موجود' });
    }

    if (ad.merchant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'ليس لديك الصلاحيات لتعديل هذا الإعلان' });
    }

    ad.title = title || ad.title;
    ad.description = description || ad.description;
    ad.startDate = startDate || ad.startDate;
    ad.endDate = endDate || ad.endDate;
    ad.isActive = isActive !== undefined ? isActive : ad.isActive;

    await ad.save();
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تعديل الإعلان' });
  }
});

// حذف إعلان
router.delete('/:id', checkRole(['small_merchant']), async (req, res) => {
  const { id } = req.params;

  try {
    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ message: 'الإعلان غير موجود' });
    }

    if (ad.merchant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'ليس لديك الصلاحيات لحذف هذا الإعلان' });
    }

    await ad.remove();
    res.status(200).json({ message: 'تم حذف الإعلان بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء حذف الإعلان' });
  }
});

module.exports = router;





