// middlewares/adminValidation.js
const { body, validationResult } = require('express-validator');

// التحقق من صحة بيانات الإدارة (مثل إضافة مستخدم من قبل المشرف)
const validateAdminAction = [
  body('name').notEmpty().withMessage('الاسم مطلوب').isLength({ min: 3 }).withMessage('الاسم يجب أن يحتوي على 3 أحرف على الأقل'),
  body('email').isEmail().withMessage('يرجى إدخال بريد إلكتروني صالح'),
  body('role').notEmpty().withMessage('الدور مطلوب').isIn(['admin', 'store_owner', 'small_merchant', 'user']).withMessage('دور غير صالح'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateAdminAction;