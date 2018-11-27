require('./config/global');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var initLogger = require('./utils/logs')
var sassMiddleware = require('node-sass-middleware');
var server = require(path.join(__dirname, 'src/servers/servers'))
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

initLogger.use(app);

app.all('*',function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

server.use(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, '您访问的页面不存在!'));
});


// error handler
app.use(function(err, req, res, next) {
  var now = new Date();
  var time = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + ' '
      + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  var meta = '[' + time + '] '+req.method+' ' + req.url + '\r\n';
  initLogger.error.write(meta + err.stack + '\r\n\r\n\r\n');
  next();

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
