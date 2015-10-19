/**
 * Created by Administrator on 15-10-15.
 */
exports.CheckLogin = function (req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录!');
        return  res.redirect('/users/login');
    }
    next();
};

exports.CheckNotLogin = function (req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录!');
        return  res.redirect('back');
    }
    next();
};