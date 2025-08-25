#!/bin/bash

# PageScript Plugin Installer
# Installs the plugin to specified vault and copies examples

set -e  # Exit on any error

# Get vault path from user
if [ "$#" -eq 0 ]; then
    echo "🚀 PageScript Plugin Installer"
    echo ""
    read -p "Enter the path to your Obsidian vault (default: ~/Vaults/Main): " VAULT_INPUT
    if [ -z "$VAULT_INPUT" ]; then
        VAULT_PATH="$HOME/Vaults/Main"
    else
        # Expand tilde if present
        VAULT_PATH="${VAULT_INPUT/#\~/$HOME}"
    fi
else
    # Use provided argument
    VAULT_PATH="${1/#\~/$HOME}"
fi

# Define paths
PLUGIN_DIR="$VAULT_PATH/.obsidian/plugins/page-script"
EXAMPLES_DIR="$VAULT_PATH/90 Sys/PageScripts"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Installing PageScript Plugin to: $VAULT_PATH"

# Check if vault exists
if [ ! -d "$VAULT_PATH" ]; then
    echo "❌ Error: Vault directory not found at $VAULT_PATH"
    echo "   Please make sure your Obsidian vault exists at this location"
    exit 1
fi

# Build the plugin first
echo "📦 Building plugin..."
if ! npm run build; then
    echo "❌ Error: Build failed"
    exit 1
fi

# Create plugin directory
echo "📁 Creating plugin directory..."
mkdir -p "$PLUGIN_DIR"

# Copy plugin files
echo "📋 Copying plugin files..."
cp "$SCRIPT_DIR/main.js" "$PLUGIN_DIR/"
cp "$SCRIPT_DIR/manifest.json" "$PLUGIN_DIR/"

# Check if styles.css exists and copy if it does
if [ -f "$SCRIPT_DIR/styles.css" ]; then
    cp "$SCRIPT_DIR/styles.css" "$PLUGIN_DIR/"
    echo "   ✓ Copied styles.css"
fi

echo "   ✓ Copied main.js"
echo "   ✓ Copied manifest.json"

# Create examples directory
echo "📁 Creating examples directory..."
mkdir -p "$EXAMPLES_DIR"

# Copy example PageScripts
echo "📄 Copying example PageScripts..."
if [ -d "$SCRIPT_DIR/PageScripts" ]; then
    cp "$SCRIPT_DIR/PageScripts/"*.md "$EXAMPLES_DIR/" 2>/dev/null || true
    echo "   ✓ Copied example scripts to $EXAMPLES_DIR"
else
    echo "   ⚠️  No example scripts found in $SCRIPT_DIR/PageScripts"
fi

# Create .obsidian/plugins directory if it doesn't exist
if [ ! -d "$VAULT_PATH/.obsidian" ]; then
    echo "📁 Creating .obsidian directory..."
    mkdir -p "$VAULT_PATH/.obsidian/plugins"
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Open Obsidian"
echo "2. Go to Settings → Community plugins"
echo "3. Enable 'Page Script' plugin"
echo "4. Configure the scripts folder path to: '90 Sys/PageScripts'"
echo "5. Use Ctrl+P (Cmd+P) and search 'Execute PageScript' to test"
echo ""
echo "Plugin installed to: $PLUGIN_DIR"
echo "Examples copied to: $EXAMPLES_DIR"