# New File Mode Examples

Scripts that create new files with their output.

**Note**: All JavaScript code blocks in a file will be executed in order, and their return values will be combined. Each code block runs in its own scope to avoid variable conflicts.

## Create Daily Journal Entry

```javascript
setOutputMode('newfile');
const today = new Date();
const dateStr = today.toISOString().split('T')[0];
const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

return `# Journal Entry - ${dayName}, ${dateStr}

## Mood
😊😐😔 (Circle one)

## Today I'm Grateful For
1. 
2. 
3. 

## What Happened Today
### Morning


### Afternoon


### Evening


## Challenges I Faced


## How I Overcame Them


## What I Learned Today


## Tomorrow I Want To
- 
- 
- 

## Random Thoughts


---
*Entry created at ${new Date().toLocaleTimeString()}*`;
```

## Generate Meeting Minutes

```javascript
setOutputMode('newfile');
const now = new Date();
const dateStr = now.toLocaleDateString();
const timeStr = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
});

return `# Meeting Minutes - ${dateStr}

**Date**: ${dateStr}
**Time**: ${timeStr}
**Duration**: 
**Location**: 
**Meeting Type**: 

## Attendees
- **Present**: 
- **Absent**: 
- **Guests**: 

## Agenda Items Discussed

### Item 1: 
**Discussion**: 
**Decision**: 
**Action Items**: 
- [ ] Task - Assigned to: [Name] - Due: [Date]

### Item 2: 
**Discussion**: 
**Decision**: 
**Action Items**: 
- [ ] Task - Assigned to: [Name] - Due: [Date]

## Key Decisions Made
1. 
2. 
3. 

## Action Items Summary
| Item | Assigned To | Due Date | Status |
|------|-------------|----------|--------|
|      |             |          | Pending |

## Next Meeting
**Date**: 
**Time**: 
**Agenda Preview**: 

## Additional Notes


---
*Minutes recorded by: [Your Name]*
*Document created: ${now.toLocaleString()}*`;
```

## Create Idea Capture Document

```javascript
setOutputMode('newfile');
const now = new Date();
const timestamp = now.toLocaleString();

return `# Idea Capture - ${timestamp}

## The Idea
**One-line summary**: 


**Detailed description**: 


## Context
**What sparked this idea?**: 


**Problem it solves**: 


## Potential Impact
- **Who would benefit?**: 
- **How big is the opportunity?**: 
- **What's the potential value?**: 

## Implementation Thoughts
### Resources Needed
- **Time**: 
- **People**: 
- **Money**: 
- **Skills**: 

### Rough Timeline
- **Phase 1** (Research): 
- **Phase 2** (Prototype): 
- **Phase 3** (Launch): 

### Potential Challenges
1. 
2. 
3. 

## Next Steps
- [ ] Research similar solutions
- [ ] Validate with potential users
- [ ] Create a basic prototype
- [ ] Estimate resource requirements
- [ ] Present to stakeholders

## Related Ideas/Links
- 
- 
- 

## Status
- [x] Captured
- [ ] Researched
- [ ] Validated
- [ ] Prototyped
- [ ] Implemented

---
*Idea captured: ${timestamp}*`;
```

## Generate Research Template

```javascript
setOutputMode('newfile');
const today = new Date().toISOString().split('T')[0];

return `# Research: [Topic Name]

**Date Started**: ${today}
**Researcher**: 
**Purpose**: 

## Research Question
What specific question are you trying to answer?


## Hypothesis
What do you think you'll discover?


## Research Methods
- [ ] Literature review
- [ ] Interviews
- [ ] Surveys
- [ ] Data analysis
- [ ] Observation
- [ ] Other: ___________

## Sources to Investigate
### Academic/Professional
- [ ] 
- [ ] 
- [ ] 

### Online Resources
- [ ] 
- [ ] 
- [ ] 

### People to Contact
- [ ] Name: ___ | Contact: ___ | Expertise: ___
- [ ] Name: ___ | Contact: ___ | Expertise: ___

## Key Findings
### Finding 1
**Source**: 
**Summary**: 
**Relevance**: 
**Reliability**: ⭐⭐⭐⭐⭐

### Finding 2
**Source**: 
**Summary**: 
**Relevance**: 
**Reliability**: ⭐⭐⭐⭐⭐

## Synthesis
### Patterns & Themes
- 
- 
- 

### Contradictions & Gaps
- 
- 
- 

## Conclusions
### What did you learn?


### How does this answer your research question?


### What questions remain unanswered?


## Next Steps
- [ ] 
- [ ] 
- [ ] 

## References
1. 
2. 
3. 

---
*Research document created: ${new Date().toLocaleString()}*`;
```

## Create Project Retrospective

```javascript
setOutputMode('newfile');
const today = new Date().toISOString().split('T')[0];

return `# Project Retrospective - ${today}

**Project Name**: 
**Team Members**: 
**Project Duration**: 
**Retrospective Facilitator**: 

## Project Overview
### Goals
- **Primary Goal**: 
- **Secondary Goals**: 
  - 
  - 

### Key Metrics
| Metric | Target | Actual | Variance |
|--------|---------|--------|----------|
|        |         |        |          |
|        |         |        |          |

## What Went Well? 🎉
### Achievements
- 
- 
- 

### Processes That Worked
- 
- 
- 

### Team Strengths Displayed
- 
- 
- 

## What Could Be Improved? 🤔
### Challenges Faced
- **Challenge**: 
  - **Impact**: 
  - **How we handled it**: 

- **Challenge**: 
  - **Impact**: 
  - **How we handled it**: 

### Process Issues
- 
- 
- 

## Lessons Learned 📚
### Technical Lessons
- 
- 
- 

### Process Lessons
- 
- 
- 

### Team/Communication Lessons
- 
- 
- 

## Action Items for Future Projects
### Start Doing
- [ ] 
- [ ] 
- [ ] 

### Stop Doing
- [ ] 
- [ ] 
- [ ] 

### Continue Doing
- [ ] 
- [ ] 
- [ ] 

## Recommendations
### For Similar Projects
- 
- 
- 

### For Team Development
- 
- 
- 

### For Process Improvement
- 
- 
- 

## Overall Project Rating
**Success Rating**: ⭐⭐⭐⭐⭐ (X/5 stars)

**Why this rating?**: 


---
*Retrospective completed: ${new Date().toLocaleString()}*
*Next review date: ___________*`;
```