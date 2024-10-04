const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },        // اسم التاجر
  email: { type: String, required: true, unique: true },  // البريد الإلكتروني للتاجر
  phone: { type: String, required: true },       // رقم الهاتف
  address: { type: String },                     // عنوان التاجر
  createdAt: { type: Date, default: Date.now }   // تاريخ التسجيل
});

module.exports = mongoose.model('Vendor', vendorSchema);

