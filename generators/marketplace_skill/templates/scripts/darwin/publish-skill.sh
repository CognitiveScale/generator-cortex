#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the build
${SCRIPT_DIR}/build-skill.sh

# Publish skill to Cortex Marketplace
cortex marketplace skills save <%= projectPrefix %><%= skillName %> --yaml resource.yaml --zip "${SCRIPT_DIR}/build/skill.zip"
