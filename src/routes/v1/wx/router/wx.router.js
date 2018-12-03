var express = require('express');
var router = express.Router();

module.exports = function(baseUrl) {
  router.get(baseUrl, function(req, res, next) {
    res.status(401).send('Bad request!')
  })
  return router
}