// models/UserActivityLog.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userActivityLogSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserActivityLog', userActivityLogSchema);