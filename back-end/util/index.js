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
        date : date,
    })
}

module.exports = {
    handleDate,
}