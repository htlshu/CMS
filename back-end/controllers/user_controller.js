
const { handleDate } = require('../util')
var userModel = require('../models/user_model')



//list控制器
const listall = async (req , res) => {
    res.set('content-type','application/json; charset=utf8');
    console.log(55555)
    let _data = await userModel.listall();
    console.log(_data);
    handleDate(_data ,res ,'index');
}

// 添加职位
const save = async (req, res) => {
    // 接收到发送过来的数据 req.body, 然后存入数据库
    res.set('content-type', 'application/json; charset=utf8')
 
    let _data = await userModel.save(req.body)
 
    handleDate(_data, res, 'index')
}
module.exports = {
    listall,
    save
}


