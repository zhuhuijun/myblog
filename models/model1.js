/**
 * Created by Administrator on 15-10-16.
 */
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:28017/nodeblog");
//模型
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;//自动生成的id
var models = require('./models1')
//作者的模型
//作者
//var Author = connection.model('Author', models.Author);
mongoose.model('Author', new Schema(models.Author));

global.Model = function (type) {
    return mongoose.model(type);
};