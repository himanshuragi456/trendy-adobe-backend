const { Router } = require('express');

const transactionControllers = require('../controllers/clientTransactionControllers');

const router = Router();

router.post('/post', transactionControllers.post_transaction);
router.post('/update/:id', transactionControllers.update_transaction);
router.delete('/delete/:id', transactionControllers.delete_transaction);
router.get('/:id', transactionControllers.get_transaction);
router.get('/detail/:id', transactionControllers.get_detail_transaction);

module.exports = router;
