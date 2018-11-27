var path = require('path');
const routerConfig = require(__basepath + 'config/routerConfig.json');
const needHeaders = ['authorization', 'terminal']
var createError = require('http-errors');
module.exports = function(app, base_url) {
  // cors
  app.all(base_url + '/*', (req, res, next) => {
    // console.log(req.headers)
    // console.log(req)
    res.header("Access-Control-Allow-Headers", "X-Requested-With, terminal, authorization");
    if (req.headers['access-control-request-headers']) {  // 预请求放行
      next()
    } else {
      if (req.headers && needHeaders.every(v => !!req.headers[v])) {
        res.header('Content-Type', 'application/json;charset=utf-8');
        next();
      } else {
        console.log('错了')
        next(createError(500, '无效的头信息'))
      }
    }
    // needHeaders.forEach(v => {
    //   if (req["access-control-request-headers"]) {
    //     // 预检请求
    //     return ;
    //   }
    //   if (!req.headers[v]) {
    //     next(createError(500, '无效的头信息'))
    //     return ;
    //   }
    // })
  });
  
  var indexRouter = require(__basepath + 'src/routes/activity/index');
  var usersRouter = require(__basepath + 'src/routes/activity/users');

  app.use(base_url, indexRouter);
  app.use(base_url + '/users', usersRouter);
}