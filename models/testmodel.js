/**
 * Created by Administrator on 15-10-15.
 */
/*
 require('./model');
 new global.Model('User')({username: 'zhuhj', userpwd: '123', useremail: '123@qq.com'}).save(function (err, res) {
 if (err) {
 console.log(err);
 } else {
 console.log(res);
 }
 });*/


require('./model1');
new global.Model('Author')({username: 'zhhj'}).save(function (err, tet) {
    if (err) {
        console.log(err);
    } else {
        console.log(tet);
    }
});