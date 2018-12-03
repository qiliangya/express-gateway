const express_jwt = require('express-jwt')
const SECRET = require('../config/redisConfig.json').SECRET
const unless = require('express-unless');
const redis = require('../redis');
const jwt = require('jsonwebtoken');

class Token {
  constructor(){
    // 编码成base64
    this.__SECRET = new Buffer(SECRET, 'base64');
    
  }

  sign(user) {
    return jwt.sign(user, this.__SECRET)
  }

  getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
  }

  validToken() {
    return 
  }
}

module.exports = new Token()