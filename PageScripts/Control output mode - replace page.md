# Control Output Mode - Replace Page

This example demonstrates using `setOutputMode('page')` to replace the entire content of the current page with your script output.

Use this mode when you want to generate a complete new page template or completely replace the current content.

```javascript
setOutputMode('page');

const today = new Date().toISOString().split('T')[0];
const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

return `# Daily Note - ${dayName}, ${today}

## Goals for Today
- [ ] 
- [ ] 
- [ ] 

## Notes


## Reflection


---
*Created: ${new Date().toLocaleString()}*`;
```

**What this does:**
- Sets output mode to 'page' (replace entire content)
- Generates a daily note template
- Includes today's date and day name
- Creates sections for goals, notes, and reflection
- **Warning**: This will replace ALL current content!

**Use cases:** Templates, page generation, complete rewrites