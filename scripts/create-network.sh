#!/bin/bash

# Run Janus Server
docker network rm radio-net || true

docker network create \
    --ipv6 \
    --driver='bridge' \
    --subnet=82.103.188.0/24 \
    --gateway=82.103.188.1 \
    --subnet=2a00:9080:9:69::/64 \
    --gateway=2a00:9080:9:69::1 \
    radio-net




