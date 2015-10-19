# 生成项目

>express -e zfpxblog

>npm install

>npm start

# 路由规划


* /首页显示文章列表
* `get      /users/reg           注册页面`
* `post     /users/reg           数据库注册`



* `get       /users/login        显示登录页面`
* `post      /users/login        登录`
* `get      /users/logout        退出`
* `get       /artical/add        增加文章页面`
* `post      /artical/add        增加文章`


# 安装中间件

* `npm install connect-flash --save`  页面回显
* `npm install express-session --save`
* `npm install connect-mongo --save` session持久化到数据库