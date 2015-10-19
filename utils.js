/**
 * Created by Administrator on 15-10-15.
 */
global.md5 = function (val) {
    return require('crypto').createHash('md5').update(val).digest();
};