module.exports = function(app) {
    var controllers = require('../controllers/api-controllers');
  
    // Routes
    app.route('/radio/hls')
      .get(controllers.radio_hls)

    app.route('/radio/webrtc')
      .get(controllers.radio_webrtc)
  };