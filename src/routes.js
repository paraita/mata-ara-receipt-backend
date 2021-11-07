const express = require('express');
const router = express.Router();
const controller = require('./db/controllers/controllers');
const buyController = require('./db/controllers/productController');

router.get('/', controller.helloWorld);
router.post('/buy', buyController.postNewSell);

module.exports = router;
