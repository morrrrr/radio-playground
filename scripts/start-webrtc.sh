#!/bin/bash

# Starts playground for WebRTC testing
docker-compose up -d --build

echo W | ./record-stream.sh

xdg-open http://localhost:8083/radio/webrtc
