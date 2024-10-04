// routes/shipping.js
const express = require('express');
const shippo = require('shippo')('YOUR_SHIPPO_SECRET_KEY');  // ضع مفتاحك السري من Shippo هنا
const router = express.Router();

router.post('/create-shipment', async (req, res) => {
  const { address_from, address_to, parcel } = req.body;

  try {
    // إنشاء شحنة جديدة باستخدام Shippo
    const shipment = await shippo.shipment.create({
      address_from,
      address_to,
      parcels: [parcel],
      async: false,
    });

    res.json(shipment);  // إعادة بيانات الشحنة إلى الواجهة الأمامية
  } catch (error) {
    console.error('Error creating shipment:', error);
    res.status(500).json({ error: 'Error creating shipment' });
  }
});

module.exports = router;

