let mongoose = require('mongoose');
//链接本地数据库
mongoose.connect('mongodb://localhost:27017/missfresh',{ useNewUrlParser : true});
let db = mongoose.connection;
//成功和失败提醒
db.on('error',console.error.bind(console,'connection error:'));
db.on('open',function(){
    console.log('数据库链接成功');
})
module.exports = mongoose;