#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IMAGE_NAME="boresha/dashboard"
DOCKER_HOME="/dashboard/"

if [ "$1" == "init" ]; then
    docker build -t $IMAGE_NAME .
elif [ "$1" == "build" ]; then
    docker run --rm --volume "$DIR:$DOCKER_HOME" -ti $IMAGE_NAME yarn install --frozen-lockfile --no-bin-links
    docker run --rm --volume "$DIR:$DOCKER_HOME" $IMAGE_NAME npm run build
elif [ "$1" == "run" ]; then
    docker run --rm --volume "$DIR:$DOCKER_HOME" -ti $IMAGE_NAME yarn install --frozen-lockfile --no-bin-links
    docker run --rm --volume "$DIR:$DOCKER_HOME" -ti -p 8080:8080 $IMAGE_NAME npm start
else
    echo "usage: docker_build [init | build | run]"
fi
