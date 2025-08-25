# Example PageScript

This is an example PageScript that demonstrates various JavaScript functionality.

**Note**: All JavaScript code blocks in a file will be executed in order, and their return values will be combined.

## Basic Output

```javascript
console.log("Hello from PageScript!"); // This stays in console for debugging
console.log("Current date:", new Date().toISOString()); // This too

return `Hello from PageScript!\nCurrent date: ${new Date().toISOString()}`;
```

## Working with Obsidian API

```javascript
// Get the current workspace
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

let result = "## Workspace Info\n\n";

if (activeView) {
    console.log("Active view type:", activeView.getViewType()); // Debug info
    console.log("Current file:", activeView.file?.name || "No file"); // Debug info
    
    result += `- **Active view type**: ${activeView.getViewType()}\n`;
    result += `- **Current file**: ${activeView.file?.name || "No file"}\n`;
} else {
    console.log("No markdown view is currently active"); // Debug info
    result += "- No markdown view is currently active\n";
}

// Show a notice (this doesn't go into output)
new Notice("Script executed successfully!", 3000);

return result;
```

## Data Processing Example

```javascript
// Process some data
const data = [1, 2, 3, 4, 5];
const doubled = data.map(x => x * 2);
console.log("Original:", data);
console.log("Doubled:", doubled);

// Return formatted output - this will append to the end
setOutputMode('append');
return `

---
## Processed Data Report

- **Original numbers**: ${data.join(', ')}
- **Doubled numbers**: ${doubled.join(', ')}
- **Sum of doubled**: ${doubled.reduce((a, b) => a + b, 0)}
- **Generated**: ${new Date().toLocaleString()}`;
```