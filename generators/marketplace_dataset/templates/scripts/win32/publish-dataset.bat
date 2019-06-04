echo off
SET SCRIPT_DIR=%~dp0
SET SCRIPT_DIR=%SCRIPT_DIR:~0,-1%
SET RESOURCE_YAML_FILE=%SCRIPT_DIR%\resource.yaml
SET BUILD_DIR=%SCRIPT_DIR%\build
SET BUILD_FILE=%BUILD_DIR%\dataset.zip

echo Publishing dataset to Cortex Marketplace...
cortex marketplace datasets save --yaml "%RESOURCE_YAML_FILE%" --zip "%BUILD_FILE%"
echo Complete!

