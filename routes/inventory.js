// routes/inventory.js
const express = require('express');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// جلب المخزون للمنتجات
router.get('/', async (req, res) => {
  try {
    const inventoryItems = await Inventory.find().populate('product');
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب بيانات المخزون' });
  }
});

// إضافة منتج إلى المخزون
router.post('/add', checkRole(['store_owner']), async (req, res) => {
  const { productId, quantity, restockThreshold } = req.body;

  try {
    let inventoryItem = await Inventory.findOne({ product: productId });
    if (!inventoryItem) {
      inventoryItem = new Inventory({
        product: productId,
        quantity,
        restockThreshold,
      });
    } else {
      inventoryItem.quantity += quantity;
      inventoryItem.updatedAt = Date.now();
    }

    await inventoryItem.save();
    res.status(200).json({ message: 'تم إضافة المنتج إلى المخزون بنجاح', inventoryItem });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة المنتج إلى المخزون' });
  }
});

// تحديث كمية منتج في المخزون
router.put('/update/:id', checkRole(['store_owner']), async (req, res) => {
  const { id } = req.params;
  const { quantity, restockThreshold } = req.body;

  try {
    const inventoryItem = await Inventory.findById(id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'العنصر غير موجود في المخزون' });
    }

    inventoryItem.quantity = quantity !== undefined ? quantity : inventoryItem.quantity;
    inventoryItem.restockThreshold = restockThreshold !== undefined ? restockThreshold : inventoryItem.restockThreshold;
    inventoryItem.updatedAt = Date.now();

    await inventoryItem.save();
    res.status(200).json({ message: 'تم تحديث بيانات المخزون بنجاح', inventoryItem });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث بيانات المخزون' });
  }
});

module.exports = router;