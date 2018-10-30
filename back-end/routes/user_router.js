
var userController = require('../controllers/user_controller');
var express = require('express');
var router = express.Router();
var fileUpload = require('../middlewares/fileUpload')


router.get('/listall',userController.listall);
router.post('/save',fileUpload,userController.save);
module.exports = router;