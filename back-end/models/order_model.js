let mongoose = require('../util/mongoose');
const Moment = require('moment') //时间格式化
let fs = require('fs-extra');
let PATH = require('path');

let OrderModel = mongoose.model('order', new mongoose.Schema({
    productImg: String,
    productID: String,
    userID: String,
    createTime: String,
    formatTime:String,
    productNum: Number,
    totalPrice: Number,
}))

const listall = (_query = {}) => {
    return OrderModel.find(_query).sort({createTime : -1}).then((result) => {
        return result;
    }).catch((err) => {
        return false;
    })
}

// 返回列表数据
const list = async ({ pageNo = 1, pageSize = 10, search = ''}) => {
    let reg = new RegExp(search, 'g')
    let _query = { // 匹配各个字段值只要有一个字段含有关键字
        $or: [
            { productID: reg },   
            { userID: reg },   
        ]
    }// 查询的约定条件
    // limit // 取几条
    // skip // 从哪里开始
    let _all_items = await listall(_query)
    return OrderModel.find(_query)
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
                totalPage: Math.ceil(_all_items.length / pageSize), // 总页数
                search // 搜索关键字
            }
        }
    }).catch((err) => {
        return false
    })
}

//根据ID删除某一条数据
const remove = async ({
    id, pageNo, pageSize
}) => {
    let _row = await listOne({
        id
    });
    return OrderModel.deleteOne({
        _id: id
    }).then( async (result) => {
        //  获取最新的数量
        let _all_items = await listall();
        result.deleteId = id
        result.isBack = (pageNo-1) * pageSize >= _all_items.length;
        if ( _row.productImg && _row.productImg  !== default_logo ) {
            fs.removeSync(PATH.resolve(__dirname, '../public'+_row.productImg))
        }  
        return result;
    }).catch((err) => {
        return false
    })
}
//根据ID查找某一条数据
const listOne = ({
    id
}) => {
    return OrderModel.findById(id).then((result) => {
        return result
    }).catch((err) => {
        return false
    })
}
//添加数据
let default_logo = '/uploads/logos/default.jpg'
const save = (body) => {
    // 此时的时间
    let _timestamp = Date.now()
    // 根据这个时间创建moment
    let moment = Moment(_timestamp)
    body.productImg =  body.productImg || default_logo
    return new OrderModel({
            ...body,
            createTime: _timestamp,
            formatTime: moment.format("YYYY-MM-DD, hh:mm")
        })
        .save()
        .then((result) => {
            return result
        })
        .catch((err) => {
            return false
        })
}
//修改数据
const update = (body) => {
    if ( !body.productImg ) delete body.productImg
    if (body.republish) {
        let _timestamp = Date.now()
        let moment = Moment(_timestamp)
        body.createTime = _timestamp
        body.formatTime = moment.format("YYYY-MM-DD, hh:mm")
    }
    return OrderModel.updateOne({
        _id: body.id
    }, {$set:{ ...body
    }}).then((results) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                
        return results
    }).catch((err) => {
        return false
    })
}

module.exports = {
    list,
    remove,
    save,
    listOne,
    update,
    listall
}