echo off
SET SCRIPT_DIR=%~dp0
SET SCRIPT_DIR=%SCRIPT_DIR:~0,-1%
SET SOURCE_DIR=%SCRIPT_DIR%\src
SET BUILD_DIR=%SCRIPT_DIR%\build
SET BUILD_FILE=%BUILD_DIR%\function.zip

if exist %BUILD_DIR%/nul rmdir /S /Q "%BUILD_DIR%"
mkdir "%BUILD_DIR%"

echo Creating build in %BUILD_DIR%...
powershell %SCRIPT_DIR%/buildzip.ps1 %SOURCE_DIR% %BUILD_FILE%
echo Created function.zip in %BUILD_DIR%
