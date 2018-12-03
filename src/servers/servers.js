let apiVersion = require('../routes/version');

exports.use = function(app) {
  app.use('/v1', ...apiVersion.v1);
  // app.use('/v2', apiVersion.v2);
  // for (var router in apiVersion) {
  //   // 遍历路由版本
  //   console.log(apiVersion[router])
  //   return false;
  //   app.use('/' + router, apiVersion[router]);
  // }
}