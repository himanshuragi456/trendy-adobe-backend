const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const Admin = mongoose.model('admin', AdminSchema);

module.exports = Admin;
