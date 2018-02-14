#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -d $SCRIPT_DIR/build ]; then
    rm -rf $SCRIPT_DIR/build
fi
mkdir -p $SCRIPT_DIR/build/stage

# copy source to a staging folder
cp -r $SCRIPT_DIR/package.json $SCRIPT_DIR/src/ $SCRIPT_DIR/build/stage
# Install node dependencies
cd $SCRIPT_DIR/build/stage
npm install --only=production
zip -rq ../function.zip .
cd $SCRIPT_DIR
