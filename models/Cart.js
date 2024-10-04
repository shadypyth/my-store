// server/models/Cart.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // ربط السلة بالمستخدم
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },  // المنتج المضاف
      quantity: { type: Number, default: 1, required: true }  // كمية المنتج
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
