const needHeaders = ['authorization', 'terminal', 'getway-type'];
var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var dataCtrl = require('../controler/activity.controler');

module.exports = function(baseUrl) {
  /* GET home page. */
  router.get(baseUrl, function(req, res, next) {
    res.render('index', { title: 'v1 + Express' });
  });

  router.all(baseUrl + '/*', (req, res, next) =>{
    res.header("Access-Control-Allow-Headers", "X-Requested-With, terminal, authorization, getway-type");
      if (req.method.toUpperCase() === 'OPTIONS' && req.headers['access-control-request-headers']) {  // 预请求放行
        next()
      } else {
        if (req.headers && needHeaders.every(v => !!req.headers[v])) {
          res.header('Content-Type', 'application/json;charset=utf-8');
          next();
        } else {
          next(createError(500, '无效的头信息'))
        }
      }
  })

  router.get(baseUrl + '/member/:memberId/lottery/count', dataCtrl.getCountByMemberId)
  router.get(baseUrl + '/lottery', dataCtrl.getLottery)
  router.get(baseUrl + '/lottery/doc', dataCtrl.getLotteryDoc)

  return router
}