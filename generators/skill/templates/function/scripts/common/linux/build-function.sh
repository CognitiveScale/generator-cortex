#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -d $SCRIPT_DIR/build ]; then
    rm -rf $SCRIPT_DIR/build
fi

mkdir $SCRIPT_DIR/build
zip -rjq $SCRIPT_DIR/build/function.zip $SCRIPT_DIR/src
