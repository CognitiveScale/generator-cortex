echo off
SET SCRIPT_DIR=%~dp0
SET SCRIPT_DIR=%SCRIPT_DIR:~0,-1%
SET BUILD_DIR=%SCRIPT_DIR%\build
SET BUILD_FILE=%BUILD_DIR%\function.zip

call %SCRIPT_DIR%\build-function.bat

echo Deploying %BUILD_FILE% to Cortex...
cortex actions deploy <%= projectPrefix %><%= functionName %> --code "%BUILD_FILE%" --kind <%= deploymentType %>
echo Deployment complete!
