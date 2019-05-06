#!/usr/bin/env bash


set -e
VERSION="1.0.0-SNAPSHOT"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IMAGE_NAME="<%= projectPrefix %><%= skillName %>"
PRIVATE_REGISTRY=<%= privateRegistry %>

echo $IMAGE_NAME

echo "Cleaning $SCRIPT_DIR/build"
if [ -d $SCRIPT_DIR/build ]; then
    rm -rf $SCRIPT_DIR/build
fi


echo "Building Source"
mkdir $SCRIPT_DIR/build
cp -r $SCRIPT_DIR/src/ $SCRIPT_DIR/build

echo "Building Docker Image from $SCRIPT_DIR/build"
docker build   -t "$IMAGE_NAME" "$SCRIPT_DIR"

echo "Tagging with $PRIVATE_REGISTRY/$IMAGE_NAME:"$VERSION""
docker tag "$IMAGE_NAME $PRIVATE_REGISTRY/$IMAGE_NAME:$VERSION"

