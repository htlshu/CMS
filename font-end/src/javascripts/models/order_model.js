//提供所有订单信息
const list = () => {
    return $.ajax({
        url : '/api/v1/order/list',
        success : (data) => {
            return data;
        }
    })
}

export default {
    list,
}