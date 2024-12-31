import { Task } from '../../../types/task';

export function calculateUrgency(task: Task): number {
  if (!task.due_date) return 0.5; // Default medium urgency

  const urgencyFactors = {
    timeUntilDue: calculateTimeUrgency(task.due_date),
    priority: calculatePriorityUrgency(task.priority),
    dependencies: calculateDependencyUrgency(task)
  };

  return normalizeUrgency(urgencyFactors);
}

function calculateTimeUrgency(dueDate: string): number {
  const now = new Date();
  const due = new Date(dueDate);
  const daysUntilDue = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysUntilDue < 0) return 1; // Overdue
  if (daysUntilDue > 14) return 0.2; // More than 2 weeks
  return 1 - (daysUntilDue / 14);
}

function calculatePriorityUrgency(priority: string): number {
  return priority === 'high' ? 1 :
         priority === 'medium' ? 0.6 : 0.3;
}

function calculateDependencyUrgency(task: Task): number {
  // Placeholder for dependency analysis
  return 0.5;
}

function normalizeUrgency(factors: Record<string, number>): number {
  const weights = {
    timeUntilDue: 0.5,
    priority: 0.3,
    dependencies: 0.2
  };

  return Object.entries(factors)
    .reduce((total, [key, value]) => total + value * weights[key], 0);
}