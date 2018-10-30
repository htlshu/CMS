//提供所有订单信息
const list = () => {
    return $.ajax({
        url : '/api/v1/order/list',
        success : (data) => {
            return data;
        }
    })
}
//删除数据
const remove = (data) => {
    return $.ajax({
        url : '/api/v1/order/remove',
        data,
        success : (result) => {
            return result;
        }
    })
}
//保存数据
const save = () => {
    return new Promise((resolve) => {
        //jquery form插件方法ajaxSubmit（）
        $('.position-save #save-form').ajaxSubmit({
            url: '/api/v1/order/save',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}
export default {
    list,
    remove,
    save,
}