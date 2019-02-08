echo off
SET SCRIPT_DIR=%~dp0
SET SCRIPT_DIR=%SCRIPT_DIR:~0,-1%

echo Deploying <%= connName %> to Cortex...
cortex connections save --yaml %SCRIPT_DIR%/connection.yaml
