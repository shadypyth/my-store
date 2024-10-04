const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },        // اسم القسم
  description: { type: String },                 // وصف القسم
  createdAt: { type: Date, default: Date.now }   // تاريخ الإنشاء
});

module.exports = mongoose.model('Category', categorySchema);

