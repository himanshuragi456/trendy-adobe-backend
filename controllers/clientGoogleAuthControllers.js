const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const post_auth_google = async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.clientID,
  });

  const { name, email, picture } = ticket.getPayload();

  User.findOne({ email })
    .then(async (response) => {
      if (response) {
        // req.session.userId = response.id;

        // Jwt expires time (1 day)
        const maxAge = 1 * 24 * 60 * 60;
        // Create jwt token
        const jwtToken = jwt.sign({ id: response.id }, process.env.secretKey, {}); // No expired date
        // const jwtToken = jwt.sign({ id: response.id }, process.env.secretKey, { expiresIn: maxAge }); // With expired date

        res.status(201).send({
          id: response._id,
          email: response.email,
          fullName: response.fullName,
          imageProfile: response.imageProfile,
          token: jwtToken,
        });
      } else {
        const user = await User.create({
          email,
          fullName: name,
          imageProfile: picture,
        });

        req.session.userId = user.id;
        res.status(201).send(user);
      }
    });
};

module.exports = {
  post_auth_google,
};
