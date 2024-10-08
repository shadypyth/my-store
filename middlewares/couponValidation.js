// middlewares/couponValidation.js
const { body, validationResult } = require('express-validator');

// التحقق من صحة بيانات الكوبون
const validateCoupon = [
  body('code').notEmpty().withMessage('كود الكوبون مطلوب').isLength({ min: 5 }).withMessage('كود الكوبون يجب أن يحتوي على 5 أحرف على الأقل'),
  body('discountPercentage').notEmpty().withMessage('نسبة الخصم مطلوبة').isFloat({ min: 0, max: 100 }).withMessage('نسبة الخصم يجب أن تكون بين 0 و 100'),
  body('validUntil').notEmpty().withMessage('تاريخ الصلاحية مطلوب').isISO8601().withMessage('يرجى إدخال تاريخ صالح'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateCoupon;