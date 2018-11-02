
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


const remove = async( { id } ) => {
    // 删除数据库中的某一条数据
    let _row = await listone({ id })
  
    return UserModel.deleteOne({ _id: id }).then((results) => {
        results.deleteId = id
        if ( _row.userLogo && _row.userLogo !== default_logo) {
        fs.removeSync(PATH.resolve(__dirname, '../public'+_row.userLogo))
        }
        return results
    }).catch((err) => {
        // fs.appendFileSync('./logs/logs.txt', Moment().format("YYYY-MM-DD, hh:mm") + '' +JSON.stringify(err))
        return false
    })
}



// 返回列表数据
const list = async ({ pageNo = 1, pageSize = 2, search = '' }) => {
    let re = new RegExp(search, 'i')
    let _query = search ?  { userName: re } : {}// 查询的约定条件
    // limit // 取几条
    // skip // 从哪里开始
    let _all_items = await listall(_query)


    return UserModel.find(_query)
    .sort({createTime: -1})
    .skip((pageNo - 1) * pageSize)// 从哪一页开始
    .limit(~~pageSize)// 截取多少
    .then((results) => {
        return { 
            items: results, 
            pageInfo: { // 页码信息
                pageNo, // 当前页
                pageSize, // 一页数量
                total: _all_items.length, // 总数
                totalPage: Math.ceil(_all_items.length / pageSize) // 总页数
            }
        }
    }).catch((err) => {
        return false
    })
}
const listone = ({ id }) => {
    return UserModel.findById(id).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
}


const update = async (body) => {
    if ( !body.userLogo )   delete body.userLogo
//    {
//   body= {...PositionModel.findById({ _id: body.id })}
   
//    }  
   /*if ( body.republish ) {
       let _timestamp = Date.now()
       let moment = Moment(_timestamp)
       body.createTime = _timestamp
       body.formatTime = moment.format("YYYY-MM-DD, hh:mm")
   }*/
   return UserModel.updateOne({ _id: body.id }, { ...body }).then((results) => {
      
       return results
   }).catch((err) => {
       return false
   }) 
}
module.exports = {
    listall,
    save,
    remove,
    list ,
    listone,
    update
}