const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Admin = require('../models/Admin');

// const post_admin_signup = async (req, res) => {
//   try {
//     const { userName, password } = req.body;

//     // Giving password salt and then hash it
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create the account
//     await Admin.create({
//       userName,
//       password: hashedPassword,
//     }).then(() => res.send({ msg: 'User Created' }));
//   } catch (error) {
//     console.log(error);
//   }
// };

const get_admin_signin = (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus };

  // Protecting routes
  if (req.cookies.jwt) {
    console.log('Protected');
    res.redirect('/admin/transactions/cod-payment');
  } else {
    res.render('admin/login/login', { alert });
  }
};

const post_admin_signin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    Admin.findOne({ userName })
      .then((response) => {
        if (response) {
          bcrypt.compare(password, response.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              // Jwt expires time (1 day)
              const maxAge = 1 * 24 * 60 * 60;
              // Create jwt token
              const jwtToken = jwt.sign({ id: response.id }, process.env.secretKey, { expiresIn: maxAge }); // With expired date
              res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: maxAge * 1000 });
              res.redirect('/admin/transactions/cod-payment');
            } else {
              req.flash('alertMessage', 'Wrong Password');
              req.flash('alertStatus', 'danger');
              res.redirect('/auth/admin');
            }
          });
        } else {
          req.flash('alertMessage', 'No Account with That Username');
          req.flash('alertStatus', 'danger');
          res.redirect('/auth/admin');
        }
      });
  } catch (error) {
    req.flash('alertMessage', error);
    req.flash('alertStatus', 'danger');
    res.redirect('/auth/admin');
  }
};

const get_admin_signout = (req, res) => {
  // Edit 'jwt' cookie maxAge
  res.cookie('jwt', '', {
    // Max age in miliseconds (here is 1 milisecond)
    maxAge: 1,
  });

  res.redirect('/auth/admin');
};

module.exports = {
  get_admin_signin,
  post_admin_signin,
  // post_admin_signup,
  get_admin_signout,
};
