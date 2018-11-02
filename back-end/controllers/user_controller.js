
const { handleDate } = require('../util')
var userModel = require('../models/user_model')



//list控制器
const listall = async (req , res) => {
    res.set('content-type','application/json; charset=utf8');
    let _data = await userModel.listall();
    handleDate(_data ,res ,'index');
}

// 添加用户
const save = async (req, res) => {
    // 接收到发送过来的数据 req.body, 然后存入数据库
    res.set('content-type', 'application/json; charset=utf8')
 
    let _data = await userModel.save(req.body)
 
    handleDate(_data, res, 'index')
}

// 删除用户
const remove = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await userModel.remove(req.query)
    // 如果数据已经删除了，同时删除图片
    handleDate(_data, res, 'index')
}

//查找某条数据
const listone = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await userModel.listone(req.query)
    handleDate(_data, res, 'index')
}
//更新某条数据
const update = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    
    let _data = await userModel.update(req.body)
    handleDate(_data, res, 'index')
}

// 返回部分数据
const list = async (req, res) => {
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await userModel.list(req.query)
    handleDate(_data, res, 'index')
}

module.exports = {
    listall,
    save,
    remove,
    listone,
    update,
    list
}


