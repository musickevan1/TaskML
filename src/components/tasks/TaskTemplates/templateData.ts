/**
 * Predefined task templates for common scenarios
 */
import { Task } from '../../../types/task';

interface TaskTemplate extends Partial<Task> {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const templates: TaskTemplate[] = [
  {
    id: 'bug-fix',
    name: 'Bug Fix',
    category: 'development',
    title: 'Fix: ',
    description: `## Issue Description
[Describe the bug]

## Steps to Reproduce
1. 
2. 
3. 

## Expected Behavior
[What should happen]

## Current Behavior
[What is happening]

## Possible Cause
[Initial analysis]

## Proposed Solution
[How we plan to fix it]`,
    priority: 'high',
    estimated_duration: 4
  },
  {
    id: 'feature',
    name: 'New Feature',
    category: 'development',
    title: 'Feature: ',
    description: `## Overview
[Brief description of the feature]

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2

## Technical Design
- Architecture considerations
- Implementation approach
- Dependencies

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2

## Testing Plan
- Unit tests
- Integration tests
- User acceptance testing`,
    priority: 'medium',
    estimated_duration: 8
  },
  {
    id: 'documentation',
    name: 'Documentation Update',
    category: 'documentation',
    title: 'Docs: ',
    description: `## Scope
[What needs to be documented]

## Sections to Update
- [ ] Section 1
- [ ] Section 2

## Content Outline
1. Introduction
2. Main content
3. Examples
4. References

## Review Process
- Technical review
- Copy editing
- Final approval`,
    priority: 'low',
    estimated_duration: 4
  }
];