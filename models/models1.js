/**
 * Created by Administrator on 15-10-16.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    Author: {
        username: {type: String, required: true}
    }
}