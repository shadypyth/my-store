// routes/notifications.js
const express = require('express');
const Notification = require('../models/Notification');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// جلب جميع الإشعارات للمستخدم الحالي
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الإشعارات' });
  }
});

// تحديث حالة الإشعار إلى مقروء
router.put('/read/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: 'الإشعار غير موجود' });
    }

    notification.isRead = true;
    await notification.save();
    res.status(200).json({ message: 'تم تحديث الإشعار إلى مقروء', notification });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث الإشعار' });
  }
});

// إنشاء إشعار جديد
router.post('/create', checkRole(['store_owner', 'small_merchant']), async (req, res) => {
  const { user, message, type } = req.body;

  try {
    const newNotification = new Notification({
      user,
      message,
      type,
    });

    await newNotification.save();
    res.status(201).json({ message: 'تم إنشاء الإشعار بنجاح', newNotification });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الإشعار' });
  }
});

module.exports = router;