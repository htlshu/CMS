
let mongoose = require('../util/mongoose');



let OrderModel = mongoose.model('order',new mongoose.scheme({
    productID : String,
    userId : String,
    orderTime : String,
    productNum : Number,
    totalPrice : Number,
}))