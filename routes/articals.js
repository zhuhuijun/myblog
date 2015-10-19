var express = require('express');
var router = express.Router();
var markdown = require('markdown').markdown;
var auth = require('../middle/auth');
/****
 * 分页列表的现实页面
 */
router.get('/list/:pageNum/:pageSize', function (req, res, next) {
    var pageNumP = req.params.pageNum;
    if (pageNumP && parseInt(pageNumP) > 0) {
        pageNumP = parseInt(pageNumP);
    } else {
        pageNumP = 1;
    }

    var pageSizeP = req.params.pageSize;
    if (pageSizeP && parseInt(pageSizeP) > 0) {
        pageSizeP = parseInt(pageSizeP);
    } else {
        pageSizeP = 2;
    }
    var query = {};
    var keyword = req.query.keyword;
    var searchbtn = req.query.searchbtn

    if (searchbtn) {//更改条件
        console.log(searchbtn, keyword);
        req.session.keyword = keyword;
    }
    if (req.session.keyword) {
        query['title'] = new RegExp(req.session.keyword, 'i');
    }

    //分页
    Model('Artical').count(query, function (err, allcount) {
        Model('Artical').find(query).sort({createAt: -1}).skip((pageNumP - 1) * pageSizeP).limit(pageSizeP).populate('user').exec(function (err, ress) {
            res.render('list', {
                title: '文章的分页列表',
                pageNum: pageNumP,
                pageSize: pageSizeP,
                keyword: req.session.keyword,
                totalPage: Math.ceil(allcount / pageSizeP),
                artic: ress
            });

        });
    });

});
/**添加文章的现实页面*****/
router.get('/add', auth.CheckLogin, function (req, res, next) {
    res.render('add', { title: 'Express', artical: {} });
});
/***
 * 添加文章的功能
 */
router.post('/add', auth.CheckLogin, function (req, res, next) {
    var artical = req.body;
    artical.user = req.session.user;
    var _id = artical._id;
    console.log('====================================', _id);
    if (_id) {
        Model('Artical').update({_id: _id}, {$set: {title: artical.title, content: artical.content}}, function (err) {
            if (err) {
                req.flash('error', '修改失败!');
                return res.redirect('/articals/add');
            } else {
                return res.redirect('/');
            }
        });

    } else {
        console.log(artical);
        delete artical._id;
        new global.Model('Artical')(artical).save(function (err, arc) {
            if (err) {
                req.flash('error', '保存失败!');
                return res.redirect('/articals/add');
            } else {
                return res.redirect('/');
            }
        });
    }

});
/***
 * 详细页
 */
router.get('/detail/:_id', auth.CheckLogin, function (req, res, next) {
    Model('Artical').findOne({_id: req.params._id}, function (err, one) {
        one.content = markdown.toHTML(one.content);
        res.render('detail', { title: '编辑文章', artical: one });
    });

});
/**
 * 删除
 */
router.get('/delete/:_id', auth.CheckLogin, function (req, res, next) {
    Model('Artical').remove({_id: req.params._id}, function (err, one) {
        if (err) {
            req.flash('error', '删除失败!');
            return   res.redirect('back');
        } else {
            return   res.redirect('/');
        }
    });

});
/***
 * 修改的页面显示
 */
router.get('/edit/:_id', auth.CheckLogin, function (req, res, next) {
    Model('Artical').findOne({_id: req.params._id}, function (err, one) {
        res.render('add', { title: '显示文章', artical: one });
    });
});

module.exports = router;
