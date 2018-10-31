//所有列表视图
import order_list from '../views/order_list.html';
//获取添加视图
import order_save from '../views/order_save.html';
//获取更新视图
import order_update from '../views/order_update.html'
//获取数据
import orderModel from '../models/order_model'
//工具
import { bus ,handleToastByData } from '../util'
import qs from 'querystring'

//视图所有列表的控制器
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
const removeOrder = async function(){
    let id = $(this).parents('tr').data('id');
    let _data = await orderModel.remove({id : id});
    handleToastByData(_data,{
        isReact : true,
        success : (data) => {
            bus.emit('go','/order-list?_='+data.deleteId)
        }
    })
}
//视图添加
const save = (req ,res ,next) => {
    res.render(order_save);
    saveEvent();
}
//添加视图的事件绑定
const saveEvent = () => {
    $('.order-save #back').on('click',function(){
        bus.emit('go','/order-list');
    })
    $('.order-save #save-form').submit(handleSaveSubmit);
}
//开关防止多次提交
let isLoading = false;
//处理表单提交事件
const handleSaveSubmit = async function (e){
    e.preventDefault();
    if( isLoading ) return false;
    isLoading = true;
    let _result = await orderModel.save();
    isLoading = false;
    handleToastByData(_result);
}

//视图更新
const update = async (req ,res ) => {
    let { id } = req.body;
    let _html = template.render(order_update,{
        data : (await orderModel.listOne({id})).data
    })
    res.render(_html);
    updateEvent();
}
const updateEvent = () => {
    $('.order-update #back').on('click', function () {
        bus.emit('go', '/order-list')
    })

    $('.order-update #update-form').submit(handleUpdateSubmit)
}
const handleUpdateSubmit = async function (e) {
    e.preventDefault();
    let _datastr = $(this).serialize()
    let _data = qs.parse(_datastr)
    let _results = await orderModel.update(_data)  
    handleToastByData(_results)
}
export default {
    list,
    save,
    update,
}