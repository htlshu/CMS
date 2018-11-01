var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 解析cookie
var logger = require('morgan');
var { version } = require('./config')
// 路由工具
var indexRouter = require('./routes/index');
var orderRouter = require('./routes/order_router');
var userRouter = require('./routes/user_router');
var productsRouter = require('./routes/products');
var adminRouter = require('./routes/admin');
// 应用程序
var app = express();
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 使用各种中间件
app.use(logger('dev'));
// body-parser 处理form-data和request payload数据
// express 4.X 内部集成了body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());// 解析cookie

// 静态资源处理
app.use(express.static(path.join(__dirname, 'public')));

// 启用路由工具
app.use('/', indexRouter);
//user界面路由管理
app.use('/api/'+version+'/user',userRouter);
//order界面路由管理
app.use('/api/'+version+'/order',orderRouter);
app.use('/api/'+version+'/products',productsRouter);
<<<<<<< HEAD
=======
app.use('/api/'+ version +'/admin', adminRouter);
>>>>>>> 0a879e909ac9aad7236ae7e9ca4ac09645852568



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
