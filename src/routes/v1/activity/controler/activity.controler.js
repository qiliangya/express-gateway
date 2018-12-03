var request = require('request');
// 需要传递的头信息
const needHeaders = ['authorization', 'terminal']

var fillterHeaders = function(headers) {
  var resultHeader = {}
  needHeaders.forEach(function(v, i) {
    resultHeader[v] = headers[v]
  })
  return resultHeader
}


exports.getCountByMemberId = function(req, res, next) {
  let { memberId = 2015 } = req.params.memberId
  request({
    url: __httpUrl + '/v1/member/' + memberId + '/lottery/count',
    json: true,
    headers:fillterHeaders(req.headers)
  }, function(err,subRes,data){
    if (err) throw err;
    res.json(data)
  })
}

exports.getLottery = function(req, res, next) {
  let { timestamp = new Date().getTime(), language = 'zh_HK' } = req.query
  request({
    url: __httpUrl + '/v1/lottery?timestamp='+ timestamp +'&language=' + language,
    json: true,
    headers:fillterHeaders(req.headers)
  }, function(err,subRes,data){
    if (err) throw err;
    res.json(data)
  })
}

exports.getLotteryDoc = function(req, res, next) {
  let { timestamp = new Date().getTime(), language = 'zh_HK' } = req.query
  request({
    url: __httpUrl + '/v1/lottery/doc?timestamp='+ timestamp +'&language=' + language,
    json: true,
    headers:fillterHeaders(req.headers)
  }, function(err,subRes,data){
    if (err) throw err;
    res.json(data)
  })
}