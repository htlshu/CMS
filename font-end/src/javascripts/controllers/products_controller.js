
import bus from '../util/bus'

import products_list_template from '../views/products_list.html'
import products_save_template from '../views/products_save.html'

import products_model from '../models/products_model'
import qs from 'querystring'
//商品列表
const list = async (req,res,next) => { 
    var _data = (await products_model.list()).data

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
    bindSaveEvent()         
}

//返回列表
// save的事件绑定
const bindSaveEvent = () => {
    $('.products_save #back').on('click', function () {
        bus.emit('go', '/products_list')
    })
    
    let _isLoading = false
   
    $('.products_save #save-form').submit(async function(e){      //jqury 的 submit 方法
        e.preventDefault()
       //submit()函数的返回值为jQuery类型，返回当前jQuery对象本身
        
       let _params = qs.parse($(this).serialize())
       console.log(_params)
       let _result = await products_model.save(_params)
       console.log(_result)
       
    })
    // let _isLoading = false

    // $('.box-info #save-form').submit(async function (e) {
    //     e.preventDefault()
    //     if ( _isLoading ) return false;

    //     _isLoading = true
    //     // 拿到form的数据
    //     let _params = qs.parse($(this).serialize())
    //     let result = await position_model.save(_params)
    //     _isLoading = false
    //     if ( result.status == 200 ) {
    //         $.toast({ 
    //             text : "保存成功", 
    //             showHideTransition : 'fade',
    //             allowToastClose : false,
    //             hideAfter : 3000,
    //             stack : 5,
    //             textAlign : 'left',
    //             position : 'top-center'
    //           })     
    //     } else {
    //         $.toast({ 
    //             text : "保存失败", 
    //             showHideTransition : 'fade',
    //             allowToastClose : false,
    //             hideAfter : 3000,
    //             stack : 5,
    //             textAlign : 'left',
    //             position : 'top-center'
    //           })  
    //     }
       

    // })
}

export default{
    list,
    save
}