# Generate Random Quote

This example demonstrates how to work with arrays and randomization to select and display a random quote from a predefined collection.

Arrays and `Math.random()` are fundamental programming concepts useful for creating varied, dynamic content.

```javascript
// Collection of inspirational quotes
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs", 
    "Life is what happens to you while you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The way to get started is to quit talking and begin doing. - Walt Disney"
];

// Select a random quote
const randomIndex = Math.floor(Math.random() * quotes.length);
const selectedQuote = quotes[randomIndex];

// Format as markdown quote
return `> ${selectedQuote}`;
```

**What this does:**
- Creates an array of quotes
- Uses `Math.random()` to generate a random number between 0 and 1
- Multiplies by array length and uses `Math.floor()` to get a random index
- Selects the quote at that index
- Formats it as a markdown blockquote using `> `

**Programming concepts:**
- **Arrays**: Collections of items
- **Random numbers**: `Math.random()` and `Math.floor()`
- **Array indexing**: Accessing items by position
- **String templating**: Using backticks and `${}`

**Use cases:** Daily inspiration, random content, variety in templates