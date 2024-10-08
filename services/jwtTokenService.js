// services/jwtTokenService.js
const jwt = require('jsonwebtoken');

// وظيفة لإنشاء توكن JWT للمستخدم
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = { generateToken };