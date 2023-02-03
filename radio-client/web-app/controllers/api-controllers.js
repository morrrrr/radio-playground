exports.radio_hls = function(req, res) {
    res.sendFile(__dirname + '/radio-hls.html');
}

exports.radio_webrtc = function(req, res) {
    res.sendFile(__dirname + '/radio-webrtc.html');
}
