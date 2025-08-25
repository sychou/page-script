# PageScript Executor Plugin for Obsidian

An Obsidian plugin that executes JavaScript code blocks from markdown files with intelligent output control. Create powerful automation scripts, text generators, and data processors directly within your Obsidian vault.

## ✨ Features

- **📁 Smart Script Management**: Configurable scripts folder with type-ahead folder selection
- **🔍 Intuitive Script Selection**: Search and select scripts with native Obsidian UI
- **⚡ JavaScript Execution**: Run JavaScript code blocks with full Obsidian API access
- **🎯 Intelligent Output Control**: Scripts can control where their output goes:
  - Insert at cursor position
  - Replace selected text  
  - Append to end of document
  - Replace entire page content
  - Create new files
- **🛡️ Safe Execution**: Each code block runs in isolation to prevent variable conflicts
- **📚 Rich Examples**: 15+ educational examples covering everything from basics to advanced concepts

## 🚀 Quick Start

### Installation

1. **Using the installer** (recommended):
   ```bash
   # Clone and install
   git clone <repository-url>
   cd page-script
   npm install
   ./install.sh  # Will prompt for vault path (default: ~/Vaults/Main)
   # Or specify path directly: ./install.sh /path/to/your/vault
   ```

2. **Manual installation**:
   - Run `npm run build`
   - Copy `main.js` and `manifest.json` to `.obsidian/plugins/page-script/`
   - Enable in Obsidian settings

### First Steps

1. **Enable the plugin**: Settings → Community Plugins → Enable "Page Script"
2. **Configure folder**: Settings → Page Script → Set your scripts folder
3. **Try the starter example below**

## 🎯 Your First PageScript

Create a file called `Hello World.md` in your PageScripts folder with this content:

```markdown
# Hello World

This is the simplest possible PageScript - it just returns text that gets inserted at your cursor.

```javascript
return "Hello from PageScript!";
```
```

**To run it:**
1. Place your cursor anywhere in a document
2. Press Ctrl/Cmd + P → "Execute PageScript" 
3. Select "Hello World"
4. The text "Hello from PageScript!" appears at your cursor

**That's it!** The most basic PageScript is just `return "some text";`

## 📖 Learning More

The following examples are included in the `PageScripts/` folder and demonstrate various concepts and techniques. Work through them in this suggested order:

### Start Here (Basic Concepts)

- **Insert text at cursor** - Most basic usage (just like above)
- **Insert current timestamp** - Working with Date objects  
- **Insert today's date** - String manipulation and formatting

### Next Steps (Control Output Location)

- **Control output mode - append** - Add to end of document
- **Control output mode - new file** - Create separate files  
- **Control output mode - replace page** - Generate complete templates

### Working with Selected Text

Transform and manipulate text that you've selected:

- **Transform selected text** - Convert selection to uppercase
- **Wrap selection in code block** - Add markdown code formatting
- **Convert text to bullet list** - Transform lines into markdown lists

### Advanced Features  

- **Generate random UUID** - Custom functions and algorithms
- **Show notifications** - User feedback with Notice API
- **Access current file info** - File metadata and properties  
- **Generate random quote** - Working with arrays and randomization
- **Create task list template** - Complex data structures and formatting
- **Process and format data** - Data analysis and reporting

## 💻 Writing PageScripts

### The Basics

Every PageScript is just JavaScript code that returns text:

```javascript
// Simple text
return "Hello!";

// Dynamic content  
return "Today is " + new Date().toDateString();

// Multiple lines
return `Line 1
Line 2
Line 3`;
```

### Controlling Output Location

By default, output goes to your cursor. Use `setOutputMode()` to change this:

```javascript
setOutputMode('append');  // Add to end of document
return "This gets appended!";
```

Available modes:
- `'cursor'` - Insert at cursor (default)
- `'selection'` - Replace selected text (default if text is selected)  
- `'append'` - Add to end of document
- `'page'` - Replace entire page content
- `'newfile'` - Create a new file

### Available Objects

```javascript
// Show notifications to user
new Notice("Script completed!");
new Notice("Message with timeout", 5000);

// Access Obsidian API
const activeView = app.workspace.getActiveViewOfType(MarkdownView);
if (activeView) {
    const fileName = activeView.file?.name;
    return `Current file: ${fileName}`;
}
```

## 🔧 Advanced Usage

### Multiple Code Blocks

All JavaScript code blocks in a file are executed in order:

```markdown
# Multi-Block Script

```javascript
// Block 1: Setup
const data = [1, 2, 3];
return "Setup complete";
```

```javascript  
// Block 2: Processing
const processed = data.map(x => x * 2);
setOutputMode('append');
return `Results: ${processed.join(', ')}`;
```
```

### Error Handling

If a code block fails, execution continues with remaining blocks:

```javascript
try {
    // Your risky code here
    return "Success!";
} catch (error) {
    new Notice(`Error: ${error.message}`);
    return "Script failed, but gracefully!";
}
```

## 🛡️ Security & Best Practices

- **Review code before execution** - Scripts have full access to Obsidian API
- **Use trusted sources only** - Don't run unknown scripts
- **Test in safe environment** - Try scripts on test files first
- **Backup your vault** - Especially before running page-replacement scripts

## 🔨 Development

### Project Structure

```
src/page-script/
├── main.ts              # Main plugin logic
├── suggest.ts           # Base suggestion system
├── folder-suggest.ts    # Folder suggestion component
├── PageScripts/         # Example scripts
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── esbuild.config.mjs   # Build configuration
└── install.sh          # Installation script
```

### Building

```bash
npm install          # Install dependencies
npm run dev          # Development build (watch mode)
npm run build        # Production build
./install.sh         # Install to vault
```

### Creating New Examples

1. Create `.md` file in `PageScripts/` folder
2. Use descriptive filename: "Verb + object.md"
3. Include explanation text outside code blocks
4. Single concept per file
5. One code block per file for clarity

## 📄 Commands

- **Execute PageScript** - Run script, output to current location
- **Execute PageScript to New File** - Run script, create new file

## ⚙️ Settings

- **Scripts folder** - Folder containing your PageScript files (with type-ahead suggestions)

## 📝 License

MIT - Feel free to use, modify, and distribute

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Add examples or improvements
4. Test thoroughly
5. Submit a pull request

---

*Happy scripting! 🚀*