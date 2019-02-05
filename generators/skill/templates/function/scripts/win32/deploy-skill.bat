echo off
SET SCRIPT_DIR=%~dp0
SET SCRIPT_DIR=%SCRIPT_DIR:~0,-1%
SET YAML_FILE=%SCRIPT_DIR%\skill.yaml

echo Deploying <%= skillName %> to Cortex...
cortex skills save --yaml "%YAML_FILE%"
echo Complete!
