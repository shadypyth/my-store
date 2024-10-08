// models/SupportTicket.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supportTicketSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'closed'],
    default: 'open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SupportTicket', supportTicketSchema);