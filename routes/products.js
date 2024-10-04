// routes/products.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;  // رقم الصفحة من الاستعلام
  const limit = 10;  // عدد المنتجات في كل صفحة

  try {
    const products = await Product.find()
      .skip((page - 1) * limit)  // تجاوز المنتجات السابقة
      .limit(limit)
      .populate('ads');  // جلب البيانات المتعلقة بالإعلانات المرتبطة بالمنتجات

    const productsWithAds = products.map(product => {
      return {
        ...product._doc,
        isAdvertised: product.ads && product.ads.length > 0  // تحقق من وجود إعلان مرتبط
      };
    });

    res.json(productsWithAds);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

module.exports = router;





