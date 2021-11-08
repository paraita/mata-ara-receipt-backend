const express = require('express');
const router = express.Router();
const controller = require('./db/controllers/customerController');
const buyController = require('./db/controllers/productController');

router.get('/', controller.getAllCustomers);
router.post('/buy', buyController.postNewSell);
router.post('/refund', buyController.updateSell);

module.exports = router;
