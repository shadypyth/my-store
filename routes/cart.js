// server/routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// إضافة منتج إلى السلة
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const productExists = cart.items.find(item => item.product.equals(productId));

    if (productExists) {
      productExists.quantity += quantity;  // إذا كان المنتج موجودًا بالفعل، نزيد الكمية
    } else {
      cart.items.push({ product: productId, quantity });  // إضافة المنتج الجديد إلى السلة
    }

    await cart.save();
    res.json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Error adding product to cart' });
  }
});

// جلب السلة الخاصة بالمستخدم
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Error fetching cart' });
  }
});

// إزالة منتج من السلة
router.post('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => !item.product.equals(productId));  // إزالة المنتج

    await cart.save();
    res.json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Error removing product from cart' });
  }
});

module.exports = router;
