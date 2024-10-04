// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');
const adRoutes = require('./routes/ads');
const cartRoutes = require('./routes/cart');
require('dotenv').config();  // تحميل متغيرات البيئة من .env

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5001;

// التأكد من أن MONGODB_URI يتم تحميله بشكل صحيح من ملف .env
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MongoDB URI is missing. Please check your .env file.');
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });




