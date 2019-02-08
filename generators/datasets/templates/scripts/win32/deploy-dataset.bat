echo off
SET SCRIPT_DIR=%~dp0
SET SCRIPT_DIR=%SCRIPT_DIR:~0,-1%

echo Deploying dataset <%= datasetName %> to Cortex...
cortex datasets save --yaml %SCRIPT_DIR%\dataset.yaml
