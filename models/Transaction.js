const mongoose = require('mongoose');

const TransactionItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: Array || String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});

const TransactionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  transactionItem: {
    type: [TransactionItemSchema],
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Waiting for payment',
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Transaction = new mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;
