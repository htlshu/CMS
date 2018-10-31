var express = require('express');
var router = express.Router();
var orderController = require('../controllers/order_controller');
var fileUpload = require('../middlewares/fileUpload')
//设置路由
router.get('/list',orderController.list);
router.get('/remove',orderController.remove);
router.post('/save',fileUpload,orderController.save);
router.post('/listOne',orderController.listOne);
//router.post('/update',orderController.update);

module.exports = router;
