// middlewares/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// التحقق من صلاحية التوكن JWT
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'يرجى تقديم التوكن للوصول' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'المستخدم غير موجود' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'توكن غير صالح' });
  }
};

// التحقق من دور المستخدم
const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'ليس لديك الصلاحية للوصول إلى هذا المورد' });
  }
  next();
};

module.exports = { authenticate, checkRole };