const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Protecting routes (require auth for access routes)
const requireAdminAuth = (req, res, next) => {
  // 'jwt' is user's cookies name
  const token = req.cookies.jwt;

  // Checking cookies token
  if (token) {
    // Verifing cookie's token with secret
    jwt.verify(token, process.env.secretKey, (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.redirect('/auth/admin');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/auth/admin');
  }
};

// Save user data in user's local properties and display it in view
const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;

  // Checking cookies token
  if (token) {
    jwt.verify(token, process.env.secretKey, async (error, decodedToken) => {
      if (error) {
        console.log(error.message);

        // If token verifying is error user's local properties will have null value
        res.locals.user = null;
        next();
      } else {
        // If token verifying success, get user's data from database and save it in user's local properties
        const user = await Admin.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAdminAuth, checkAdmin };
