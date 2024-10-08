// routes/supportTickets.js
const express = require('express');
const SupportTicket = require('../models/SupportTicket');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// إنشاء طلب دعم جديد
router.post('/', async (req, res) => {
  const { issue } = req.body;
  const user = req.user._id;

  try {
    const newTicket = new SupportTicket({
      user,
      issue,
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء طلب الدعم' });
  }
});

// جلب جميع طلبات الدعم للمستخدم الحالي
router.get('/', async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ user: req.user._id });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب طلبات الدعم' });
  }
});

// تحديث حالة طلب الدعم
router.put('/:id', checkRole(['store_owner', 'small_merchant']), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ticket = await SupportTicket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'طلب الدعم غير موجود' });
    }

    ticket.status = status || ticket.status;
    ticket.updatedAt = Date.now();

    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث طلب الدعم' });
  }
});

module.exports = router;