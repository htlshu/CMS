

   


import SMERouter from 'sme-router'
// bus工具
import bus from '../util/bus'
import home_template from '../views/home.html'
// 404视图
import not_found_template from '../views/404.html'
//order控制器
import orderController from '../controllers/order_controller'
//user控制器
import userController from '../controllers/user_controller'
//商品控制器
import products_controller from '../controllers/products_controller'
var router = null

// 启动路由的方法
const _init = () => {
    // 实例化路由工具
    router = new SMERouter('router-view')
    // 中间件会先执行 为导航按钮添加高亮样式
    router.use((req, res, next) => {
        _activeLink(req.route) 
    })
    // 开始匹配各个路由
    router.route('/home', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(home_template);
    })
   //订单列表路由
   router.route('/order-list',orderController.list);
   //用户列表路由
   router.route('/user-list',userController.list);
   // 保存用户路由
    router.route('/user-save', userController.save)
    //商品路由
   router.route('/products_list',products_controller.list)
   router.route('/products_save',products_controller.save)

   // 404路由
    router.route('/not-found', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(not_found_template)
        _navLink('.not-found a[to]')
    })

    //上面的没有匹配到就会跳转404路由或者首页
    router.route('*', (req, res, next) => {
        if (req.url === '') { // 刚进入项目，没有hash值，重定向到home
            res.redirect('/home')
        } else { // 如果路径匹配不到，导向404
            res.redirect('/not-found')
        }
    })

    //因为控制层无法使用到router，所以给bus绑定事件，在其他地方触发
    bus.on('go', (path, body = {}) => router.go(path, body));
    bus.on('back', () => router.back());

    // 给按钮添加事件
    _navLink()
}

 // 因为在控制器中无法使用到router，所以给bus绑定事件，在其他模块中触发bus的事件
 bus.on('go', (path, body = {}) =>  router.go(path, body) )
 bus.on('back', () =>  router.back() )  


// 给导航按钮添加点击事件
const _navLink = (selector) => {
    let $navs = $(selector || '.sidebar-menu li.nav-link[to]')
    $navs.on('click', function () {
        let _path = $(this).attr('to')
        router.go(_path)
    })
}

// 给导航按钮添加不同的类名
// @param route 当前路由的hash值
const _activeLink = (route) => {
    let $navs = $('.sidebar-menu li[to]')
    $navs.removeClass('active')
    $navs.filter(`[to='${route}']`)
         .addClass('active')
}         


export default {
    init: _init,
    navLink: _navLink
}