# PageScript Executor Plugin for Obsidian

An Obsidian plugin that executes JavaScript code blocks from selected markdown pages with configurable output modes.

## Features

- **Configurable Scripts Folder**: Set the folder containing your PageScript markdown files (default: "PageScripts")
- **Page Selection Modal**: Browse and select from available markdown files in your scripts folder
- **JavaScript Execution**: Extract and execute all JavaScript code blocks from selected pages
- **Multiple Output Modes**:
  - Do nothing (view output only)
  - Replace current selection
  - Replace entire page content
  - Create a new page with the output

## Installation

### Development Mode

1. Clone this repository to your local development environment
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development build
4. Copy the plugin folder to your Obsidian vault's `.obsidian/plugins/` directory
5. Enable the plugin in Obsidian's Community Plugins settings

### Build for Production

1. Run `npm run build` to create a production build
2. The built files (`main.js`, `manifest.json`, `styles.css`) can be distributed

## Usage

1. **Configure the plugin**: Go to Settings → Community Plugins → PageScript Executor and set your scripts folder path
2. **Create PageScript files**: Add markdown files with JavaScript code blocks to your configured folder:

```markdown
# My Script

This script logs a message:

```javascript
console.log("Hello from PageScript!");
return "Script executed successfully!";
```
```

3. **Execute scripts**: 
   - Open the command palette (Ctrl/Cmd + P)
   - Search for "Execute PageScript"
   - Select a script file from the modal
   - Choose your output mode

## JavaScript Execution Context

Scripts have access to:
- `app`: The Obsidian App instance
- `Notice`: For displaying notifications to users
- Standard JavaScript features

## Security Note

This plugin executes JavaScript code directly. Only run scripts from trusted sources and review code before execution.

## Development

- TypeScript source code is in `main.ts`
- Build configuration uses esbuild for fast compilation
- Follows Obsidian plugin development standards

## License

MIT