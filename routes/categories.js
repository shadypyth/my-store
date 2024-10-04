const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// إنشاء قسم جديد
router.post('/create', async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ message: 'تم إنشاء القسم بنجاح', category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء إنشاء القسم' });
  }
});

// جلب جميع الأقسام
router.get('/all', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الأقسام' });
  }
});

module.exports = router;
