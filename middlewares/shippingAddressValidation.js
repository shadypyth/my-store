// middlewares/shippingAddressValidation.js
const { body, validationResult } = require('express-validator');

// التحقق من صحة بيانات عنوان الشحن
const validateShippingAddress = [
  body('fullName').notEmpty().withMessage('الاسم الكامل مطلوب').isLength({ min: 3 }).withMessage('الاسم الكامل يجب أن يحتوي على 3 أحرف على الأقل'),
  body('addressLine1').notEmpty().withMessage('العنوان الأول مطلوب'),
  body('city').notEmpty().withMessage('المدينة مطلوبة'),
  body('state').notEmpty().withMessage('الولاية/المقاطعة مطلوبة'),
  body('postalCode').notEmpty().withMessage('الرمز البريدي مطلوب').isPostalCode('any').withMessage('يرجى تقديم رمز بريدي صالح'),
  body('country').notEmpty().withMessage('الدولة مطلوبة'),
  body('phoneNumber').notEmpty().withMessage('رقم الهاتف مطلوب').isMobilePhone().withMessage('يرجى تقديم رقم هاتف صالح'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateShippingAddress;