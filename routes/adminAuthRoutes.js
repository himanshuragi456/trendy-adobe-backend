const { Router } = require('express');

const adminAuthControllers = require('../controllers/adminAuthControllers');

const router = Router();

router.get('/', adminAuthControllers.get_admin_signin);
router.post('/signin', adminAuthControllers.post_admin_signin);
// router.post('/signup', adminAuthControllers.post_admin_signup);
router.get('/signout', adminAuthControllers.get_admin_signout);

module.exports = router;
