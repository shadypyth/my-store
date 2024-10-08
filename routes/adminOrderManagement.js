// routes/adminOrderManagement.js
const express = require('express');
const Order = require('../models/Order');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// جلب جميع الطلبات لإدارة المسؤول
router.get('/', checkRole(['admin']), async (req, res) => {
  try {
    const orders = await Order.find().populate('user').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الطلبات' });
  }
});

// تحديث حالة الطلب من قبل المسؤول
router.put('/update-status/:id', checkRole(['admin']), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }

    order.status = status;
    order.updatedAt = Date.now();

    await order.save();
    res.status(200).json({ message: 'تم تحديث حالة الطلب بنجاح', order });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث حالة الطلب' });
  }
});

module.exports = router;