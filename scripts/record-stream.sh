#!/bin/bash

# Record stream
echo 'Please specify the radio context. Options: HLS, WebRTC'

read ctx

hls_server_url=rtmp://82.103.188.5:1935/live/radio
janus_server_url=rtp://82.103.188.4:5002

if [ $ctx == 'HLS' ]; then
        echo "Starting the RTMP stream to $hls_server_url"
        docker exec -it recording-client ffmpeg -i /audio/radio.mp3 -c:a aac -b:a 128k -ac 2 -f flv $hls_server_url
fi
if [ $ctx == "WebRTC" ]; then
        echo "Starting the RTP stream to $janus_server_url"
        docker exec recording-client ffmpeg -re -f mp3 -i /audio/radio.mp3 -f mulaw -ar 8000 -ac 1 -f rtp $janus_server_url