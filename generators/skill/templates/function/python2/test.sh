#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cortex functions invoke <%= projectPrefix %>_<%= functionName %> --params-file "${SCRIPT_DIR}/test/test_req.json" --profile dev