const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  count: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Product = new mongoose.model('product', ProductSchema);

module.exports = Product;
