#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Publish agent to Cortex Marketplace
cortex marketplace agents save --yaml resource.yaml --zip "${SCRIPT_DIR}/build/agent.zip"
