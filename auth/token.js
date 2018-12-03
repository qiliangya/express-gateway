var crypto = require('crypto');
const tokenConfig = require('./../constant/constant').token
class Token {
  constructor (options, timeout) {
    this.payloadOptions = {
      data: options,  // token参数
      created: Math.parseInt(Date.now() / 1000),  // token生成时间 以秒做单位
      exp: Math.parseInt(timeout) || 10 // token 有效期
    }
  }

  // 生成token
  createToken () {
    // payload信息
    let base64Str = Buffer.from(JSON.stringify(this.payloadOptions), 'utf8').toString('base64');
    let secret = tokenConfig.SECRET;
    let hash = crypto.createHmac('sha256', secret);
    hash.update(base64Str);
    let signature = hash.digest('base64');

    return base64Str + '.' + signature;

  }

  // 解析token
  decodeToken (token) {
    let decArr = token.split('.');
    if (decArr.length < 2) {  // 不合法token
      return false
    }
    let payload = {};
    
    // 字符串转对象
    try {
      payload = JSON.parse(Buffer.from(decArr[0], 'base64').toString('base64'));
    } catch(e) {
      return false;
    }

    let secret = tokenConfig.SECRET;
    let hash=crypto.createHmac('sha256',secret);
        hash.update(decArr[0]);
    let checkSignature=hash.digest('base64');

    return {
        payload:payload,
        signature:decArr[1],
        checkSignature:checkSignature
    }
  }

  // 校验token
  checkToken (token) {
    let resDecode=this.decodeToken(token);

    if(!resDecode){
        return false;
    }

    //是否过期
    let expState=(parseInt(Date.now() / 1000) - parseInt(resDecode.payload.created)) > parseInt(resDecode.payload.exp) ? false : true;
    if (resDecode.signature === resDecode.checkSignature && expState) {
        return true;
    }
    return false;
  }
}

//  暴露token
module.exports = exports = Token