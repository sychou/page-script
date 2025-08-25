# PageScript Plugin for Obsidian

Over the years, I've found myself using [Templater](https://github.com/SilentVoid13/Templater) primarily to run scripts and rarely for templating. I loved how easy it was to create scripts in Obsidian itself and be able to run them from my desktop and mobile devices. However, I realize that it was an unorthodox use of Templater and and realized that it was time for me to abusing Templater and create a plugin for my specific use case. So without further ado, I've (mostly vibe) coded PageScript.

PageScript is an Obsidian plugin that runs JavaScript code from Markdown files located within an Obsidian folder. It's easy to write scripts by using JavaScript codeblocks and you have basically the full power of Obsidian's API at your disposal. Please be aware that this means you can seriously mess up your data and you should never run scripts unless you trust the source, or better yet, are able to read the script yourself to make sure it's safe.

## 🧠 How It Works

**The Simple Version**: Each `.md` file in your scripts folder becomes a runnable script. When you select a script, PageScript finds all JavaScript code blocks in that file, runs them in isolated sandboxes, collects their return values, and outputs the combined results where you want them.

**The Details**:
1. **Files = Scripts**: Every markdown file (`.md`) in your configured folder is a script
2. **Markdown is Documentation**: Normal text, headers, lists, etc. are ignored - they're just documentation
3. **Code Blocks = Executable**: Only JavaScript code blocks (`` ```javascript ``) are executed
4. **Isolated Execution**: Each code block runs in its own sandbox to prevent variable conflicts
5. **Results Combined**: Return values from all blocks are combined into the final output
6. **Smart Output**: Results go to cursor, selection, end of page, new file, etc. based on your script's instructions

**Example Flow**: 
- You have `My Script.md` containing explanatory text and 3 JavaScript code blocks
- You run the script → PageScript ignores the text, executes the 3 code blocks separately, combines their return values, and inserts the result at your cursor

## ✨ Features

- **✨ JavaScript Pages**: Run JavaScript from a configurable folder in your Obsidian Vault. Because it only runs code blocks, you can provide documentation right in the file. See examples for the easiest explanation.
- **🎯 Intelligent Output Control**: Scripts can control where their output goes:
  - Insert at cursor position
  - Replace selected text  
  - Append to end of document
  - Replace entire page content
  - Create new files
- **🛡️ Safe Execution**: Each code block runs in isolation to prevent variable conflicts

## 🚀 Quick Start

### Installation

1. **Using the installer** (recommended):
   ```bash
   # Clone and install
   git clone <repository-url>
   cd page-script
   npm install
   ./install.sh  # Installs to ~/Vaults/Main by default
   ```

2. **Manual installation**:
   - Run `npm run build`
   - Copy `main.js` and `manifest.json` to `.obsidian/plugins/page-script/`
   - Enable in Obsidian settings

### First Steps

1. **Enable the plugin**: Settings → Community Plugins → Enable "Page Script"
2. **Configure folder**: Settings → Page Script → Set your scripts folder (default: `PageScripts`)
3. **Try an example**: Ctrl/Cmd + P → "Execute PageScript" → Select "Insert text at cursor"

## 🎯 Your First Script

Let's create your first script step by step:

### Step 1: Create the Script File

In your scripts folder (e.g., `PageScripts/`), create a new file called `My First Script.md`:

---
# My First Script

This is my first PageScript! This text is just documentation - it won't be executed.

The JavaScript code below WILL be executed when I run this script:

```javascript
const greeting = "Hello from my first PageScript!";
const timestamp = new Date().toLocaleString();

return `${greeting}\n\nCreated at: ${timestamp}`;
```
---

### Step 2: Run Your Script

1. Place your cursor anywhere in a note
2. Press `Ctrl+P` (or `Cmd+P` on Mac) to open the command palette
3. Type "Execute PageScript" and select it
4. Choose "My First Script" from the dropdown
5. Your script output appears at your cursor!

### Step 3: Understanding What Happened

1. **PageScript found your file** - Any `.md` file in your scripts folder is a script
2. **Ignored the markdown text** - Headers, paragraphs, etc. are just documentation
3. **Executed the JavaScript** - Only the code between `` ```javascript `` and `` ``` `` ran
4. **Collected the return value** - Whatever your script returned became the output
5. **Inserted at cursor** - Default behavior is to insert where your cursor was

**Key Point**: The `return` statement determines what gets inserted into your document. Everything else (like `const greeting = ...`) is just internal script logic.

## 📖 Learning PageScripts

### Basic Concepts

Start with these examples to learn the fundamentals:

- **Insert text at cursor** - Most basic usage
- **Insert current timestamp** - Working with dates
- **Generate random UUID** - Custom functions

### Output Control

Learn how to control where your output goes:

- **Control output mode - append** - Add to end of document
- **Control output mode - new file** - Create separate documents
- **Control output mode - replace page** - Generate templates

### Working with Text

Transform and manipulate selected text:

- **Transform selected text** - Basic text manipulation
- **Wrap selection in code block** - Markdown formatting
- **Convert text to bullet list** - Array processing

### Advanced Features

- **Access current file info** - File metadata and properties
- **Show notifications** - User feedback with Notice API
- **Process and format data** - Data analysis and reporting

## 💻 JavaScript API

### Available Objects

```javascript
// Obsidian App instance
app.workspace.getActiveViewOfType(MarkdownView)

// Show notifications
new Notice("Hello!");
new Notice("Message with timeout", 5000);

// Access to MarkdownView class
const activeView = app.workspace.getActiveViewOfType(MarkdownView);
```

### Output Control

```javascript
// Control where output goes
setOutputMode('cursor');    // Insert at cursor (default)
setOutputMode('selection'); // Replace selection (default if text selected)
setOutputMode('append');    // Add to end of document
setOutputMode('page');      // Replace entire page
setOutputMode('newfile');   // Create new file

// Or use return object
return {
    content: "Your output here",
    mode: 'append'
};
```

### Example Script Structure

```markdown
# My PageScript

Description of what this script does.

```javascript
// Your JavaScript code here
const result = "Hello, World!";

// Optional: Control output location
setOutputMode('cursor');

// Return the output
return result;
```
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