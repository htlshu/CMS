
// 引入路由
import router from './router'

// 引入样式
import '../stylesheets/products.scss'

// 主体结构视图
const body_template = require('./views/body.html')
// 渲染整体内容结构
$('#wrapper').html(body_template)

// 引入登录权限验证
import { userSigninAuth } from './util/auth'
import user_controller from './controllers/sign'

let init = async () => {
    let isSignIn = await userSigninAuth()
    if ( isSignIn ) {
        $('#wrapper').removeClass('hidden')
             
        router.init()
        user_controller.renderUserInfo()       
    }else {
        window.location.href="/admin.html"
    }
}


init()