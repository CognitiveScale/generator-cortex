#!/usr/bin/env bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cortex actions invoke <%= projectPrefix %><%= functionName %>  --method "POST" --path "invoke" --params-file "${SCRIPT_DIR}/test/test_req.json"