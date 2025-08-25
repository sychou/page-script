# Append Mode Examples

Scripts that add content to the end of the current document.

**Note**: All JavaScript code blocks in a file will be executed in order, and their return values will be combined. Each code block runs in its own scope to avoid variable conflicts.

## Daily Log Entry

```javascript
setOutputMode('append');
const now = new Date();
const timestamp = now.toLocaleString();
return `\n---\n**${timestamp}**: `;
```

## Add Timestamped Note

```javascript
setOutputMode('append');
const now = new Date();
const dateStr = now.toISOString().split('T')[0];
const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
return `\n\n## Note - ${dateStr} ${timeStr}\n\n`;
```

## Append Task List

```javascript
setOutputMode('append');
const tasks = [
    "Review weekly goals",
    "Update project status",
    "Plan tomorrow's tasks",
    "Clean up workspace"
];

const taskList = tasks.map(task => `- [ ] ${task}`).join('\n');
return `\n\n## Today's Tasks\n\n${taskList}`;
```

## Add Reading Log Entry

```javascript
setOutputMode('append');
const books = [
    "The Great Gatsby - F. Scott Fitzgerald",
    "1984 - George Orwell", 
    "To Kill a Mockingbird - Harper Lee",
    "Pride and Prejudice - Jane Austen"
];

const randomBook = books[Math.floor(Math.random() * books.length)];
const today = new Date().toISOString().split('T')[0];

return `\n\n## Reading Log - ${today}\n\n**Currently Reading**: ${randomBook}\n**Pages**: \n**Notes**: `;
```

## Append Meeting Notes Template

```javascript
setOutputMode('append');
const now = new Date();
const dateStr = now.toLocaleDateString();
const timeStr = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
});

return `\n\n---\n\n# Meeting - ${dateStr} ${timeStr}\n\n## Attendees\n- \n\n## Agenda\n- \n\n## Discussion\n\n\n## Action Items\n- [ ] \n\n## Next Steps\n`;
```

## Append Quick Stats

```javascript
setOutputMode('append');
const stats = {
    wordCount: Math.floor(Math.random() * 1000) + 500,
    readingTime: Math.floor(Math.random() * 10) + 2,
    lastUpdated: new Date().toISOString().split('T')[0]
};

return `\n\n---\n\n**Document Stats**\n- Word Count: ~${stats.wordCount}\n- Reading Time: ~${stats.readingTime} minutes\n- Last Updated: ${stats.lastUpdated}`;
```

## Append Random Quote

```javascript
setOutputMode('append');
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Life is what happens to you while you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle"
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
return `\n\n---\n\n> ${randomQuote}`;
```