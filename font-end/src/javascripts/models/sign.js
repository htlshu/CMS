// 判断是否登录
const isSignIn = ({ token }) => {
    return $.ajax({
        url: '/api/v1/sign/isSignIn',
        data: { token },
        success: results => results
    })
}

const info = (_data) => {
    return $.ajax({
        url: '/api/v1/sign/info',
        data: {
            ..._data,
            token: localStorage.getItem('token') || ''
        },
        success: results => results
    })
}

const exit = () => {
    return $.ajax({
        url: '/api/v1/sign/exit',
        success: results => results
    })
}

const allow = (auth) => {
    return $.ajax({
        url: '/api/v1/sign/check',
        data: { 
            auth,
            token: localStorage.getItem('token') || ''
        },
        success: results => results
    })
}

export default {
    isSignIn,
    info,
    exit,
    allow
}