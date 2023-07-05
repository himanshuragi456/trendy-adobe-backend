const jwt = require('jsonwebtoken');

const requireClientAuth = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.secretKey, (err, decodedToken) => {
      if (err) res.status(401).send({ msg: 'Unauthorized' });

      if (decodedToken) next();
    });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

module.exports = requireClientAuth;
