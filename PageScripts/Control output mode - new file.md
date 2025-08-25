# Control Output Mode - New File

This example shows how to use `setOutputMode('newfile')` to create a new file with your script output instead of modifying the current document.

This is useful when you want to generate content that should be in its own separate file.

```javascript
setOutputMode('newfile');

const now = new Date();
const dateStr = now.toISOString().split('T')[0];

return `# Meeting Notes - ${dateStr}

**Date**: ${now.toLocaleDateString()}
**Time**: ${now.toLocaleTimeString()}

## Attendees
- 

## Agenda
- 

## Discussion


## Action Items
- [ ] 

## Next Steps


---
*Notes created: ${now.toLocaleString()}*`;
```

**What this does:**
- Sets output mode to 'newfile'
- Creates a meeting notes template
- Generates a new file with timestamp in the filename
- Leaves the current document unchanged
- The new file will be named something like: "Script Output 2025-08-25T15-45-23.md"

**Use cases:** Templates, reports, logs, generated documents