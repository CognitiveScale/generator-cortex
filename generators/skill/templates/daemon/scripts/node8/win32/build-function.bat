@echo off
SET SCRIPT_DIR=%~dp0
SET SCRIPT_DIR=%SCRIPT_DIR:~0,-1%
SET SOURCE_DIR=%SCRIPT_DIR%\src
SET BUILD_DIR=%SCRIPT_DIR%\build
SET BUILD_FILE=%BUILD_DIR%\function.zip
SET STAGE_DIR=%BUILD_DIR%\stage

if exist %BUILD_DIR%/nul rmdir /S /Q "%BUILD_DIR%"
mkdir "%BUILD_DIR%/stage"

REM copy source to a staging folder
copy %SCRIPT_DIR%\package.json %STAGE_DIR% > nul
copy %SCRIPT_DIR%\src %STAGE_DIR% > nul

REM  Install node dependencies
pushd %SCRIPT_DIR%\build\stage
call npm install --only=production
popd

powershell %SCRIPT_DIR%\buildzip.ps1 %STAGE_DIR% %BUILD_FILE%

rmdir /s /q %STAGE_DIR%

echo Build complete.
