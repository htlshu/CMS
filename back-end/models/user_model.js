
const mongoose = require('../util/mongoose')
const Moment = require('moment') // 时间格式化
const fs = require('fs-extra') // 时间格式化
const PATH = require('path') // 时间格式化
let default_logo = '/uploads/logos/default.jpg'

let UserModel = mongoose.model('users',new mongoose.Schema({
    userLogo:String,//头像
    userName:String,//用户名
    userNickname : String,//昵称
    regiTime :String,//注册时加减
    isVip : String,//是否为VIP
    balance : String,//余额
    integration:String//积分
}))

// 返回列表全部数据
const listall = (query) => {
    let _query = query || {}// 查询的约定条件
    return UserModel.find(_query).sort({regiTime: -1}).then((results) => {
        return results
    }).catch((err) => {
        return false
    })
}
// 保存用户数据
const save = (body) => {
   
    // 此时的时间
   // let _timestamp = Date.now()
    // 根据这个时间创建moment
  //  let moment = Moment(_timestamp)
    body.userLogo =  body.userLogo || default_logo//如果没有上传图片就用默认的
    return new UserModel({
        ...body,
      //  createTime: _timestamp,    
       // formatTime: moment.format("YYYY-MM-DD, hh:mm")
    })
    .save()
    .then((result) => {
        
        return result
    })
    .catch((err) => {
        return false
    })

}



module.exports = {
    listall,
    save
}