
import { bus, handleToastByData } from '../util'
//所有列表视图
import user_list from '../views/user_list.html';
import user_save from '../views/user-save.html';
import userModel from '../models/user_model'



//所有列表视图的控制器
const list = async (req ,res ,next) => {
   console.log(5555)
 
    let _html = template.render(user_list ,{data :(await userModel.list()).data});
  
    res.render(_html);
    bindListEvent()// 给添加按钮绑定事件
}  
// list的事件绑定
const bindListEvent = () => {
    // 添加按钮点击跳转到添加路由
    $('.user-list #addbtn').on('click', function () {
        bus.emit('go','/user-save')
    })
  /*  //修改按钮点击跳转到添加路由
    $('.user-list .pos-update').on('click', function () {
        let id = $(this).parents('tr').data('id')
        bus.emit('go','/position-update', { id })
    })
    //点击删除按钮
    $('.pos-remove').on('click', function () {
        handleRemovePosition.bind(this,_page)()
    })*/
    
}

//添加视图的控制器
const save = async (req, res, next) => { 
    res.render(user_save)
    bindSaveEvent()
}
//save的事件绑定
const bindSaveEvent=()=>{
    $('.user-save #back').on('click', function () {
        bus.emit('back','/position-list')
    })

    //tijiao
    $('.user-save #save-form').submit(handleSaveSubmit)
}
// 开关防止多次提交
let _isLoading = false
const handleSaveSubmit = async function (e) {
    
    e.preventDefault()

    if ( _isLoading ) return false;

    _isLoading = true
    // 拿到form的数据
    // let _params = qs.parse($(this).serialize())

    let result = await userModel.save()
   
    _isLoading = false

    handleToastByData(result)
  
    // handleToastByData(result, { isReact: false, success: () => {
    //     bus.emit('go', '/position-list')
    // }})
}


export default {
    list,
save
}