
import bus from '../util/bus'

import products_list_template from '../views/products_list.html'
import products_save_template from '../views/products_save.html'

import products_model from '../models/products_model'

//商品列表
const list = async (req,res,next) => { 
    var _data = (await products_model.list()).data
    console.log(_data);

    //编译模板
    let html = template.render(products_list_template,{
        data: _data
    })
    res.render(html)

    bindListEvent()// 绑定事件
    
}

//list事件绑定  发布订阅模式
const bindListEvent = () => {
    $('.label-primary').on('click',function(){
        bus.emit('go','/products_save')
    })
}

//添加
const save = (req,res,next) => {
    res.render(products_save_template)
}

export default{
    list,
    save
}