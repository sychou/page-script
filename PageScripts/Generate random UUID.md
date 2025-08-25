# Generate Random UUID

This example demonstrates how to generate a random UUID (Universally Unique Identifier) for use as unique identifiers.

A UUID is a 36-character string that's virtually guaranteed to be unique. This is useful for creating unique IDs for notes, tasks, or references.

```javascript
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

return generateUUID();
```

**What this does:**
- Uses a template pattern for UUID format
- Replaces 'x' and 'y' with random hexadecimal digits
- Follows UUID version 4 specification
- Returns a unique identifier like: `f47ac10b-58cc-4372-a567-0e02b2c3d479`

**Use cases:** Unique note IDs, reference links, database keys