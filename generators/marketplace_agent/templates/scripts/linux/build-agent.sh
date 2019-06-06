#!/usr/bin/env bash
set -e
WORKING_DIR="${PWD}"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
AGENT_NAME="${SCRIPT_DIR##*/}"
AGENTS_DIR="$(dirname $SCRIPT_DIR)"
BUILD_FILE="$SCRIPT_DIR/build/agent.zip"

if [ ! -d $SCRIPT_DIR/build ]; then
    mkdir $SCRIPT_DIR/build
fi

if [ -f $BUILD_FILE ]; then
    rm $BUILD_FILE
fi

cd $AGENTS_DIR
zip -rq $BUILD_FILE $AGENT_NAME
cd $WORKING_DIR

