// routes/shippingAddress.js
const express = require('express');
const ShippingAddress = require('../models/ShippingAddress');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// إنشاء عنوان شحن جديد
router.post('/create', async (req, res) => {
  const { fullName, addressLine1, addressLine2, city, state, postalCode, country, phoneNumber } = req.body;

  try {
    const newAddress = new ShippingAddress({
      user: req.user._id,
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phoneNumber,
    });

    await newAddress.save();
    res.status(201).json({ message: 'تم إنشاء عنوان الشحن بنجاح', newAddress });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء عنوان الشحن' });
  }
});

// جلب جميع عناوين الشحن للمستخدم الحالي
router.get('/', async (req, res) => {
  try {
    const addresses = await ShippingAddress.find({ user: req.user._id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب عناوين الشحن' });
  }
});

// تحديث عنوان شحن موجود
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { fullName, addressLine1, addressLine2, city, state, postalCode, country, phoneNumber } = req.body;

  try {
    const address = await ShippingAddress.findById(id);
    if (!address) {
      return res.status(404).json({ message: 'عنوان الشحن غير موجود' });
    }

    // تحديث الحقول بناءً على البيانات المدخلة
    address.fullName = fullName || address.fullName;
    address.addressLine1 = addressLine1 || address.addressLine1;
    address.addressLine2 = addressLine2 || address.addressLine2;
    address.city = city || address.city;
    address.state = state || address.state;
    address.postalCode = postalCode || address.postalCode;
    address.country = country || address.country;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.updatedAt = Date.now();

    await address.save();
    res.status(200).json({ message: 'تم تحديث عنوان الشحن بنجاح', address });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث عنوان الشحن' });
  }
});

module.exports = router;