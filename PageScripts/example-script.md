# Example PageScript

This is an example PageScript that demonstrates various JavaScript functionality.

## Basic Output

```javascript
console.log("Hello from PageScript!");
console.log("Current date:", new Date().toISOString());
```

## Working with Obsidian API

```javascript
// Get the current workspace
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);
if (activeView) {
    console.log("Active view type:", activeView.getViewType());
    console.log("Current file:", activeView.file?.name || "No file");
} else {
    console.log("No markdown view is currently active");
}

// Show a notice
new Notice("Script executed successfully!", 3000);
```

## Data Processing Example

```javascript
// Process some data
const data = [1, 2, 3, 4, 5];
const doubled = data.map(x => x * 2);
console.log("Original:", data);
console.log("Doubled:", doubled);

// Return formatted output
return `# Processed Data

Original numbers: ${data.join(', ')}
Doubled numbers: ${doubled.join(', ')}
Sum of doubled: ${doubled.reduce((a, b) => a + b, 0)}

Generated on: ${new Date().toLocaleString()}`;
```