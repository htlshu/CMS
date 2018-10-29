let mongoose = require('../util/mongoose');
let fs = require('fs-extra');
let PATH = require('path');

let OrderModel = mongoose.model('order', new mongoose.Schema({
    productImg: String,
    productID: String,
    userID: String,
    orderTime: String,
    productNum: Number,
    totalPrice: Number,
}))

//返回所有列表的数据
const list = () => {
    return [{
        "productID": "01",
        "userID": "01",
        "orderTime": "2018.01.01",
        "productNum": 1,
        "totalPrice": 10,
    }]
}
/* const list = () => {
    return OrderModel.find().sort({orderTime : -1}).then((result) => {
        return result;
    }).catch((err) => {
        return false;
    })
} */

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
//保存数据
const save = (body) => {
    // 此时的时间
    let _timestamp = Date.now()
    // 根据这个时间创建moment
    let moment = Moment(_timestamp)

    return new PositionModel({
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
module.exports = {
    list,
    remove,
    save,
}