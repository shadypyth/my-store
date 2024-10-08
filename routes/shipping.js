// routes/shipping.js
const express = require('express');
const shippo = require('shippo')(process.env.SHIPPO_API_KEY);
const router = express.Router();

// إنشاء شحنة جديدة
router.post('/create-shipment', async (req, res) => {
  const { addressFrom, addressTo, parcel } = req.body;

  try {
    // إنشاء شحنة باستخدام Shippo
    const shipment = await shippo.shipment.create({
      address_from: addressFrom,
      address_to: addressTo,
      parcels: [parcel],
      async: false,
    });

    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الشحنة' });
  }
});

// جلب حالة الشحنة
router.get('/track/:shipmentId', async (req, res) => {
  const { shipmentId } = req.params;

  try {
    // تتبع الشحنة باستخدام Shippo
    const trackingInfo = await shippo.track.get_status('shippo', shipmentId);
    res.status(200).json(trackingInfo);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تتبع الشحنة' });
  }
});

module.exports = router;

