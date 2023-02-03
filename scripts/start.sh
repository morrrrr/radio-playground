#!/bin/bash

# Starts playground from scratch

sh ./create-network.sh
sh ./build-janus-image.sh
sh ./hls-server.sh
sh ./janus-server.sh
sh ./recording-client.sh
sh ./radio-client.sh

