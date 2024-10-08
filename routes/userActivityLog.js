// routes/userActivityLog.js
const express = require('express');
const UserActivityLog = require('../models/UserActivityLog');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// إضافة سجل نشاط للمستخدم
router.post('/add', async (req, res) => {
  const { activity } = req.body;
  const user = req.user._id;

  try {
    const newActivityLog = new UserActivityLog({
      user,
      activity,
    });

    await newActivityLog.save();
    res.status(201).json({ message: 'تم إضافة سجل النشاط بنجاح', newActivityLog });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة سجل النشاط' });
  }
});

// جلب جميع سجلات النشاط للمستخدم الحالي
router.get('/', async (req, res) => {
  try {
    const activityLogs = await UserActivityLog.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(activityLogs);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب سجلات النشاط' });
  }
});

module.exports = router;