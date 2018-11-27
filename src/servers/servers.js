var Servers = {
  wxAPI: require('./wxAPI/wx.api'),
  activityAPI: require('./activityAPI/activity.api')
}

exports.use = function(app) {
  Servers['wxAPI'](app, '/wx');
  Servers['activityAPI'](app, '/activity');
}