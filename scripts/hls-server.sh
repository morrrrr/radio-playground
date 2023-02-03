#!/bin/bash

# Run HLS Server

docker stop hls-server
docker rm hls-server 

docker run -d \
    --ip=82.103.188.5 \
    --ip6=2a00:9080:9:69::5 \
    -p 1935:1935 -p 8080:8080 --name hls-server --network radio-net alqutami/rtmp-hls