echo off
SET SCRIPT_DIR=%~dp0
SET SCRIPT_DIR=%SCRIPT_DIR:~0,-1%
SET TEST_FILE=%SCRIPT_DIR%\test\test_req.json

echo Invoking <%= projectPrefix %><%= functionName %> in Cortex...
cortex actions invoke <%= projectPrefix %><%= functionName %> --params-file "%TEST_FILE%"
