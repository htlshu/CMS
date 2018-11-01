
import bus from '../util/bus'

import products_list_template from '../views/products_list.html'
import products_save_template from '../views/products_save.html'
import products_update_template from '../views/products_update.html'

import products_model from '../models/products_model'
import qs from 'querystring'
//商品列表
const list = async (req,res,next) => { 
    req.query = req.query || {}
    let _pages = {
        pageNo :req.query.pageNo,
        pageSize : req.query.pageSize,
        search : req.query.search
    }
    
    let _data = (await products_model.list(_pages)).data
    
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
    $('.box .remove').on('click',removeEvent)
    $('.box .update').on('click',function(){
        let id = $(this).parents('tr').data("id") 
    
        bus.emit('go','/products_update',{id})
        
    })
    $('.box .productsSearch').on('click',pronductSearch)
    $()
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
       
       let _result = await products_model.save(_params)
       //添加成功后可以加个提示
       
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
    
}
//删除

const removeEvent =async function(){
    
    let id = $(this).parents('tr').data("id")    //data-id  h5新增
    let result =await products_model.remove({id:id})
    if(result.status=200){
        bus.emit('go','/products_list?_='+ result.data.deleteId)  //删除是哈希值不改变  所以页面不刷新
    }
    
}
//修改
const update =async (req,res,next) => {
    
    let {id}= req.body
    let _data = (await products_model.listOne({id})).data   //这里必须要把await()起来   异步函数执行完
    
    let html = template.render(products_update_template,{
        data:_data
    })
    res.render(html)

    bindUpdataEvent()
    
}
const bindUpdataEvent = () => {
    $('.products_update #back').on('click', function () {
        bus.emit('go', '/products_list')
    })
    $('.products_update #update-form').submit(async function(e){      //jqury 的 submit 方法
        e.preventDefault()
       //submit()函数的返回值为jQuery类型，返回当前jQuery对象本身
        
       let _params = qs.parse($(this).serialize())
       
       let _result = await products_model.update(_params)

       //修改成功后可以加个提示
       if(_result.status == 200){
           bus.emit('go','/products_list')
       }
       
    })

}
//搜索
const pronductSearch =async () => {

    let _data = $('.box .Search').val()
    // 重新刷新路由 ，注意，页码回复到1
    let _params = {
        search:  _data,
        // pageNo: 1
    }
    bus.emit('go',`/products_list?${$.param(_params)}`)
    
}

export default{
    list,
    save,
    update
}