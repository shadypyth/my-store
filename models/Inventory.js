// models/Inventory.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  restockThreshold: {
    type: Number,
    required: true,
    default: 10,
  },
  restockDate: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Inventory', inventorySchema);