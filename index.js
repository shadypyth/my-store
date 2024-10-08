// server/index.js
const express = require('express');
const http = require('http'); // استيراد مكتبة http لإنشاء خادم
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const adRoutes = require('./routes/ads');
const cartRoutes = require('./routes/cart');
const languageMiddleware = require('./middlewares/language'); // استيراد middleware اللغة
const setupRealTimeNotifications = require('./realTime/notifications'); // استيراد نظام الإشعارات الفورية
require('dotenv').config(); // تحميل متغيرات البيئة من .env

const app = express();
const server = http.createServer(app); // إنشاء خادم HTTP لتشغيل Socket.io

app.use(cors());
app.use(express.json());
app.use(languageMiddleware); // استخدام middleware اللغة

// استخدام المسارات المختلفة
app.use('/api/products', productRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/cart', cartRoutes);

// إعداد نظام الإشعارات الفورية
setupRealTimeNotifications(server);

const PORT = process.env.PORT || 5001;

// التأكد من أن MONGODB_URI يتم تحميله بشكل صحيح من ملف .env
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MongoDB URI is missing. Please check your .env file.');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });



// 0000