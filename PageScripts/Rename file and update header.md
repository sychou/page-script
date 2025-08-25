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
// Get the current file
const currentFile = ps.currentFile;
if (!currentFile) {
    ps.notice("No active file found");
    return;
}

// Read file content using ps helper
// IMPORTANT: Return the Promise chain so the script waits for completion
return ps.readFile(currentFile).then(content => {
    // Look for the first h1 header (# Title)
    const h1Match = content.match(/^# (.+)$/m);
    let defaultName = currentFile.basename; // fallback to current file name

    // If h1 header found, use it as default
    if (h1Match) {
        defaultName = h1Match[1].trim();
    }

    // Prompt user for new name using ps.prompt()
    ps.prompt("Enter new file name:", defaultName).then(newName => {
        // Only proceed if user provided a name and it's different
        if (newName && newName !== currentFile.basename) {
            
            // Function to handle the actual renaming
            function renameFile() {
                // Create a promise chain for the operations
                let updatePromise = Promise.resolve();
                
                // Update the h1 header if it exists
                if (h1Match) {
                    const updatedContent = content.replace(/^# .+$/m, `# ${newName}`);
                    updatePromise = ps.writeFile(currentFile, updatedContent);
                }
                
                // Chain the rename operation after content update
                updatePromise.then(() => {
                    const newPath = currentFile.path.replace(currentFile.name, `${newName}.md`);
                    return ps.renameFile(currentFile, newPath);
                }).then(() => {
                    ps.notice(`File renamed to: ${newName}`);
                }).catch(error => {
                    ps.notice(`Error renaming file: ${error.message}`);
                });
            }
            
            renameFile();
            
        } else {
            ps.notice("Rename cancelled or no change needed");
        }
    }).catch(error => {
        ps.notice(`Error: ${error.message}`);
    });
    
}).catch(error => {
    ps.notice(`Error reading file: ${error.message}`);
});
```