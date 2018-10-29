var orderModel = require('../models/order_model')
var {handleDate} = require('../util')
//list控制器
const list =  (req , res) => {
    res.set('content-type','application/json; charset=utf8');
    let _data =  orderModel.list();
    handleDate(_data ,res ,'index');
}


module.exports = {
    list,
}