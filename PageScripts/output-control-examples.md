# Output Control Examples

These examples demonstrate how scripts can control where their output goes.

## Method 1: Using setOutputMode() function

```javascript
// This will append to the end of the document
setOutputMode('append');
return "This text will be appended to the end of the document.";
```

## Method 2: Using return object with mode

```javascript
// This will replace the entire page
return {
    content: "# New Page Content\n\nThis replaces everything!",
    mode: 'page'
};
```

## Method 3: Conditional output placement

```javascript
const currentTime = new Date().toLocaleTimeString();

// Decide output mode based on conditions
if (currentTime.includes('AM')) {
    setOutputMode('cursor');
    return `Good morning! It's ${currentTime}`;
} else {
    setOutputMode('append');
    return `\n---\nEvening log: ${currentTime}`;
}
```

## Available Modes

- **`'cursor'`** - Insert at current cursor position (default if no selection)
- **`'selection'`** - Replace current selection (default if text is selected)
- **`'page'`** - Replace entire page content
- **`'append'`** - Add to the end of the document
- **`'newfile'`** - Create a new file with the content

## Mixed Mode Example

```javascript
// Get current selection to decide behavior
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

if (activeView) {
    const editor = activeView.editor;
    const selection = editor.getSelection();
    
    if (selection.length > 100) {
        // Large selection - replace entire page
        setOutputMode('page');
        return "# Processed Content\n\nReplaced large selection with summary.";
    } else if (selection) {
        // Small selection - just replace it
        setOutputMode('selection');
        return selection.toUpperCase();
    } else {
        // No selection - append timestamp
        setOutputMode('append');
        return `\n\nLast processed: ${new Date().toISOString()}`;
    }
} else {
    return "No active view found";
}
```