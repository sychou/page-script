# Text Generator PageScript

Generate various types of text content.

## Lorem Ipsum Generator

```javascript
function generateLoremIpsum(paragraphs = 3) {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    const sentences = lorem.split('. ');
    let result = [];
    
    for (let i = 0; i < paragraphs; i++) {
        const shuffled = [...sentences].sort(() => Math.random() - 0.5);
        result.push(shuffled.slice(0, 3 + Math.floor(Math.random() * 3)).join('. ') + '.');
    }
    
    return result.join('\n\n');
}

return generateLoremIpsum(2);
```

## Random Quote Generator

```javascript
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Life is what happens to you while you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle"
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
return `> ${randomQuote}`;
```