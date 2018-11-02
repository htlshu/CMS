const admin_model = require('../models/admin')
const { handleDate } = require('../util')
const jwt = require('jsonwebtoken')
const fs  = require('fs')
const PATH  = require('path')
const signup = async (req, res, next) => {
    
    // 先判断有没有这个用户 
    let _judge_result = await admin_model.judgeUserByUsername(req.body.username)
    
    if ( !_judge_result.length ) { // 如果没有这个用户
        if ( !req.body.nickname ) req.body.nickname = req.body.username
        // 注册
        let _data = await admin_model.signup(req.body)
        handleDate(_data, res, 'admin')
    } else { // 如果有这个用户
        res.render('index', {
            code: 201,
            data: JSON.stringify('用户名已存在')
        })
    }
    
}
const signin = async (req, res, next) => {
    // 先判断有没有这个用户 
    let _judge_result = await admin_model.judgeUserByUsername(req.body.username)
    
    if ( !!_judge_result.length ) { // 如果有这个用户
        // 登录
        let _data = await admin_model.signin(req.body.password, _judge_result[0])
        // 如果前端利用完整的表单提交逻辑的话，可以利用res.redirect告知浏览器进行跳转
        // res.redirect('/')
        if (_data) {
            // 非对称加密
            let _payload = { // 钥加密的数据
                userid: _judge_result[0]._id,
                username: _judge_result[0].username,
                level: 8,
            }
            // 取出来私钥
            let _private = fs.readFileSync(PATH.resolve(__dirname, '../keys/private.key'))

            var _token = jwt.sign(_payload, _private, { algorithm: 'RS256'});
            res.render('index', { code: 200, data: JSON.stringify({token : _token}) })
        } else {
            res.render('index', { code: 203, data: JSON.stringify('密码错误') })
        }
        
    } else { // 如果没有这个用户
        res.render('index', {
            code: 202,
            data: JSON.stringify('用户名不存在')
        })
    }
    
    
}


module.exports = {
    signup,
    signin
}