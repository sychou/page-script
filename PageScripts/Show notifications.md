# Show Notifications

This example demonstrates how to display notifications to users using Obsidian's `Notice` system. Notifications appear as temporary messages at the top of the Obsidian window.

The `Notice` function is available in all PageScripts and is useful for providing feedback to users.

```javascript
// Show different types of notifications
new Notice("This is a basic notification!");

// Show a notification that lasts longer (5 seconds)
new Notice("This message stays for 5 seconds", 5000);

// Show multiple notifications
new Notice("Processing...", 2000);
setTimeout(() => {
    new Notice("Complete!", 3000);
}, 2000);

// Return something to insert in the document too
return "Notification demo completed. Check the top of your Obsidian window!";
```

**What this does:**
- `new Notice("message")` - Shows a notification for default time (4 seconds)
- `new Notice("message", 5000)` - Shows notification for 5 seconds (5000 milliseconds)
- `setTimeout()` - Delays execution to show sequential notifications
- Also returns text that gets inserted in the document

**Use cases:** 
- User feedback during script execution
- Status updates for long-running scripts  
- Confirmation messages
- Error notifications
- Progress indicators