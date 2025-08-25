# Page Mode Examples

Scripts that replace the entire page content.

**Note**: All JavaScript code blocks in a file will be executed in order, and their return values will be combined. Each code block runs in its own scope to avoid variable conflicts.

## Create Daily Note Template

```javascript
setOutputMode('page');
const today = new Date();
const dateStr = today.toISOString().split('T')[0];
const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

return `# ${dayName}, ${dateStr}

## Today's Goals
- [ ] 
- [ ] 
- [ ] 

## Schedule
- **9:00 AM** - 
- **11:00 AM** - 
- **2:00 PM** - 
- **4:00 PM** - 

## Notes


## Reflection


## Tomorrow's Prep
- [ ] 
- [ ] 
`;
```

## Create Project Planning Template

```javascript
setOutputMode('page');
return `# Project Plan

## Project Overview
**Name**: 
**Start Date**: 
**End Date**: 
**Team**: 

## Objectives
1. 
2. 
3. 

## Milestones
- [ ] **Week 1**: Project kickoff and planning
- [ ] **Week 2**: Initial development phase
- [ ] **Week 3**: Testing and refinement
- [ ] **Week 4**: Final delivery and review

## Resources Needed
- **People**: 
- **Tools**: 
- **Budget**: 

## Risks & Mitigation
| Risk | Impact | Probability | Mitigation |
|------|---------|-------------|------------|
|      |         |             |            |

## Success Criteria
- 
- 
- 

## Notes
`;
```

## Create Meeting Agenda

```javascript
setOutputMode('page');
const today = new Date();
const dateStr = today.toLocaleDateString();
const timeStr = today.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
});

return `# Meeting Agenda - ${dateStr}

**Time**: ${timeStr}
**Duration**: 60 minutes
**Location**: 
**Facilitator**: 

## Attendees
- [ ] 
- [ ] 
- [ ] 

## Agenda Items

### 1. Welcome & Introductions (5 min)
- Brief introductions if needed
- Review agenda

### 2. Previous Action Items Review (10 min)
- [ ] Item 1
- [ ] Item 2
- [ ] Item 3

### 3. Main Discussion Topics (35 min)

#### Topic 1: 
- Discussion points:
- Decisions needed:
- Action items:

#### Topic 2:
- Discussion points:
- Decisions needed:
- Action items:

### 4. Next Steps & Wrap-up (10 min)
- Summary of decisions
- Assign action items
- Schedule follow-up

## Action Items
| Item | Owner | Due Date | Status |
|------|-------|----------|--------|
|      |       |          |        |

## Notes
`;
```

## Create Book Review Template

```javascript
setOutputMode('page');
return `# Book Review

## Book Information
**Title**: 
**Author**: 
**Genre**: 
**Publication Year**: 
**Pages**: 

## Rating
⭐⭐⭐⭐⭐ (**X**/5 stars)

## Summary
Brief plot or content summary (2-3 sentences):


## Key Takeaways
1. 
2. 
3. 

## Favorite Quotes
> ""

> ""

## What I Liked
- 
- 
- 

## What I Didn't Like
- 
- 

## Who Should Read This
This book is perfect for:
- 
- 
- 

## Personal Impact
How did this book change your thinking or affect you?


## Recommendation
Would I recommend this book? Why or why not?


## Related Books
- 
- 
- 

## Final Thoughts
`;
```

## Generate Status Report

```javascript
setOutputMode('page');
const today = new Date();
const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));

const formatDate = (date) => date.toLocaleDateString();

return `# Weekly Status Report

**Week of**: ${formatDate(weekStart)} - ${formatDate(weekEnd)}
**Prepared by**: 
**Date**: ${new Date().toLocaleDateString()}

## Executive Summary
Brief overview of the week's accomplishments and key metrics.


## Key Accomplishments
- ✅ 
- ✅ 
- ✅ 

## Challenges & Blockers
- ⚠️ 
- ⚠️ 

## Metrics & KPIs
| Metric | Target | Actual | Variance |
|--------|---------|--------|----------|
|        |         |        |          |
|        |         |        |          |

## Upcoming Priorities
### Next Week
- [ ] 
- [ ] 
- [ ] 

### This Month
- [ ] 
- [ ] 
- [ ] 

## Resource Needs
- **People**: 
- **Budget**: 
- **Tools/Equipment**: 

## Risks & Mitigation
- **Risk**: 
  - **Impact**: 
  - **Mitigation**: 

## Additional Notes
`;
```