const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: String,
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

const Cart = new mongoose.model('cart', CartSchema);

module.exports = Cart;
