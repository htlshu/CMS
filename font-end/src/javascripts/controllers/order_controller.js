//所有列表视图
import order_list from '../views/order_list.html';
//获取添加视图
import order_save from '../views/order_save.html';
//获取更新视图
import order_update from '../views/order_update.html'
//获取数据
import orderModel from '../models/order_model'
//工具
import {
    bus,
    handleToastByData
} from '../util'
import qs from 'querystring'

//视图所有列表的控制器
const list = async (req, res, next) => {
    req.query = req.query || {} // 防止没有参数的时候，req.query为null

    let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
        pageNo: req.query.pageNo || 1,
        pageSize: req.query.pageSize || 10,
        search: req.query.search
    }
    let _html = template.render(order_list, {
        data: (await orderModel.list(_page)).data
    }); //获取数据
    res.render(_html);
    listEvent(_page);
    // 显示搜索关键字
    $('.order-list #keywords').val(_page.search)
}
//list视图上的事件绑定
const listEvent = (_page) => {
    $('.order-list #addbtn').on('click', function () {
        bus.emit('go', '/order-save');
    })
    $('.order-list .pos-update').on('click', function () {
        let id = $(this).parents('tr').data('id');
        bus.emit('go', '/order-update', {
            id
        });
    })
    $('.pos-remove').on('click', function () {
        removeOrder.call(this, _page)
    })
    $('.order-list #possearch').on('click', function () {
        let _search = $('.order-list #keywords').val()
        // 重新刷新路由 ，注意，页码回复到1
        let _params = {
            search: _search,
            pageNo: 1
        }
        bus.emit('go', `/order-list?${$.param(_params)}`)
    })
}
//删除操作
const removeOrder = async function (_page) {
    let id = $(this).parents('tr').data('id');
    let _data = await orderModel.remove({
        id: id,
        ..._page
    });
    // 如果此页种只有一条数据，说明删除之后需要
    //跳转到前一页 
    // 删除的时候此页还有多少条数据
    // 如果只剩一个，将pageNo-1 
    console.log(_data);
    
    handleToastByData(_data, {
        isReact: true,
        success: (data) => {
            // 删除成功后，i依然需要将pageNo带上，否则，删除后，重新渲染的时候会回到默认的第一页
            let _pageNo = _page.pageNo
            if(_pageNo!=1){
                _pageNo -= data.isBack ? 1 : 0
            }
            bus.emit('go', '/order-list?pageNo=' + _pageNo + '&_=' + data.deleteId)
        }
    })
}
//视图添加
const save = (req, res, next) => {
    res.render(order_save);
    saveEvent();
}
//添加视图的事件绑定
const saveEvent = () => {
    $('.order-save #back').on('click', function () {
        bus.emit('go', '/order-list');
    })
    $('.order-save #save-form').submit(handleSaveSubmit);
}
//开关防止多次提交
let isLoading = false;
//处理表单提交事件
const handleSaveSubmit = async function (e) {
    e.preventDefault();
    if (isLoading) return false;
    isLoading = true;
    let _result = await orderModel.save();
    isLoading = false;
    handleToastByData(_result);
}

//视图更新
const update = async (req, res) => {
    let {
        id
    } = req.body;
    let _html = template.render(order_update, {
        data: (await orderModel.listOne({ id })).data
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