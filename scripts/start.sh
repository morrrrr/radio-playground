#!/bin/bash

# Starts the playground 
docker-compose -f ../docker-compose.yml up -d --build

./record-stream.sh


