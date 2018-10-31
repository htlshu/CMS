
var userController = require('../controllers/user_controller');
var express = require('express');
var router = express.Router();
var fileUpload = require('../middlewares/fileUpload')


router.get('/listall',userController.listall);
router.get('/list',userController.list);
router.post('/save',fileUpload,userController.save);
router.get('/listone', userController.listone)
router.post('/update',fileUpload, userController.update)
router.get('/remove',userController.remove);





module.exports = router;