#!/bin/bash

# Starts playground for HLS testing
docker-compose up -d --build

echo H | ./record-stream.sh

xdg-open http://localhost:8083/radio/hls
