var orderModel = require('../models/order_model')
var {handleDate} = require('../util')
//list控制器
const list =  (req , res) => {
    res.set('content-type','application/json; charset=utf8');
    let _data =  orderModel.list();
    handleDate(_data ,res ,'index');
}
//remove 控制器
const remove = async (req,res) => {
    res.set('content-type','application/json; charset=utf8');
    let _data = await orderModel.remove(req.query);
    handleDate(_data ,res ,'index');
}
//save控制器
const save =async (req,res) => {
     // 接收到发送过来的数据 req.body, 然后存入数据库
     res.set('content-type', 'application/json; charset=utf8')
     let _data = await orderModel.save(req.body)
     handleData(_data, res, 'index')
}
module.exports = {
    list,
    remove,
    save,
}