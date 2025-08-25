# Transform Selected Text

This example shows how to work with selected text in Obsidian. When text is selected, you can transform it and replace the selection.

First select some text in a document, then run this script. It will convert the selected text to uppercase.

```javascript
// Get access to the current editor
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

if (activeView) {
    const editor = activeView.editor;
    const selection = editor.getSelection();
    
    if (selection) {
        // Transform the selected text to uppercase
        return selection.toUpperCase();
    } else {
        return "Please select some text first!";
    }
} else {
    return "No active markdown view found.";
}
```

**What this does:**
- Gets the current active markdown view
- Retrieves the selected text
- Converts it to uppercase
- Returns the transformed text (which replaces the selection)
- If no text is selected, returns a helpful message

**Use cases:** Text transformations, formatting, case changes, text processing