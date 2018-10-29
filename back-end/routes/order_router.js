var express = require('express');
var router = express.Router();
var orderController = require('../controllers/order_controller');

router.get('/list',orderController.list);

module.exports = router;
