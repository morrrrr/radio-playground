#!/bin/bash

docker stop $(docker ps -a -q) && \ 
docker rm $(docker ps -a -q) && \ 

    docker system prune
    docker volume prune 
    docker network prune 
    docker image prune 
