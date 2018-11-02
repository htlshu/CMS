var express = require('express');
var router = express.Router();
var products_controller = require('../controllers/products_controller')
var fileUpload_products = require('../middlewares/fileUpload_products')

/* GET users listing. */
router.get('/list',products_controller.list)
router.post('/save',fileUpload_products,products_controller.save)
router.delete('/remove',products_controller.remove)
router.post('/update',fileUpload_products, products_controller.update)
router.get('/listOne',products_controller.listOne)
// router.get('/list',(req,res,next) => {
  
//     res.json({
//       a:1,
//       b:3
//     })
//     next()
// })

module.exports = router;
