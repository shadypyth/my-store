// routes/adminUserManagement.js
const express = require('express');
const User = require('../models/User');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// جلب جميع المستخدمين
router.get('/users', checkRole(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب المستخدمين' });
  }
});

// تحديث بيانات المستخدم من قبل المسؤول
router.put('/update-user/:userId', checkRole(['admin']), async (req, res) => {
  const { userId } = req.params;
  const { name, email, role, isActive } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.isActive = isActive !== undefined ? isActive : user.isActive;

    await user.save();
    res.status(200).json({ message: 'تم تحديث بيانات المستخدم بنجاح', user });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث بيانات المستخدم' });
  }
});

// حذف مستخدم من قبل المسؤول
router.delete('/delete-user/:userId', checkRole(['admin']), async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    await User.deleteOne({ _id: userId });
    res.status(200).json({ message: 'تم حذف المستخدم بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء حذف المستخدم' });
  }
});

module.exports = router;