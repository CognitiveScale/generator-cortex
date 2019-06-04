#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Publish skill to Cortex Marketplace
cortex marketplace skills save --yaml resource.yaml --zip "${SCRIPT_DIR}/build/skill.zip"
