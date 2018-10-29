var orderModel = require('../models/order_model')
var {handleData} = require('../util')
//list控制器
const list = async (req , res) => {
    res.set('content-type','application/json; charset=utf8');
    let _data = await orderModel.list();
    handleData(_data ,res ,'index');
}


module.exports = {
    list,
}