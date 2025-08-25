# Selection Mode Examples

Scripts that replace the currently selected text.

**Note**: All JavaScript code blocks in a file will be executed in order, and their return values will be combined. Each code block runs in its own scope to avoid variable conflicts.

## Transform Selection to Uppercase

```javascript
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

if (activeView) {
    const editor = activeView.editor;
    const selection = editor.getSelection();
    
    if (selection) {
        setOutputMode('selection');
        return selection.toUpperCase();
    }
}

return "Please select some text first!";
```

## Wrap Selection in Code Block

```javascript
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

if (activeView) {
    const editor = activeView.editor;
    const selection = editor.getSelection();
    
    if (selection) {
        setOutputMode('selection');
        return `\`\`\`\n${selection}\n\`\`\``;
    }
}

return "Please select some text to wrap in a code block!";
```

## Convert Selection to Bullet List

```javascript
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

if (activeView) {
    const editor = activeView.editor;
    const selection = editor.getSelection();
    
    if (selection) {
        setOutputMode('selection');
        const lines = selection.split('\n');
        const bulletList = lines
            .filter(line => line.trim().length > 0)
            .map(line => `- ${line.trim()}`)
            .join('\n');
        return bulletList;
    }
}

return "Please select text to convert to a bullet list!";
```

## Add Markdown Link to Selection

```javascript
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

if (activeView) {
    const editor = activeView.editor;
    const selection = editor.getSelection();
    
    if (selection) {
        setOutputMode('selection');
        // Assume selection is the link text, prompt for URL would be nice but not available
        // For demo, we'll use a placeholder URL
        return `[${selection}](URL_HERE)`;
    }
}

return "Please select text to convert to a link!";
```

## Quote Selection

```javascript
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

if (activeView) {
    const editor = activeView.editor;
    const selection = editor.getSelection();
    
    if (selection) {
        setOutputMode('selection');
        const lines = selection.split('\n');
        const quotedText = lines
            .map(line => `> ${line}`)
            .join('\n');
        return quotedText;
    }
}

return "Please select text to quote!";
```

## Reverse Selection Text

```javascript
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

if (activeView) {
    const editor = activeView.editor;
    const selection = editor.getSelection();
    
    if (selection) {
        setOutputMode('selection');
        return selection.split('').reverse().join('');
    }
}

return "Please select some text to reverse!";
```