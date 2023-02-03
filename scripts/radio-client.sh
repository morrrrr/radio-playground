#!/bin/bash

# Run Radio Client
cd ../radio-client

docker stop radio-client
docker rm radio-client

docker build -t radio-client . && \
docker run -d --ip=82.103.188.7 \
    --ip6=2a00:9080:9:69::7 \
     -p 8083:8083 --name radio-client --network radio-net radio-client:latest


