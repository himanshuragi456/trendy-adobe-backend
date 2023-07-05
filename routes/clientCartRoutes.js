const { Router } = require('express');

const cartControllers = require('../controllers/clientCartControllers');

const router = Router();

router.post('/post', cartControllers.post_cart);
router.delete('/delete/:id', cartControllers.delete_cart);
router.get('/:id', cartControllers.get_cart);

module.exports = router;
