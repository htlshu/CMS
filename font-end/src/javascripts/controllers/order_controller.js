//所有列表视图
import order_list from '../views/order_list.html';
//获取添加视图
import order_save from '../views/order_save.html';
//获取数据
import orderModel from '../models/order_model'
//工具
import { bus ,handleToastByData } from '../util'


//所有列表视图的控制器
const list = async (req ,res ,next) => {
    let _html = template.render(order_list ,
        {data : (await orderModel.list()).data});//获取数据
    res.render(_html);
    listEvent();
}
//list视图上的事件绑定
const listEvent = ()=> {
    $('.order-list #addbtn').on('click',function (){
        bus.emit('go','/order-save');
    })
    $('.order-list .pos-update').on('click',function (){
        let id = $(this).parents('tr').data('id');
        bus.emit('go','/order-update',{ id });
    })
    $('.pos-remove').on('click',removeOrder)
}
//删除操作
const removeOrder = function(){
    let id = $(this).parents('tr').data('id');
    let _data = orderModel.remove({id : id});
    handleToastByData(_results)
}
//添加视图
const save = (req ,res ,next) => {
    res.render(order_save);
    saveEvent();
}
//添加视图的事件绑定
const saveEvent = () => {

}
export default {
    list,
    save,

}