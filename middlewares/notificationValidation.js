// middlewares/notificationValidation.js
const { body, validationResult } = require('express-validator');

// التحقق من صحة بيانات الإشعار
const validateNotification = [
  body('user').notEmpty().withMessage('معرّف المستخدم مطلوب').isMongoId().withMessage('يرجى تقديم معرّف مستخدم صالح'),
  body('message').notEmpty().withMessage('الرسالة مطلوبة').isLength({ min: 5, max: 500 }).withMessage('الرسالة يجب أن تكون بين 5 و 500 حرف'),
  body('type').notEmpty().withMessage('نوع الإشعار مطلوب').isIn(['info', 'warning', 'success']).withMessage('نوع الإشعار غير صالح'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateNotification;