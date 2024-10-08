// middlewares/categoryValidation.js
const { body, validationResult } = require('express-validator');

// التحقق من صحة بيانات الفئة
const validateCategory = [
  body('name').notEmpty().withMessage('الاسم مطلوب').isLength({ min: 3 }).withMessage('الاسم يجب أن يحتوي على 3 أحرف على الأقل'),
  body('description').optional().isLength({ max: 200 }).withMessage('الوصف يجب أن يكون أقل من 200 حرف'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateCategory;