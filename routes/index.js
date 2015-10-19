var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    Model('Artical').find({}).populate('user').exec(function (err, artic) {

        res.render('index', { title: '我的博客', artic: artic});
    });

});

module.exports = router;
