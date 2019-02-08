echo off
SET SCRIPT_DIR=%~dp0
SET SCRIPT_DIR=%SCRIPT_DIR:~0,-1%

echo Deploying <%= jobName %> to Cortex...
cortex jobs save --yaml %SCRIPT_DIR%\job.yaml
