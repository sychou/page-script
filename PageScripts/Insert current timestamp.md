# Insert Current Timestamp

This example demonstrates how to insert the current date and time at the cursor position.

JavaScript's `Date()` object provides access to the current date and time. The `toLocaleString()` method formats it in a readable way.

```javascript
const now = new Date();
return now.toLocaleString();
```

**What this does:**
- Creates a new Date object with the current time
- Converts it to a human-readable string
- Inserts the formatted timestamp at cursor position

**Example output:** `8/25/2025, 3:45:23 PM`