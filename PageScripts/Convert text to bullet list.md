# Convert Text to Bullet List

This example shows how to take selected text and convert each line into a markdown bullet list item.

Select multiple lines of text, then run this script to convert them into a bullet list format.

```javascript
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

if (activeView) {
    const editor = activeView.editor;
    const selection = editor.getSelection();
    
    if (selection) {
        // Split text into lines and create bullet list
        const lines = selection.split('\n');
        const bulletList = lines
            .filter(line => line.trim().length > 0) // Remove empty lines
            .map(line => `- ${line.trim()}`) // Add bullet and trim whitespace
            .join('\n');
        
        return bulletList;
    } else {
        return "Please select text to convert to a bullet list!";
    }
} else {
    return "No active markdown view found.";
}
```

**What this does:**
- Takes selected text and splits it into individual lines
- Filters out any empty lines
- Adds `- ` (bullet point) to the beginning of each line
- Trims extra whitespace from each line
- Joins the lines back together

**Before:**
```
Task one
Task two
Task three
```

**After:**
```
- Task one
- Task two
- Task three
```

**Use cases:** Converting lists, formatting tasks, organizing content