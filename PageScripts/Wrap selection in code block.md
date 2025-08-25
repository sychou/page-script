# Wrap Selection in Code Block

This example demonstrates how to wrap selected text in markdown code blocks. This is useful for formatting code snippets or text that should be displayed in monospace font.

First select some text, then run this script to wrap it in a code block.

```javascript
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

if (activeView) {
    const editor = activeView.editor;
    const selection = editor.getSelection();
    
    if (selection) {
        // Wrap the selection in a code block
        return `\`\`\`\n${selection}\n\`\`\``;
    } else {
        return "Please select text to wrap in a code block!";
    }
} else {
    return "No active markdown view found.";
}
```

**What this does:**
- Gets the current selected text
- Wraps it with triple backticks (markdown code block syntax)
- Adds newlines for proper formatting
- Replaces the selection with the wrapped version

**Before:** `console.log("hello");`
**After:** 
````
```
console.log("hello");
```
````

**Use cases:** Code formatting, preserving formatting, creating code examples