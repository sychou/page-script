# Process and Format Data

This example demonstrates data processing techniques including array manipulation, mathematical operations, and formatting results. These are core programming skills useful in many scripts.

The script takes a dataset, performs calculations, and presents formatted results.

```javascript
// Sample data - could come from anywhere
const salesData = [
    { month: 'January', sales: 12500, target: 15000 },
    { month: 'February', sales: 18200, target: 15000 },
    { month: 'March', sales: 14800, target: 15000 },
    { month: 'April', sales: 22100, target: 20000 },
    { month: 'May', sales: 19600, target: 20000 }
];

// Process the data
const totalSales = salesData.reduce((sum, month) => sum + month.sales, 0);
const totalTarget = salesData.reduce((sum, month) => sum + month.target, 0);
const averageSales = totalSales / salesData.length;
const performancePercent = ((totalSales / totalTarget) * 100).toFixed(1);

// Find best and worst months
const bestMonth = salesData.reduce((prev, current) => 
    (prev.sales > current.sales) ? prev : current
);
const worstMonth = salesData.reduce((prev, current) => 
    (prev.sales < current.sales) ? prev : current
);

// Format results
const report = `# Sales Performance Report

## Summary
- **Total Sales**: $${totalSales.toLocaleString()}
- **Total Target**: $${totalTarget.toLocaleString()}
- **Performance**: ${performancePercent}% of target
- **Average Monthly Sales**: $${Math.round(averageSales).toLocaleString()}

## Best/Worst Performance
- **Best Month**: ${bestMonth.month} ($${bestMonth.sales.toLocaleString()})
- **Worst Month**: ${worstMonth.month} ($${worstMonth.sales.toLocaleString()})

## Monthly Breakdown
${salesData.map(month => {
    const percent = ((month.sales / month.target) * 100).toFixed(1);
    const status = month.sales >= month.target ? '✅' : '❌';
    return `- **${month.month}**: $${month.sales.toLocaleString()} (${percent}% of target) ${status}`;
}).join('\n')}

---
*Report generated: ${new Date().toLocaleString()}*`;

return report;
```

**What this does:**
- Defines sample data as an array of objects
- Uses `reduce()` to calculate totals and find min/max values
- Performs mathematical calculations (averages, percentages)
- Uses `map()` to transform data for display
- Formats numbers with `toLocaleString()` for readability
- Creates a comprehensive formatted report

**Programming concepts:**
- **Array.reduce()**: Accumulating values from arrays
- **Array.map()**: Transforming array elements
- **Object destructuring**: Accessing object properties
- **Mathematical operations**: Sum, average, percentage
- **Number formatting**: `toLocaleString()`, `toFixed()`
- **Conditional operators**: Ternary operator `? :`

**Use cases:** Data analysis, reporting, dashboards, performance tracking