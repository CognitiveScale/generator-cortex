#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the build
${SCRIPT_DIR}/build.sh

# Deploy our function to Cortex
cortex functions deploy <%= projectPrefix %>_<%= functionName %> --code "${SCRIPT_DIR}/build/function.zip" --docker c12e/cortex-python3-function