const express = require('express');
const router = express.Router();
const controller = require('./db/controllers/purchaseController');

router.get('/', controller.getAllPurchases);
router.get('/:id', controller.getPurchase);
router.post('/', controller.createPurchase);


module.exports = router;
