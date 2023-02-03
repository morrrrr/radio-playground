var janus = null;
var streaming = null;
var opaqueId = 'webrtc-radio-' + Janus.randomString(12);
var player = document.getElementById("player");
var streamId = 2;

Janus.init({
    debug: true,
    callback: function () {
        window.addEventListener('load', e => createSession());
    }
});

function createSession() {
    Janus.log("Creating Janus Session");
    // make sure the browser supports WebRTC
    if (!Janus.isWebrtcSupported()) {
        alert("No WebRTC support... ");
        return;
    }
    janus = new Janus({
        server: 'http://82.103.188.4:8088/janus',
        success: function () {
            // attach to streaming plugin
            janus.attach({
                plugin: "janus.plugin.streaming",
                opaqueId: opaqueId,
                success: function (pluginHandle) {
                    streaming = pluginHandle;
                    Janus.log("Plugin attached! (" + streaming
                        .getPlugin() + ", id=" + streaming
                        .getId() + ")");
                    // Setup streaming session
                    player.addEventListener("play", e => {
                        requestStream();
                    })
                },
                error: function (error) {
                    Janus.error("  -- Error attaching plugin... ",
                        error);
                    alert("Error attaching plugin... " +
                        error);
                },
                iceState: function (state) {
                    Janus.log("ICE state changed to " + state);
                },
                webrtcState: function (on) {
                    Janus.log(
                        "Janus says our WebRTC PeerConnection is " +
                        (on ? "up" : "down") + " now");
                },
                onmessage: function (msg, jsep) {
                    Janus.debug(" ::: Got a message :::", msg);
                    var result = msg["result"];
                    if (result) {
                        if (result["status"]) {
                            var status = result["status"];
                            if (status === 'starting')
                                Janus.debug("Status is starting.")
                            else if (status === 'started')
                                Janus.debug("Status is started.")
                            else if (status === 'stopped')
                                stopStream();
                        }
                    } else if (msg["error"]) {
                        alert(msg["error"]);
                        stopStream();
                        return;
                    }
                    if (jsep) {
                        Janus.debug("Handling SDP as well...", jsep);
                        // Offer from the plugin, let's answer
                        streaming.createAnswer({
                            jsep: jsep,
                            media: {
                                audioSend: false,
                                videoSend: false
                            },
                            // We only specify data channels here, as this way in
                            // case they were offered we'll enable them. Since we
                            // don't mention audio or video tracks, we autoaccept them
                            // as recvonly (since we won't capture anything ourselves)
                            tracks: [{
                                type: 'data'
                            }],
                            success: function (jsep) {
                                Janus.log("Got SDP!", jsep.sdp);
                                startStream(jsep);
                            },
                            error: function (error) {
                                Janus.error("WebRTC error:", error);
                                alert("WebRTC error... " + error.message);
                            }
                        });
                    }

                },
                onremotestream: function (stream) {
                    Janus.log("Remote stream" + stream);
                    Janus.attachMediaStream(player, stream);
                },
                oncleanup: function () {
                    Janus.debug(
                        " ::: Got a cleanup notification :::");
                }
            });
        },
        error: function (error) {
            Janus.error(error);
            alert(error, function () {
                window.location.reload();
            });
        },
        destroyed: function () {
            window.location.reload();
        }
    });
}

function requestStream() {
    Janus.log("Requesting radio stream");
    var body = {
        request: "watch",
        id: streamId
    };
    streaming.send({
        message: body
    });
    streamInfo(streamId);
    player.addEventListener("pause", (event) => {
        pauseStream();
    })
}

function restartStream() {
    Janus.log("Restarting radio stream");
    var body = {
        request: "start",
    };
    streaming.send({
        message: body
    });
}

function startStream(jsep) {
    Janus.log("Starting radio stream");
    var body = {
        request: "start",
    };
    streaming.send({
        message: body,
        jsep: jsep
    });
}

function pauseStream() {
    Janus.log("Pausing radio stream");
    var body = {
        request: "pause",
    };
    streaming.send({
        message: body
    });
    player.addEventListener("play", e => {
        restartStream();
    })
}

function stopStream() {
    Janus.log("Stopping radio stream");
    var body = {
        request: "stop"
    };
    streaming.send({
        message: body
    });
    streaming.hangup();
    clearStreamInfo();
}

function availableStreams() {
    var body = {
        request: "list"
    };
    Janus.debug("Sending message:", body);
    streaming.send({
        message: body,
        success: function (result) {
            if (!result) {
                alert("Got no response to our query for available streams");
                return;
            }
            if (result["list"]) {
                var list = result["list"];
                for (var mp in list) {
                    var streamName = list[mp]["id"] + ">" + list[mp]["description"] + " (" + list[mp]["type"] + ")";
                    const streamsNode = document.querySelector("#streams");
                    streamsNode.innerHTML += "<li>" + streamName + "</li>"
                }
            }
        }
    });
}

function streamInfo(stream) {
    var body = {
        request: "info",
        id: stream
    };
    streaming.send({
        message: body,
        success: function (result) {
            if (result && result.info) {
                document.getElementById("stream-info").innerHTML = "Now Playing: " + result.info.description + " (" + result.info.type + ")";
            }
        }
    });
}

function clearStreamInfo() {
    document.getElementById("stream-info").innerHTML = "";
}