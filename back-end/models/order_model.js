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

const list = () => {
    let _query = {};
    return OrderModel.find(_query).sort({createTime : -1}).then((result) => {
        return result;
    }).catch((err) => {
        return false;
    })
}

//

//根据ID删除某一条数据
const remove = async ({
    id
}) => {
    let _row = await listOne({
        id
    });
    return OrderModel.deleteOne({
        _id: id
    }).then((result) => {
        fs.removeSync(PATH.resolve(__dirname, '../public' + _row.productImg))
        result.deleteId = id;
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
const save = (body) => {
    // 此时的时间
    let _timestamp = Date.now()
    // 根据这个时间创建moment
    let moment = Moment(_timestamp)

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
    if (body.republish) {
        let _timestamp = Date.now()
        let moment = Moment(_timestamp)
        body.createTime = _timestamp
        body.formatTime = moment.format("YYYY-MM-DD, hh:mm")
    }
    console.log(body.id);
    
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
}