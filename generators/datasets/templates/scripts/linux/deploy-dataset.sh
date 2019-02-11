#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Deploy our skill to Cortex
cortex datasets save --yaml $SCRIPT_DIR/dataset.yaml