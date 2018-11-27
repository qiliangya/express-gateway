// var fs = require('fs');
// var path = require('path');
// var morgan = require('morgan')
// var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), {flags: 'a'});
// var errorLogStream = fs.createWriteStream(path.join(__dirname, '../logs/errors.log'), {flags: 'a'});
// var appLogStream = fs.createWriteStream(path.join(__dirname, '../logs/app.log'), {flags: 'a'});

// exports.use = function(app){
//   app.use(morgan('short', { stream: appLogStream }))
// }

// exports.access = function(){

// }
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var FileStreamRotator = require('file-stream-rotator')

var logDirectory = path.join(__dirname, '../logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogfile = FileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

var errorLogfile = FileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD',
  filename: path.join(logDirectory, 'error-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


// 自定义token
logger.token('from', function(req, res){
  return JSON.stringify(req.query) || '-';
});

logger.token('time', function(req, res){
  return new Date().Format("yyyy-MM-dd hh:mm:ss"); 
});

logger.token('nextROw', function(req, res){
  return "\r\n"; 
});

// 自定义format，其中包含自定义的token
logger.format('chargespot', '[chargespot] :time :remote-addr :remote-user :method :url :from :status :referrer :response-time ms :user-agent :nextROw');

//跳过不需要记录的请求
function skip (req) {
  return (req.url).indexOf('stylesheets') != -1
}


exports.use = function(app) {
  app.use(logger('chargespot'));
  app.use(logger('chargespot', { skip: skip, stream: accessLogfile }));
}

exports.error = errorLogfile