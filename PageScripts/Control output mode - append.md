# Control Output Mode - Append

This example shows how to use `setOutputMode()` to control where your script output goes. The 'append' mode adds content to the end of the current document.

When you want your script to add content to the end of a document (like a log entry or note), use `setOutputMode('append')`.

```javascript
setOutputMode('append');

const timestamp = new Date().toLocaleString();
return `\n---\n**${timestamp}**: Script executed successfully!`;
```

**What this does:**
- Sets output mode to 'append'
- Creates a timestamp
- Returns formatted text with markdown separator
- Text gets added to the end of the document
- Cursor moves to the end of the appended content

**Use cases:** Log entries, daily notes, progress tracking, timestamps