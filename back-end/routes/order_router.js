var express = require('express');
var router = express.Router();
var orderController = require('../controllers/order_controller');
//设置路由
router.get('/list',orderController.list);
router.get('/remove',orderController.remove);
router.post('/save',orderController.save);
module.exports = router;
