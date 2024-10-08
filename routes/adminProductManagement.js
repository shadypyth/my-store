// routes/adminProductManagement.js
const express = require('express');
const Product = require('../models/Product');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// جلب جميع المنتجات
router.get('/products', checkRole(['admin']), async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب المنتجات' });
  }
});

// إنشاء منتج جديد
router.post('/create-product', checkRole(['admin']), async (req, res) => {
  const { name, description, price, stock } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
    });

    await newProduct.save();
    res.status(201).json({ message: 'تم إنشاء المنتج بنجاح', newProduct });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء المنتج' });
  }
});

// تحديث بيانات منتج موجود
router.put('/update-product/:productId', checkRole(['admin']), async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, stock } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;

    await product.save();
    res.status(200).json({ message: 'تم تحديث المنتج بنجاح', product });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث المنتج' });
  }
});

// حذف منتج من قبل المسؤول
router.delete('/delete-product/:productId', checkRole(['admin']), async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' });
    }

    await Product.deleteOne({ _id: productId });
    res.status(200).json({ message: 'تم حذف المنتج بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء حذف المنتج' });
  }
});

module.exports = router;