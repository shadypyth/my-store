// routes/userProfile.js
const express = require('express');
const User = require('../models/User');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// جلب معلومات المستخدم الحالي
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب معلومات المستخدم' });
  }
});

// تحديث معلومات المستخدم
router.put('/update', async (req, res) => {
  const { name, email, address, phoneNumber } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();
    res.status(200).json({ message: 'تم تحديث معلومات المستخدم بنجاح', user });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث معلومات المستخدم' });
  }
});

// حذف حساب المستخدم
router.delete('/delete', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    await User.deleteOne({ _id: req.user._id });
    res.status(200).json({ message: 'تم حذف الحساب بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء حذف الحساب' });
  }
});

module.exports = router;