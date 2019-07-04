#!/usr/bin/env bash
set -e
VERSION="1.0.0-SNAPSHOT"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IMAGE_NAME="<%= projectPrefix %><%= skillName %>"
PRIVATE_REGISTRY=<%= privateRegistry %>
PORT=5000

cortex docker login --profile <%= profile %>
echo "Running the build"
${SCRIPT_DIR}/build-daemon.sh
echo "Tagging the image"
docker tag $IMAGE_NAME $PRIVATE_REGISTRY/$IMAGE_NAME:$VERSION
echo "Pushing Repo Changes"
docker push  "$PRIVATE_REGISTRY/$IMAGE_NAME:$VERSION"

echo "Deploying Changes to Cortex"
cortex actions deploy $IMAGE_NAME \
--actionType daemon \
--profile <%= profile %> \
--port $PORT \
--docker "$PRIVATE_REGISTRY/$IMAGE_NAME:$VERSION" --cmd '[]'
