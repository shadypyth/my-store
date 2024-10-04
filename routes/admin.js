const express = require('express');
const router = express.Router();
const User = require('../models/User'); // افتراض أن المستخدمين يتم تخزينهم في نموذج User

// جلب التجار المعلقين
router.get('/vendors/pending', async (req, res) => {
  try {
    const pendingVendors = await User.find({ role: 'vendor', status: 'pending' });
    res.json(pendingVendors);
  } catch (error) {
    console.error('Error fetching pending vendors:', error);
    res.status(500).json({ error: 'Error fetching pending vendors' });
  }
});

// الموافقة على التاجر
router.post('/vendors/approve/:id', async (req, res) => {
  try {
    const vendor = await User.findByIdAndUpdate(req.params.id, { status: 'approved' });
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json({ message: 'Vendor approved successfully' });
  } catch (error) {
    console.error('Error approving vendor:', error);
    res.status(500).json({ error: 'Error approving vendor' });
  }
});

// رفض التاجر
router.post('/vendors/reject/:id', async (req, res) => {
  try {
    const vendor = await User.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json({ message: 'Vendor rejected successfully' });
  } catch (error) {
    console.error('Error rejecting vendor:', error);
    res.status(500).json({ error: 'Error rejecting vendor' });
  }
});

module.exports = router;

