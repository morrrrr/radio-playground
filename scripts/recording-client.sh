#!/bin/bash

# Run Recording Client
cd recording-client

docker stop recording-client
docker rm recording-client

docker build -t recording-client . && \
docker run -d --ip=82.103.188.6 \
    --ip6=2a00:9080:9:69::6 \
     -p 8085:8085 --name recording-client --network radio-net recording-client:latest


