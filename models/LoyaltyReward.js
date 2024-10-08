// models/LoyaltyReward.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loyaltyRewardSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  rewards: [
    {
      rewardName: {
        type: String,
        required: true,
      },
      pointsRequired: {
        type: Number,
        required: true,
      },
      redeemed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LoyaltyReward', loyaltyRewardSchema);