// routes/loyaltyRewards.js
const express = require('express');
const LoyaltyReward = require('../models/LoyaltyReward');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// جلب نقاط الولاء للمستخدم الحالي
router.get('/points', async (req, res) => {
  try {
    const loyaltyReward = await LoyaltyReward.findOne({ user: req.user._id });
    if (!loyaltyReward) {
      return res.status(404).json({ message: 'لا توجد نقاط ولاء لهذا المستخدم' });
    }
    res.status(200).json({ points: loyaltyReward.points });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب نقاط الولاء' });
  }
});

// استبدال مكافأة باستخدام نقاط الولاء
router.post('/redeem', async (req, res) => {
  const { rewardName, pointsRequired } = req.body;

  try {
    let loyaltyReward = await LoyaltyReward.findOne({ user: req.user._id });
    if (!loyaltyReward || loyaltyReward.points < pointsRequired) {
      return res.status(400).json({ message: 'ليس لديك نقاط كافية لاستبدال هذه المكافأة' });
    }

    loyaltyReward.points -= pointsRequired;
    loyaltyReward.rewards.push({ rewardName, pointsRequired, redeemed: true });
    loyaltyReward.updatedAt = Date.now();

    await loyaltyReward.save();
    res.status(200).json({ message: 'تم استبدال المكافأة بنجاح', loyaltyReward });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء استبدال المكافأة' });
  }
});

// إضافة نقاط ولاء للمستخدم
router.post('/add-points', checkRole(['store_owner']), async (req, res) => {
  const { userId, points } = req.body;

  try {
    let loyaltyReward = await LoyaltyReward.findOne({ user: userId });
    if (!loyaltyReward) {
      loyaltyReward = new LoyaltyReward({ user: userId, points });
    } else {
      loyaltyReward.points += points;
      loyaltyReward.updatedAt = Date.now();
    }

    await loyaltyReward.save();
    res.status(200).json({ message: 'تم إضافة النقاط بنجاح', loyaltyReward });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة نقاط الولاء' });
  }
});

module.exports = router;