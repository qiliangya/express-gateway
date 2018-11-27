var path = require('path');

module.exports = function(app, base_url) {
  // cors
  app.all(base_url + '/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  var indexRouter = require(__basepath + 'src/routes/wx/index');
  app.use(base_url, indexRouter);
}