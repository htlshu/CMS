//所有列表视图
import order_list from '../views/order_list.html';
import orderModel from '../models/order_model'



//所有列表视图的控制器
const list = async (req ,res ,next) => {
    let _html = template.render(order_list ,{data : (await orderModel.list()).data});
    res.render(_html);
}  




export default {
    list,

}