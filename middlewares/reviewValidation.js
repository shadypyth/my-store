// middlewares/reviewValidation.js
const { body, validationResult } = require('express-validator');

// التحقق من صحة بيانات المراجعة
const validateReview = [
  body('product').notEmpty().withMessage('معرّف المنتج مطلوب').isMongoId().withMessage('يرجى تقديم معرّف منتج صالح'),
  body('rating').notEmpty().withMessage('التقييم مطلوب').isInt({ min: 1, max: 5 }).withMessage('التقييم يجب أن يكون بين 1 و 5'),
  body('comment').optional().isLength({ max: 500 }).withMessage('التعليق يجب أن يكون أقل من 500 حرف'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateReview;