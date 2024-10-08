// middlewares/userUpdateValidation.js
const { body, validationResult } = require('express-validator');

// التحقق من صحة بيانات تحديث المستخدم
const validateUserUpdate = [
  body('name').optional().isLength({ min: 3 }).withMessage('الاسم يجب أن يحتوي على 3 أحرف على الأقل'),
  body('email').optional().isEmail().withMessage('يرجى إدخال بريد إلكتروني صالح'),
  body('phoneNumber').optional().isMobilePhone().withMessage('يرجى إدخال رقم هاتف صالح'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUserUpdate;