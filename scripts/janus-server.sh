#!/bin/bash

# Run Janus Server
cd janus-docker

docker stop janus-server
docker rm janus-server

docker run -d --ip=82.103.188.4 \
    --ip6=2a00:9080:9:69::4 \
     -p 8087:8088 -p 8089:8089 -p 8889:8889 -p 8000:8000 -p 7088:7088 -p 7089:7089 --name janus-server --network radio-net janus-docker:0.1


