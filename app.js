var express = require('express');
var path = require('path');//路径
var favicon = require('serve-favicon');//收藏夹图标
var logger = require('morgan');//日志
var cookieParser = require('cookie-parser');//cookie--req.cookies
var bodyParser = require('body-parser');//Form--req.body

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');


var routes = require('./routes/index');//主页路由
var users = require('./routes/users');//用户路由
var articals = require('./routes/articals');//文章
var app = express();
//============================================================
require('./utils');
require('./models/model');
//============================================================
// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置模板的存放路径
/*app.set('view engine', 'ejs');//模板引擎*/
app.set('view engine', 'html');//模板引擎
app.engine('html', require('ejs').__express);//使用html后缀
// uncomment after placing your favicon in /public
// favicon.ico的存放路径
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//中间件
app.use(logger('dev'));
app.use(bodyParser.json());//请求的数据类型是json/content-type:application/json
app.use(bodyParser.urlencoded({ extended: false }));//解析form数据
app.use(cookieParser());
//静态文件服务
app.use(express.static(path.join(__dirname, 'public')));
//自己的中间件
//执行玩中间件后 req.session
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'zfsecret',//密钥
    key: 'zhufengkey',//cookie name
    cookie: {maxAge: 1000 * 60 * 60},//设置过期时间
    store: new MongoStore({
        db: 'nodeblog',
        host: '127.0.0.1',
        port: 28017
    })
}));
app.use(flash());
//关于错误的提示
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.error = req.flash('error').toString();
    res.locals.keyword = req.session.keyword;
    next();
})
app.use('/', routes);
app.use('/users', users);
app.use('/articals', articals);//文章
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
