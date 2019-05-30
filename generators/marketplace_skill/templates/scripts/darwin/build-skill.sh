#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ ! -d $SCRIPT_DIR/build ]; then
    mkdir $SCRIPT_DIR/build
fi

zip -rjq $SCRIPT_DIR/build/skill.zip $SCRIPT_DIR 
