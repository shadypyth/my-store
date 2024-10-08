// routes/adminDashboard.js
const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const UserActivityLog = require('../models/UserActivityLog');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// جلب إحصائيات لوحة التحكم للمسؤول
router.get('/statistics', checkRole(['admin']), async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    const productCount = await Product.countDocuments();
    const recentActivities = await UserActivityLog.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      userCount,
      orderCount,
      productCount,
      recentActivities,
    });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الإحصائيات' });
  }
});

module.exports = router;