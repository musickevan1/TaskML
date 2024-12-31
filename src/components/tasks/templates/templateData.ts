import { TaskTemplate } from './types';
import { Code, FileSpreadsheet, ListTodo, GitPullRequest, FileSearch, Calendar } from 'lucide-react';

export const taskTemplates: TaskTemplate[] = [
  {
    id: 'feature',
    name: 'New Feature',
    icon: Code,
    category: 'development',
    description: `## Objective
Brief description of the feature

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2

## Technical Notes
- Architecture considerations
- Implementation details
- Dependencies`,
    estimatedDuration: 8
  },
  {
    id: 'bug-fix',
    name: 'Bug Fix',
    icon: GitPullRequest,
    category: 'development',
    description: `## Issue Description
Detailed description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2

## Expected Behavior
What should happen

## Current Behavior
What is happening

## Root Cause
Initial analysis of the cause

## Proposed Solution
How we plan to fix it`,
    estimatedDuration: 4
  },
  {
    id: 'weekly-report',
    name: 'Weekly Report',
    icon: FileSpreadsheet,
    category: 'reporting',
    description: `## Report Overview
Brief summary of the week

## Key Metrics
- Metric 1: Value
- Metric 2: Value

## Achievements
- Achievement 1
- Achievement 2

## Challenges
- Challenge 1
- Challenge 2

## Action Items
- [ ] Action 1
- [ ] Action 2

## Notes
Additional information`,
    estimatedDuration: 4
  },
  {
    id: 'sprint-planning',
    name: 'Sprint Planning',
    icon: Calendar,
    category: 'planning',
    description: `## Sprint Goals
Main objectives for this sprint

## Scope
- Feature 1
- Feature 2

## Team Capacity
- Available resources
- Time constraints

## Risk Assessment
- Potential risks
- Mitigation strategies

## Dependencies
- External dependencies
- Internal dependencies`,
    estimatedDuration: 6
  }
];