var express = require('express');
var router = express.Router();

var auth = require('../middle/auth');

/* GET users listing. */
router.get('/reg', auth.CheckNotLogin, function (req, res, next) {
    //error是flash中的类似读一次session然后删除
    //, error: req.flash('error').toString()  在app.js中
    res.render('reg', {title: '注册用户'});
});
router.post('/reg', auth.CheckNotLogin, function (req, res, next) {
    var user = req.body;
    console.log(user);
    if (user.userpwd != user.userpwdc) {
        req.flash('error', '两次的密码不一致!')
        //req.flash('error', '两次的密码不一致!')//是个数组
        return res.redirect('/users/reg');
    }
    delete user.userpwdc;//删除属性
    //user.userpwd = md5(user.userpwd);
    console.log(user);
    /*   new global.Model('User')(user).save(function (err, res) {
     if (err) {
     return res.redirect('/users/reg');
     } else {
     return res.redirect('/');
     }
     });*/
    req.session.user = user;
    return res.redirect('/');
});
router.get('/login', auth.CheckNotLogin, function (req, res, next) {
    res.render('login', {title: '用户登录'});
});
router.post('/login', auth.CheckNotLogin, function (req, res, next) {
    var user = req.body;
    global.Model('User').findOne(user, function (err, userrr) {
        if (err) {
            req.flash('error', '登录失败');
            return res.redirect('/users/login');
        }
        if (userrr) {
            req.session.user = userrr;
            return res.redirect('/');
        } else {
            req.flash('error', '用户名或者密码错误');
            return res.redirect('/users/login');
        }
    });
});

router.get('/logout', auth.CheckLogin, function (req, res, next) {
    req.session.user = null;
    res.render('login', {title: '用户登录'});
});
module.exports = router;
