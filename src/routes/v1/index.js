let activity = require('./activity/router/activity.router');
let wx = require('./wx/router/wx.router');

module.exports = function() {
  return [
    activity('/activity'), 
    wx('/wx')
  ]
}()