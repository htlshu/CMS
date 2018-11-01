
import URL from 'url'

const pageHeaderInfo = (url, prevUrl) => {
    let _urlinfo = URL.parse(url)
    let _pathname = _urlinfo.pathname
    // search ?  是url种解析出来的 ?a=1&b=2&search
    let _search = URL.parse(prevUrl).search
    let _infos = {
        '/home': {
            title: '首页',
            list: []
        },
        '/map': {
            title: '地图显示',
            list: [
                { text: '地图', path: '#/map' }
            ]
        },
        '/order-list': {
            title: '订单管理',
            description: '订单列表',
            list: [
                { text: '订单列表' }
            ]
        },
        '/order-save': {
            title: '订单管理',
            description: '订单职位',
            list: [
                { text: '订单列表', path: '#/order-list'+_search },
                { text: '添加订单'}
            ]
        },
        '/order-update': {
            title: '订单管理',
            description: '订单更新',
            list: [
                { text: '订单列表', path: '#/order-list'+_search },
                { text: '订单更新'}
            ]
        }
    }
    return _infos[_pathname] || {  }
}


export default {
    pageHeaderInfo
}