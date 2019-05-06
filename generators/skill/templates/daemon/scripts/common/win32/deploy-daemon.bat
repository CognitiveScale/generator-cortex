echo off
SET VERSION="1.0.0-SNAPSHOT"
SET SCRIPT_DIR=%~dp0
SET SCRIPT_DIR=%SCRIPT_DIR:~0,-1%
SET IMAGE_NAME="<%= projectPrefix %><%= skillName %>"
SET PRIVATE_REGISTRY=<%= privateRegistry %>
SET PORT=9091

cortex docker login --profile <%= profile %>

echo "Running the build"
call %SCRIPT_DIR%\build-daemon.bat
echo "Tagging the image"
docker tag %IMAGE_NAME% "%PRIVATE_REGISTRY%/%IMAGE_NAME%:%VERSION%"
echo "Pushing Repo Changes"
docker push  %PRIVATE_REGISTRY%/%IMAGE_NAME%:%VERSION%

echo "Deploying Changes to Cortex"
cortex actions deploy "<%= projectPrefix %><%= skillName %>" \
--actionType daemon \
--profile <%= projectPrefix %> \
--port %PORT% \
--docker "%PRIVATE_REGISTRY%/%IMAGE_NAME%:%VERSION%" --cmd '[]'
