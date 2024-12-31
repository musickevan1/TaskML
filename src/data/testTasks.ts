/**
 * Test tasks data for development and testing purposes.
 * Covers various scenarios, priorities, and complexities.
 */
export const testTasks = [
  {
    title: "API Integration: Payment Gateway",
    description: `## Objective
Integrate the Stripe payment gateway API for secure payment processing.

## Requirements
- Implement secure payment processing
- Handle webhooks for payment events
- Add error handling and logging
- Create test suite for payment flows

## Technical Considerations
- API versioning
- Security best practices
- Error handling strategies
- Performance monitoring`,
    priority: "high",
    estimated_duration: 16,
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week from now
  },
  {
    title: "User Dashboard Redesign",
    description: `## Overview
Update the user dashboard with new analytics features and improved UX.

## Design Requirements
- Implement new chart components
- Add customizable widgets
- Improve mobile responsiveness
- Update color scheme and typography

## Deliverables
- Updated UI components
- Responsive layouts
- Documentation updates
- Design system additions`,
    priority: "medium",
    estimated_duration: 12,
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days from now
  },
  {
    title: "Database Optimization",
    description: `## Goals
Optimize database performance and query efficiency.

## Tasks
- Analyze current query performance
- Add necessary indexes
- Optimize slow queries
- Update documentation

## Performance Targets
- 50% reduction in query time
- Improved cache utilization
- Reduced server load`,
    priority: "high",
    estimated_duration: 8,
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
  },
  {
    title: "Documentation Update",
    description: `## Scope
Update technical documentation for the latest release.

## Areas to Cover
- API documentation
- Setup guides
- Troubleshooting guides
- Code examples

## Format
- Markdown files
- API reference
- Code snippets
- Diagrams`,
    priority: "low",
    estimated_duration: 6,
    due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days from now
  },
  {
    title: "Security Audit",
    description: `## Objectives
Perform comprehensive security audit of the application.

## Audit Areas
- Authentication system
- Data encryption
- API security
- Dependency vulnerabilities

## Deliverables
- Security report
- Risk assessment
- Remediation plan
- Implementation timeline`,
    priority: "high",
    estimated_duration: 20,
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 2 weeks from now
  }
];