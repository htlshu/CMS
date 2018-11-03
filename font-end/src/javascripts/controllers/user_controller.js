
import { bus, handleToastByData } from '../util'
//所有列表视图
import user_list from '../views/user_list.html';
import user_save from '../views/user-save.html';
import user_update from '../views/user_update.html';
import userModel from '../models/user_model'


//所有列表视图的控制器
const list = async (req ,res ,next) => {
   req.query = req.query || {} // 防止没有参数的时候，req.query为null
    
   let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
       
       pageNo: req.query.pageNo,
       pageSize: req.query.pageSize,
       search: req.query.search
   }

    let _html = template.render(user_list ,{
        data:JSON.parse((await userModel.list(_page))).data // 获取到列表数据
        })
  
    res.render(_html);
    bindListEvent(_page)// 给添加按钮绑定事件
      // 显示搜索关键字
      $('.user-list #keywords').val(_page.search)
}  
// list的事件绑定
const bindListEvent = (_page) => {
    // 添加按钮点击跳转到添加路由
    $('.user-list #addbtn').on('click', function () {
        bus.emit('go','/user-save')
    })
    //修改按钮点击跳转到添加路由
    $('.user-list .user-update').on('click', function () {
        let id = $(this).parents('tr').data('id')
        bus.emit('go','/user-update', { id })
    })
  
    //  点击删除按钮
    $('.user-remove').on('click', function () {
        handleRemoveUser.bind(this,_page)()
    })

    $('.user-list #usersearch').on('click', function () {
        let _search = $('.user-list #keywords').val()
        // 重新刷新路由 ，注意，页码回复到1
        let _params = {
            search: _search,
            pageNo: 1
        }
        bus.emit('go',`/user-list?${$.param(_params)}`)
    })
}

//添加视图的控制器
const save = async (req, res, next) => { 
    res.render(user_save)
    bindSaveEvent()
}


//save的事件绑定
const bindSaveEvent=()=>{
    $('.user-save #back').on('click', function () {
        
        bus.emit('back','/user-list')
        
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

// 删除操作
const  handleRemoveUser = async function (_page)  {
    let id = $(this).parents('tr').data('id')
    let _data = await userModel.remove({id: id})
    // 如果此页种只有一条数据，说明删除之后需要跳转到前一页 
    // 删除的时候此页还有多少条数据
    let trs = $('.user-list__tabel tr[data-id]')

    
    // 如果只剩一个，将pageNo-1
    let _pageNo = trs.length > 1 ? _page.pageNo : (_page.pageNo - (_page.pageNo > 1 ? 1 : 0))
    handleToastByData(_data, {
        isReact: false,
        success: (data) => {
            // 删除成功后，i依然需要将pageNo带上，否则，删除后，重新渲染的时候会回到默认的第一页
            bus.emit('go', '/user-list?pageNo='+_pageNo+'&_='+data.deleteId)
        }
    })
}

//修改
const update = async (req, res) => {
    let { id } = req.body// 要更新的数据的id
    // 获取id对应的数据进行渲染

    let html = template.render(user_update, {
        data: (await userModel.listone({ id })).data // 获取到列表数据
    })
   
    res.render(html)
   
    bindUpdateEvent()
}

const bindUpdateEvent = () => {
    // 返回按钮逻辑
    $('.user-update #back').on('click', function () {
        bus.emit('go', '/user-list')
    })

    $('.user-update #update-form').submit(handleUpdateSubmit)
}

const handleUpdateSubmit = async function (e) {
    e.preventDefault();
  //  let _datastr = $(this).serialize()
  //  let _data = qs.parse(_datastr)
    let _results = await userModel.update()  
    handleToastByData(_results)
}
export default {
    list,
save,
update
}