#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the build
${SCRIPT_DIR}/build-connection.sh

# Publish connection to Cortex Marketplace
cortex marketplace connections save --yaml resource.yaml --zip "${SCRIPT_DIR}/build/connection.zip"
