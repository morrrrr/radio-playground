#!/bin/bash

# Record stream
echo 'Please specify the radio context. Options: (H) - HLS, (W) - WebRTC'

read ctx

hls_server_url=rtmp://82.103.188.5:1935/live/radio
janus_server_url=rtp://82.103.188.4:5002
audio_location=https://traffic.libsyn.com/secure/forcedn/gpbaudio/federico_brundo.mp3

if [ $ctx == 'H' ]; then
        echo "Starting the RTMP stream to $hls_server_url"
        docker exec recording-client ffmpeg -re -i $audio_location -c:a aac -b:a 128k -ac 2 -f flv $hls_server_url
fi
if [ $ctx == "W" ]; then
        echo "Starting the RTP stream to $janus_server_url"
        docker exec recording-client ffmpeg -re -i $audio_location -f mulaw -ar 8000 -ac 1 -f rtp $janus_server_url
fi