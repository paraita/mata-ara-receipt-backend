const express = require('express');
const router = express.Router();
const controller = require('./db/controllers/purchaseController');
const buyController = require('./db/controllers/productController');

router.get('/', controller.getAllPurchases);
router.post('/buy', buyController.postNewSell);
router.post('/refund', buyController.updateSell);

module.exports = router;
