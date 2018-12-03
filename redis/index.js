const redis = require("redis");
const redisConfig = require('../config/redisConfig.json');

const client = redis.createClient(redisConfig);

client.on('error', function(err) {
  console.log("Redis Error: " + err);
})

exports.setRedis = (schema, payload) => {
  client.hmset(schema, payload, function(err) {
    if (err) throw err;
  })
}

exports.getRedis = schema => {
  return new Promise((resolve, reject) => {
    client.hmget(schema, (err, data) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(data)
    })
  })
}

exports.getRedisAll = schema => {
  return new Promise((resolve, reject) => {
    client.hgetall(schema, (err, data) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(data)
    })
  })
}