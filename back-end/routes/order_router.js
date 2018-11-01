var express = require('express');
var router = express.Router();
var orderController = require('../controllers/order_controller');
var fileUpload = require('../middlewares/fileUpload')
// 抽离响应头的设置 中间件
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)

//设置路由
router.get('/listall',orderController.listall);
router.get('/list',orderController.list);
router.delete('/remove',orderController.remove);
router.post('/save',fileUpload,orderController.save);
router.get('/listOne',orderController.listOne);
router.post('/update',orderController.update);

module.exports = router;
