// middlewares/orderValidation.js
const { body, validationResult } = require('express-validator');

// التحقق من صحة بيانات الطلب
const validateOrder = [
  body('userId').notEmpty().withMessage('معرّف المستخدم مطلوب').isMongoId().withMessage('يرجى تقديم معرّف مستخدم صالح'),
  body('items').isArray({ min: 1 }).withMessage('يجب إضافة عنصر واحد على الأقل إلى الطلب'),
  body('items.*.product').notEmpty().withMessage('معرّف المنتج مطلوب').isMongoId().withMessage('يرجى تقديم معرّف منتج صالح'),
  body('items.*.quantity').notEmpty().withMessage('الكمية مطلوبة').isInt({ min: 1 }).withMessage('الكمية يجب أن تكون على الأقل 1'),
  body('totalAmount').notEmpty().withMessage('المبلغ الإجمالي مطلوب').isFloat({ min: 0 }).withMessage('يرجى تقديم مبلغ إجمالي صالح'),
  body('shippingAddress').notEmpty().withMessage('عنوان الشحن مطلوب').isString().withMessage('يرجى تقديم عنوان شحن صالح'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateOrder;