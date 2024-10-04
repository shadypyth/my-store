// routes/ads.js
const express = require('express');
const Ad = require('../models/Ad');
const Product = require('../models/Product');  // استيراد نموذج المنتج
const Vendor = require('../models/Vendor');    // استيراد نموذج التاجر
const router = express.Router();

// جلب الإعلانات النشطة
router.get('/active', async (req, res) => {
  try {
    const currentDate = new Date();
    const activeAds = await Ad.find({
      status: 'approved', 
      startDate: { $lte: currentDate }, 
      endDate: { $gte: currentDate }
    }).populate('product vendor');  // الربط مع المنتجات والتجار

    if (!activeAds.length) {
      return res.status(404).json({ message: 'No active ads found' });
    }

    res.json(activeAds);
  } catch (error) {
    console.error('Error fetching active ads:', error);
    res.status(500).json({ error: 'Error fetching active ads' });
  }
});

// جلب الإعلانات المعلقة
router.get('/pending', async (req, res) => {
  try {
    const pendingAds = await Ad.find({ status: 'pending' }).populate('product vendor');

    if (!pendingAds.length) {
      return res.status(404).json({ message: 'No pending ads found' });
    }

    res.json(pendingAds);
  } catch (error) {
    console.error('Error fetching pending ads:', error);
    res.status(500).json({ error: 'Error fetching pending ads' });
  }
});

// الموافقة على إعلان
router.post('/approve/:id', async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });

    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    res.json({ message: 'Ad approved successfully', ad });
  } catch (error) {
    console.error('Error approving ad:', error);
    res.status(500).json({ error: 'Error approving ad' });
  }
});

// رفض الإعلان
router.post('/reject/:id', async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });

    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    res.json({ message: 'Ad rejected successfully', ad });
  } catch (error) {
    console.error('Error rejecting ad:', error);
    res.status(500).json({ error: 'Error rejecting ad' });
  }
});

// إنشاء إعلان جديد
router.post('/', async (req, res) => {
  try {
    const { product, vendor, startDate, endDate, status } = req.body;
    
    // إنشاء الإعلان الجديد
    const newAd = new Ad({
      product,
      vendor,
      startDate,
      endDate,
      status
    });

    const savedAd = await newAd.save();

    res.status(201).json(savedAd);
  } catch (error) {
    console.error('Error creating ad:', error);
    res.status(500).json({ error: 'Error creating ad' });
  }
});

// حذف إعلان
router.delete('/:id', async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);

    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    res.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    console.error('Error deleting ad:', error);
    res.status(500).json({ error: 'Error deleting ad' });
  }
});

module.exports = router;





