@echo off
REM PageScript Plugin Installer for Windows
REM Installs the plugin to ~/Vaults/Main/.obsidian/plugins/page-script
REM and copies examples to ~/Vaults/Main/90 Sys/PageScripts

setlocal enabledelayedexpansion

set "VAULT_PATH=%USERPROFILE%\Vaults\Main"
set "PLUGIN_DIR=%VAULT_PATH%\.obsidian\plugins\page-script"
set "EXAMPLES_DIR=%VAULT_PATH%\90 Sys\PageScripts"

echo 🚀 Installing PageScript Plugin...

REM Check if vault exists
if not exist "%VAULT_PATH%" (
    echo ❌ Error: Vault directory not found at %VAULT_PATH%
    echo    Please make sure your Obsidian vault exists at this location
    pause
    exit /b 1
)

REM Build the plugin first
echo 📦 Building plugin...
call npm run build
if errorlevel 1 (
    echo ❌ Error: Build failed
    pause
    exit /b 1
)

REM Create plugin directory
echo 📁 Creating plugin directory...
if not exist "%PLUGIN_DIR%" mkdir "%PLUGIN_DIR%"

REM Copy plugin files
echo 📋 Copying plugin files...
copy "main.js" "%PLUGIN_DIR%\" >nul
copy "manifest.json" "%PLUGIN_DIR%\" >nul

REM Check if styles.css exists and copy if it does
if exist "styles.css" (
    copy "styles.css" "%PLUGIN_DIR%\" >nul
    echo    ✓ Copied styles.css
)

echo    ✓ Copied main.js
echo    ✓ Copied manifest.json

REM Create examples directory
echo 📁 Creating examples directory...
if not exist "%EXAMPLES_DIR%" mkdir "%EXAMPLES_DIR%"

REM Copy example PageScripts
echo 📄 Copying example PageScripts...
if exist "PageScripts\*.md" (
    copy "PageScripts\*.md" "%EXAMPLES_DIR%\" >nul 2>&1
    echo    ✓ Copied example scripts to %EXAMPLES_DIR%
) else (
    echo    ⚠️  No example scripts found in PageScripts directory
)

REM Create .obsidian/plugins directory if it doesn't exist
if not exist "%VAULT_PATH%\.obsidian" (
    echo 📁 Creating .obsidian directory...
    mkdir "%VAULT_PATH%\.obsidian\plugins"
)

echo.
echo ✅ Installation complete!
echo.
echo Next steps:
echo 1. Open Obsidian
echo 2. Go to Settings → Community plugins
echo 3. Enable 'Page Script' plugin
echo 4. Configure the scripts folder path to: '90 Sys/PageScripts'
echo 5. Use Ctrl+P and search 'Execute PageScript' to test
echo.
echo Plugin installed to: %PLUGIN_DIR%
echo Examples copied to: %EXAMPLES_DIR%
echo.
pause