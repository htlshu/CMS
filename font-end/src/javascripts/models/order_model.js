//提供所有订单信息
const list = () => {
    return $.ajax({
        url : '/api/v1/order/list',
        success : (data) => {
            return data;
        }
    })
}
//提供某一条数据
const listOne = (data) => {
    return $.ajax({
        url : '/api/v1/order/listOne',
        data,
        success : (result) => {
            return result;
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
//更新的数据
const update = (data) => {
    return $.ajax({
        url : '/api/v1/order/update',
        data,
        type : 'POST',
        success : (result) => {
            return result
        }
    })
}
export default {
    list,
    remove,
    save,
    listOne,
    update
}