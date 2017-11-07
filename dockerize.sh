#!/usr/bin/env bash
IMAGE_NAME="boresha/dashboard"
DOCKER_HOME="/dashboard/"

if [ "$1" == "init" ]; then
	docker build -t $IMAGE_NAME .
elif [ "$1" == "build" ]; then
	docker run --rm --volume "$(pwd):/$DOCKER_HOME/" -ti $IMAGE_NAME yarn install --frozen-lockfile --no-bin-links
	docker run --rm --volume "$(pwd):/$DOCKER_HOME/" $IMAGE_NAME npm runs build
elif [ "$1" == "run" ]; then
    docker run --rm --volume "$(pwd):/$DOCKER_HOME/" -ti $IMAGE_NAME yarn install --frozen-lockfile --no-bin-links
    docker run --rm --volume "$(pwd):/$DOCKER_HOME/" -ti -p 8080:8080 $IMAGE_NAME npm start
else
	echo "usage: docker_build [init | build | run]"
fi
