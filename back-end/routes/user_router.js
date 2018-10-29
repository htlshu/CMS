
var userController = require('../controllers/user_controller');
var express = require('express');
var router = express.Router();
var fileUpload_user = require('../middlewares/fileUpload-user')


router.get('/listall',userController.listall);
router.post('/save',fileUpload_user,userController.save);
module.exports = router;