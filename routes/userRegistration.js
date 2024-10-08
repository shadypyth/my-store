// routes/userRegistration.js
const express = require('express');
const User = require('../models/User');
const sendWelcomeEmail = require('../services/userRegistrationNotification');
const router = express.Router();

// تسجيل مستخدم جديد
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // التحقق مما إذا كان البريد الإلكتروني مسجلاً مسبقاً
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'البريد الإلكتروني مسجل بالفعل' });
    }

    // إنشاء مستخدم جديد
    const newUser = new User({ name, email, password });
    await newUser.save();

    // إرسال بريد إلكتروني ترحيبي
    await sendWelcomeEmail(email, name);

    res.status(201).json({ message: 'تم تسجيل المستخدم بنجاح', newUser });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تسجيل المستخدم' });
  }
});

module.exports = router;