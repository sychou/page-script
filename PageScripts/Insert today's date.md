# Insert Today's Date

This example shows how to insert just the current date (without time) in ISO format (YYYY-MM-DD).

The `toISOString()` method returns the date in ISO format, and `split('T')[0]` extracts just the date part before the 'T' character.

```javascript
const today = new Date();
const dateOnly = today.toISOString().split('T')[0];
return dateOnly;
```

**What this does:**
- Gets the current date
- Converts to ISO format (2025-08-25T15:45:23.123Z)
- Splits on 'T' and takes the first part
- Returns just the date: 2025-08-25

**Use cases:** Daily notes, timestamps, date headers