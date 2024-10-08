// routes/userLogin.js
const express = require('express');
const User = require('../models/User');
const { generateToken } = require('../services/jwtTokenService');
const router = express.Router();
const bcrypt = require('bcryptjs');

// تسجيل الدخول
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'كلمة المرور غير صحيحة' });
    }

    const token = generateToken(user._id, user.role);
    res.status(200).json({ message: 'تم تسجيل الدخول بنجاح', token });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول' });
  }
});

module.exports = router;