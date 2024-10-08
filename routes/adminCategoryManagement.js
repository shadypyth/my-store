// routes/adminCategoryManagement.js
const express = require('express');
const Category = require('../models/Category');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// جلب جميع الفئات
router.get('/categories', checkRole(['admin']), async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الفئات' });
  }
});

// إنشاء فئة جديدة
router.post('/create-category', checkRole(['admin']), async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save();
    res.status(201).json({ message: 'تم إنشاء الفئة بنجاح', newCategory });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الفئة' });
  }
});

// تحديث بيانات فئة موجودة
router.put('/update-category/:categoryId', checkRole(['admin']), async (req, res) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'الفئة غير موجودة' });
    }

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();
    res.status(200).json({ message: 'تم تحديث الفئة بنجاح', category });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث الفئة' });
  }
});

// حذف فئة من قبل المسؤول
router.delete('/delete-category/:categoryId', checkRole(['admin']), async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'الفئة غير موجودة' });
    }

    await Category.deleteOne({ _id: categoryId });
    res.status(200).json({ message: 'تم حذف الفئة بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء حذف الفئة' });
  }
});

module.exports = router;