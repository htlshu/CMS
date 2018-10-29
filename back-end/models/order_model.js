
let mongoose = require('../util/mongoose');



let OrderModel = mongoose.model('order',new mongoose.Schema({
    productID : String,
    userID : String,
    orderTime : String,
    productNum : Number,
    totalPrice : Number,
}))

//返回所有列表的数据
const list = () => {
    return OrderModel.find().sort({orderTime : -1}).then((result) => {
        return result;
    }).catch((err) => {
        return false;
    })
}




module.exports = {
    list,
}