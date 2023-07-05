const { Router } = require('express');

const googleAuthControllers = require('../controllers/clientGoogleAuthControllers');

const router = Router();

router.post('/', googleAuthControllers.post_auth_google);

module.exports = router;
