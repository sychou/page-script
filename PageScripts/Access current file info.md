# Access Current File Info

This example shows how to access information about the currently open file using Obsidian's API. This is useful for creating scripts that adapt based on the current file.

The script demonstrates how to get file name, path, creation date, and other metadata.

```javascript
const workspace = app.workspace;
const activeView = workspace.getActiveViewOfType(MarkdownView);

if (activeView && activeView.file) {
    const file = activeView.file;
    const stat = file.stat;
    
    // Format file information
    const info = `# File Information

**File Name:** ${file.basename}
**Full Path:** ${file.path}
**Extension:** ${file.extension}
**Created:** ${new Date(stat.ctime).toLocaleString()}
**Modified:** ${new Date(stat.mtime).toLocaleString()}
**Size:** ${stat.size} bytes

**Folder:** ${file.parent?.path || 'Root'}`;
    
    return info;
} else {
    return "No active file found or not a markdown view.";
}
```

**What this does:**
- Gets the currently active markdown view
- Accesses the file object and its metadata
- Extracts useful information like name, path, dates, size
- Formats the information as markdown
- Returns a formatted report about the current file

**Example output:**
```markdown
# File Information

**File Name:** My Note
**Full Path:** Folder/My Note.md
**Extension:** md
**Created:** 8/25/2025, 2:30:15 PM
**Modified:** 8/25/2025, 3:45:22 PM
**Size:** 1542 bytes
**Folder:** Folder
```

**Use cases:** File metadata, documentation, file reports, debugging