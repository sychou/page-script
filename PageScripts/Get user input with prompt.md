# Get User Input with Prompt

This example demonstrates how to use `ps.prompt()` to get user input and use it in your script. This is the PageScript equivalent of Templater's `tp.system.prompt()`.

**Key concepts:**
- `ps.prompt(question, default)` - Shows a dialog asking for user input
- Returns a Promise, so use `.then()` to handle the response
- Returns `null` if the user cancels the prompt
- Can provide a default value that appears in the input field

```javascript
// Simple prompt - ask user for their name
// IMPORTANT: Must RETURN the Promise chain for the result to be captured
return ps.prompt("What's your name?", "Anonymous").then(name => {
    if (name) {
        ps.notice(`Hello, ${name}!`);
        return `# Greetings, ${name}!\n\nWelcome to PageScript! Today is ${new Date().toDateString()}.`;
    } else {
        return "User cancelled the prompt.";
    }
}).catch(error => {
    return `Error: ${error.message}`;
});
```