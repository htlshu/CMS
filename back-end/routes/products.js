var express = require('express');
var router = express.Router();
var products_controller = require('../controllers/products_controller')

/* GET users listing. */
router.get('/list',products_controller.list)
router.post('/save',products_controller.save)
router.post('/remove',products_controller.remove)
router.post('/update',products_controller.update)
router.post('/listOne',products_controller.listOne)
// router.get('/list',(req,res,next) => {
  
//     res.json({
//       a:1,
//       b:3
//     })
//     next()
// })

module.exports = router;
