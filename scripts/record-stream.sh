#!/bin/bash

# Record streams
hls_server_url=rtmp://hls-server:1935/live/radio
janus_server_url=rtp://janus-server:5002
audio_location=https://traffic.libsyn.com/secure/forcedn/gpbaudio/federico_brundo.mp3

docker exec recording-client ffmpeg -re -i $audio_location -c:a aac -b:a 128k -ac 2 -f flv $hls_server_url -f mulaw -ar 8000 -ac 1 -f rtp $janus_server_url
        
