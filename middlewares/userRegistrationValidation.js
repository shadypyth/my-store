// middlewares/userRegistrationValidation.js
const { body, validationResult } = require('express-validator');

// التحقق من صحة بيانات تسجيل المستخدم
const validateUserRegistration = [
  body('name').notEmpty().withMessage('الاسم مطلوب').isLength({ min: 3 }).withMessage('الاسم يجب أن يحتوي على 3 أحرف على الأقل'),
  body('email').isEmail().withMessage('يرجى إدخال بريد إلكتروني صالح'),
  body('password').isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون على الأقل 6 أحرف'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUserRegistration;