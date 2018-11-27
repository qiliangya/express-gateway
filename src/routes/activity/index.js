var express = require('express');
var router = express.Router();
var path = require('path');
var dataCtrl = require('../../controlers/activity/index.controler');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/v1/member/:memberId/lottery/count', dataCtrl.getCountByMemberId)
router.get('/v1/lottery', dataCtrl.getLottery)
router.get('/v1/lottery/doc', dataCtrl.getLotteryDoc)

module.exports = router;
