// middlewares/productValidation.js
const { body, validationResult } = require('express-validator');

// التحقق من صحة بيانات المنتج
const validateProduct = [
  body('name').notEmpty().withMessage('الاسم مطلوب').isLength({ min: 3 }).withMessage('الاسم يجب أن يحتوي على 3 أحرف على الأقل'),
  body('description').notEmpty().withMessage('الوصف مطلوب').isLength({ min: 10, max: 500 }).withMessage('الوصف يجب أن يكون بين 10 و 500 حرف'),
  body('price').notEmpty().withMessage('السعر مطلوب').isFloat({ min: 0 }).withMessage('يرجى إدخال سعر صالح'),
  body('stock').notEmpty().withMessage('المخزون مطلوب').isInt({ min: 0 }).withMessage('المخزون يجب أن يكون رقمًا صحيحًا غير سالب'),
  body('category').notEmpty().withMessage('الفئة مطلوبة'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateProduct;