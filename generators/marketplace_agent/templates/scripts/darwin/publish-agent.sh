#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the build
${SCRIPT_DIR}/build-agent.sh

# Publish agent to Cortex Marketplace
cortex marketplace agents save "${SCRIPT_DIR}/build/agent.zip"
