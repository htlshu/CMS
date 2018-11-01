var orderModel = require('../models/order_model')
var { handleDate } = require('../util')
//listall控制器
const listall = async (req , res) => {
    let _data = await orderModel.listall();
    handleDate(_data ,res ,'index');
}
//list 控制器
const list = async (req , res) => {
    let _data = await orderModel.list(req.query);
    handleDate(_data ,res ,'index');
}
//listOne 控制器
const listOne = async (req , res) => {
    let _data = await orderModel.listOne(req.query);
    handleDate(_data ,res ,'index');
}
//remove 控制器
const remove = async (req,res) => {
    console.log(req.body);
    
    let _data = await orderModel.remove(req.body);
    handleDate(_data ,res ,'index');
}
//save控制器
<<<<<<< HEAD
const save =async (req,res) => {
=======
const save = async (req,res) => {
>>>>>>> 0a879e909ac9aad7236ae7e9ca4ac09645852568
     // 接收到发送过来的数据 req.body, 然后存入数据库
     let _data = await orderModel.save(req.body);
     handleDate(_data, res, 'index');
}
//update 控制器
const update = async (req,res) => {
    let _data = await orderModel.update(req.body);
    handleDate(_data,res,'index');
}
module.exports = {
    list,
    remove,
    save,
    listOne,
    update,
    listall
}