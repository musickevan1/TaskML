import { Task } from '../../../types/task';

export interface TaskFeatures {
  taskLength: number;
  complexity: number;
  urgency: number;
  similarityScore: number;
}

export function extractTaskFeatures(task: Task): TaskFeatures {
  return {
    taskLength: calculateTaskLength(task),
    complexity: calculateComplexity(task),
    urgency: calculateUrgency(task),
    similarityScore: calculateSimilarityScore(task)
  };
}

function calculateTaskLength(task: Task): number {
  return task.estimated_duration || 0;
}

function calculateComplexity(task: Task): number {
  const baseComplexity = task.description.length / 1000; // Normalize by 1000 chars
  const priorityFactor = task.priority === 'high' ? 1.5 : 
                        task.priority === 'medium' ? 1.2 : 1;
  
  return Math.min(1, baseComplexity * priorityFactor);
}

function calculateUrgency(task: Task): number {
  if (!task.due_date) return 0;
  
  const now = new Date();
  const due = new Date(task.due_date);
  const daysUntilDue = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  
  return Math.max(0, Math.min(1, 1 - (daysUntilDue / 14))); // Normalize to 2 weeks
}

function calculateSimilarityScore(task: Task): number {
  // Placeholder for future similarity calculation
  return 0.5;
}