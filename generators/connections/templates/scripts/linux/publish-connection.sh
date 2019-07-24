#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the build
${SCRIPT_DIR}/build-connection.sh

# Publish connection to Cortex Marketplace
cortex marketplace connections save "${SCRIPT_DIR}/build/connection.zip"

# Delete zip
rm -rf "${SCRIPT_DIR}/build/connection.zip"