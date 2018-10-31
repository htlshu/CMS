const bcrypt = require('bcryptjs')


const none = () => {}

//返回错误代码
const handleDate = (data ,res ,template ,callback = {}) => {
    let {success , fail } = {
        success : callback.success || none,
        fail : callback.fail || none,
    }
    if(!data){
        fail();
        response.call(res,{template,code : 500,data : '后端返回数据出错，data不存在'})
    }else{
        success();
        response.call(res ,{template,code : 200 ,data : JSON.stringify(data)})
    }
}
const response = function ({template ,code ,data}){
    this.render(template,{
        code : code,
        data : data,
    })
}

const hash = (textplain) => {  
    const saltRounds = 10; // 加密强度 10
    return new Promise((resolve) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(textplain, salt, function(err, hash) {
                // Store hash in your password DB.
                resolve(hash)
            });
        });
    })
    
}




module.exports = {
    handleDate,
    hash
}