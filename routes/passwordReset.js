// routes/passwordReset.js
const express = require('express');
const User = require('../models/User');
const { generateResetToken, sendPasswordResetEmail } = require('../services/passwordResetService');
const router = express.Router();

// طلب إعادة تعيين كلمة المرور
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // صلاحية الرمز لمدة ساعة واحدة
    await user.save();

    await sendPasswordResetEmail(email, resetToken);
    res.status(200).json({ message: 'تم إرسال بريد إعادة تعيين كلمة المرور' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء طلب إعادة تعيين كلمة المرور' });
  }
});

// إعادة تعيين كلمة المرور
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'رمز إعادة التعيين غير صالح أو منتهي الصلاحية' });
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: 'تم إعادة تعيين كلمة المرور بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إعادة تعيين كلمة المرور' });
  }
});

module.exports = router;