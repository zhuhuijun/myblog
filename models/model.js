/**
 * Created by Administrator on 15-10-15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require('./models');
mongoose.connect("mongodb://127.0.0.1:28017/nodeblog");
mongoose.model('User', new Schema(models.UserInfo));

mongoose.model('Artical', new Schema(models.Artical));


global.Model = function (type) {
    return mongoose.model(type);
};