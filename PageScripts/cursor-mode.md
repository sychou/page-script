# Cursor Mode Examples

Scripts that insert content at the current cursor position.

**Note**: All JavaScript code blocks in a file will be executed in order, and their return values will be combined. Each code block runs in its own scope to avoid variable conflicts.

## Simple Timestamp Insertion

```javascript
setOutputMode('cursor');
return new Date().toLocaleString();
```

## Insert Code Block

```javascript
setOutputMode('cursor');
return `\`\`\`javascript
// Your code here
console.log("Hello, world!");
\`\`\``;
```

## Insert Markdown Link

```javascript
setOutputMode('cursor');
const title = "Example Link";
const url = "https://example.com";
return `[${title}](${url})`;
```

## Insert Today's Date Header

```javascript
setOutputMode('cursor');
const today = new Date().toISOString().split('T')[0];
return `## ${today}`;
```

## Insert UUID

```javascript
setOutputMode('cursor');
// Simple UUID generator
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

return generateUUID();
```

## Insert Formatted Current Time

```javascript
setOutputMode('cursor');
const now = new Date();
const timeString = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
});
return `**${timeString}** - `;
```