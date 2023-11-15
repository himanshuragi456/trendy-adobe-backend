const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const flash = require('connect-flash');
require('dotenv').config();

const Product = require('./models/Product');
const User = require('./models/User');
const Admin = require('./models/Admin');
const Cart = require('./models/Cart');
const Transaction = require('./models/Transaction');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const clientGoogleAuthRoutes = require('./routes/clientGoogleAuthRoutes');
const clientLocalAuthRoutes = require('./routes/clientLocalAuthRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clientProductRoutes = require('./routes/clientProductRoutes');
const clientCartRoutes = require('./routes/clientCartRoutes');
const clientTransactionRoutes = require('./routes/clientTransactionRoutes');
const clientCreatePayment = require('./routes/clientCreatePayment');
const requireClientAuth = require('./middleware/clientAuthMiddleware');
const { requireAdminAuth, checkAdmin } = require('./middleware/adminAuthMiddleware');

// Port
const PORT = process.env.PORT || 5000;

// Express
const app = express();
app.use(express.json()); // Convert request body to json
app.use(express.urlencoded({ extended: true })); // Convert request body and html post form-data to json
app.use(express.static(path.join(__dirname, 'public'))); // Set static public folder
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2'))); // Set static sb-admin-2 node-modules for accesing css

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Cors
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// User's session management
app.use(session({
  secret: process.env.secretKey, // Cookie secret
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
}));

// Parsing cookie
app.use(cookieParser(process.env.secretKey)); // Cookie secret, have to match with session's secret

// Connect-flash
app.use(flash());

// Connecting to database and start listening
mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to Database and Start Listening on Port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.redirect('/auth/admin');
});
app.use('/admin', requireAdminAuth, checkAdmin, adminRoutes);
app.use('/auth/google', clientGoogleAuthRoutes);
app.use('/auth/local', clientLocalAuthRoutes);
app.use('/auth/admin', adminAuthRoutes);
app.use('/api/product', clientProductRoutes);
app.use('/api/cart', requireClientAuth, clientCartRoutes);
app.use('/api/transaction', requireClientAuth, clientTransactionRoutes);
app.use('/api/payment', requireClientAuth, clientCreatePayment);

// 404 Page Not Found Route
app.get('*', (req, res) => {
  res.render('admin/404/view_404.ejs', {
    title: 'Page Not Found',
    userName: res.locals.user.userName,
  });
});
