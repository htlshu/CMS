var express = require('express');
var router = express.Router();
var products_controller = require('../controllers/products_controller')

/* GET users listing. */
router.get('/list',products_controller.list)
// router.get('/list',(req,res,next) => {
  
//     res.json({
//       a:1,
//       b:3
//     })
//     next()
// })

module.exports = router;
