#!/usr/bin/env bash
set -e
WORKING_DIR="${PWD}"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SKILL_NAME="${SCRIPT_DIR##*/}"
SKILLS_DIR="$(dirname $SCRIPT_DIR)"
BUILD_FILE="$SCRIPT_DIR/build/skill.zip"

if [ ! -d $SCRIPT_DIR/build ]; then
    mkdir $SCRIPT_DIR/build
fi

if [ -f $BUILD_FILE ]; then
    rm $BUILD_FILE
fi

cd $SKILLS_DIR
zip -rq $BUILD_FILE $SKILL_NAME
cd $WORKING_DIR
