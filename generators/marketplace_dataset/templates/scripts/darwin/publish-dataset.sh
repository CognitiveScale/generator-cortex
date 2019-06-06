#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the build
${SCRIPT_DIR}/build-dataset.sh

# Publish dataset to Cortex Marketplace
cortex marketplace datasets save --yaml resource.yaml --zip "${SCRIPT_DIR}/build/dataset.zip"
