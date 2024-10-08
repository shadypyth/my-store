// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// تسجيل مستخدم جديد
router.post('/register', async (req, res) => {
  const { name, email, password, role, address, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'المستخدم موجود بالفعل' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, // تحديد الدور عند التسجيل
      address,
      phoneNumber,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, userId: newUser._id, role: newUser.role });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تسجيل المستخدم' });
  }
});

// Middleware للتحقق من الصلاحيات
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'ليس لديك الصلاحيات للوصول إلى هذا المورد' });
    }
    next();
  };
};

// مثال استخدام Middleware للتحقق من الأدوار
router.get('/admin-only', checkRole(['store_owner']), (req, res) => {
  res.status(200).json({ message: 'مرحبًا بك يا صاحب المتجر!' });
});

module.exports = router;
