const mongoose = require('mongoose');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'please enter a valid email.'],
  },
  fullName: {
    type: String,
    required: true,
  },
  imageProfile: {
    type: String,
    required: true,
    default: 'https://res.cloudinary.com/racmathafidz/image/upload/v1640003496/user_gh3g27.svg',
  },
  password: {
    type: String,
    default: '',
  },
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('user', UserSchema);

module.exports = User;
