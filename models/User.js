const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'vendor', 'admin'], default: 'user' }, // دور المستخدم (مستخدم عادي، تاجر، أو مدير)
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' }, // حالة التاجر (معلق أو موافق عليه)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
