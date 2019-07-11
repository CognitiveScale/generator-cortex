#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the build
${SCRIPT_DIR}/build-function.sh

# Run the build
${SCRIPT_DIR}/build-skill.sh

# Publish skill to Cortex Marketplace
cortex marketplace skills save "${SCRIPT_DIR}/build/skill.zip"

# Delete zip
rm -rf "${SCRIPT_DIR}/build/skill.zip"