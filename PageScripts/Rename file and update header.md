# Rename File and Update Header

This script renames the current file and updates its H1 header to match. It's useful for keeping file names and document titles in sync.

**How it works:**
1. Gets the current file's content and title
2. Looks for an existing H1 header (# Title) to use as the default new name
3. Prompts you for a new name (with the H1 header or current filename as default)
4. Updates the H1 header in the content to match the new name
5. Renames the file

**Note:** This script doesn't return output text - it performs file operations instead.

```javascript
// Get the current file and its content
const activeView = app.workspace.getActiveViewOfType(MarkdownView);
if (!activeView || !activeView.file) {
    new Notice("No active file found");
    return; // Exit without inserting anything
}

const currentFile = activeView.file;
const content = await app.vault.read(currentFile);

// Look for the first h1 header (# Title)
const h1Match = content.match(/^# (.+)$/m);
let defaultName = currentFile.basename; // fallback to current file name

// If h1 header found, use it as default
if (h1Match) {
    defaultName = h1Match[1].trim();
}

// Prompt user for new name, with h1 header or current name as default
const newName = prompt("Enter new file name:", defaultName);

// Only proceed if user provided a name and it's different from current file name
if (newName && newName !== currentFile.basename) {
    try {
        // Update the h1 header if it exists
        if (h1Match) {
            const updatedContent = content.replace(/^# .+$/m, `# ${newName}`);
            await app.vault.modify(currentFile, updatedContent);
        }
        
        // Rename the file (do this after content update)
        const newPath = currentFile.path.replace(currentFile.name, `${newName}.md`);
        await app.vault.rename(currentFile, newPath);
        
        new Notice(`File renamed to: ${newName}`);
        
    } catch (error) {
        new Notice(`Error renaming file: ${error.message}`);
    }
} else {
    new Notice("Rename cancelled or no change needed");
}
```