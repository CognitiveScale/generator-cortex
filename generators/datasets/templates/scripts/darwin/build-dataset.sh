#!/usr/bin/env bash
set -e
WORKING_DIR="${PWD}"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DATASET_NAME="${SCRIPT_DIR##*/}"
DATASETS_DIR="$(dirname $SCRIPT_DIR)"
BUILD_FILE="$SCRIPT_DIR/build/dataset.zip"

if [ ! -d $SCRIPT_DIR/build ]; then
    mkdir $SCRIPT_DIR/build
fi

if [ -f $BUILD_FILE ]; then
    rm $BUILD_FILE
fi

cd $DATASETS_DIR
zip -rq $BUILD_FILE $DATASET_NAME
cd $WORKING_DIR