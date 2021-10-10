const express = require('express');
const router = express.Router();
const controller = require('./db/controllers');

router.get('/', controller.helloWorld);

module.exports = router;