/**
 * Created by Administrator on 15-10-15.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    UserInfo: {
        username: {type: String, required: true},
        useremail: {type: String, required: true},
        avatar: {type: String},
        userpwd: {type: String, required: true}
    },
    Artical: {
        user: {type: ObjectId, ref: 'User'},
        title: {type: String, required: true},
        content: {type: String, required: true},

        createAt: {type: Date, default: Date.now}
    }
}