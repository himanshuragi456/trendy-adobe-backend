const { Router } = require('express');

const productControllers = require('../controllers/clientProductControllers');

const router = Router();

router.get('/', productControllers.get_all_product);
router.get('/:id', productControllers.get_detail_product);

module.exports = router;
