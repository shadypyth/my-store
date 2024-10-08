// realTime/notifications.js
const socketIo = require('socket.io');

// إعداد نظام الإشعارات الفورية باستخدام Socket.io
const setupRealTimeNotifications = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected to real-time notifications');

    // الاستماع للأحداث من جانب السيرفر وإرسال الإشعارات للمستخدمين
    socket.on('sendNotification', (data) => {
      io.emit('receiveNotification', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected from real-time notifications');
    });
  });
};

module.exports = setupRealTimeNotifications;