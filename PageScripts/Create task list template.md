# Create Task List Template

This example shows how to generate a structured task list template with different categories. This demonstrates string manipulation, array processing, and markdown formatting.

The script creates a comprehensive task template that can be customized for daily or project planning.

```javascript
// Define different categories of tasks
const categories = {
    "🎯 Priority Tasks": [
        "Review project status",
        "Complete urgent deliverables",
        "Address critical issues"
    ],
    "💼 Work Tasks": [
        "Check and respond to emails", 
        "Update project documentation",
        "Attend scheduled meetings",
        "Review team progress"
    ],
    "📚 Learning & Development": [
        "Read industry articles",
        "Practice new skills",
        "Watch educational videos"
    ],
    "🏠 Personal Tasks": [
        "Plan healthy meals",
        "Exercise or walk",
        "Connect with family/friends"
    ]
};

// Generate the task list
let taskList = `# Task List - ${new Date().toLocaleDateString()}\n\n`;

// Add each category with its tasks
Object.entries(categories).forEach(([category, tasks]) => {
    taskList += `## ${category}\n\n`;
    tasks.forEach(task => {
        taskList += `- [ ] ${task}\n`;
    });
    taskList += '\n';
});

// Add footer
taskList += `---\n*Generated: ${new Date().toLocaleString()}*`;

return taskList;
```

**What this does:**
- Creates an object with task categories and their items
- Uses `Object.entries()` to iterate through categories
- Formats each category as a markdown header
- Converts tasks to checkbox format (`- [ ]`)
- Adds timestamps for tracking
- Returns a complete formatted task list

**Programming concepts:**
- **Objects**: Key-value data structures
- **Object.entries()**: Converting objects to iterable arrays
- **forEach()**: Iterating through arrays
- **String concatenation**: Building up longer strings
- **Template literals**: Using `${}` for variable insertion

**Use cases:** Daily planning, project templates, habit tracking, goal setting