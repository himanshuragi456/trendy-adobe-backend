const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const post_local_signup = (req, res) => {
  const { email, password, fullName } = req.body;

  User.findOne({ email })
    .then(async (response) => {
      if (response) {
        res.send({ msg: 'User with That Email Already Exist.' });
      } else {
        // Giving password salt and then hash it
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the account
        await User.create({
          email,
          fullName,
          password: hashedPassword,
        }).then(() => res.send({ msg: 'User Created' }));
      }
    })
    .catch((error) => res.send({ msg: error }));
};

const post_local_signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((response) => {
      if (response) {
        bcrypt.compare(password, response.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            // Jwt expires time (1 day)
            const maxAge = 1 * 24 * 60 * 60;
            // Create jwt token
            const token = jwt.sign({ id: response.id }, process.env.secretKey, {}); // No expired date
            // const jwtToken = jwt.sign({ id: response.id }, process.env.secretKey, { expiresIn: maxAge }); // With expired date

            res.status(201).send({
              id: response._id,
              email: response.email,
              fullName: response.fullName,
              imageProfile: response.imageProfile,
              token,
            });
          } else {
            res.send({ msg: 'Wrong Password.' });
          }
        });
      } else {
        res.send({ msg: 'No Account with That Email.' });
      }
    });
};

module.exports = {
  post_local_signup,
  post_local_signin,
};
