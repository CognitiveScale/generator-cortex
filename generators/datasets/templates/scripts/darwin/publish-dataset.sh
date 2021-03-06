#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the build
${SCRIPT_DIR}/build-dataset.sh

# Publish dataset to Cortex Marketplace
cortex marketplace datasets save "${SCRIPT_DIR}/build/dataset.zip"

# Delete zip
rm -rf "${SCRIPT_DIR}/build/dataset.zip"