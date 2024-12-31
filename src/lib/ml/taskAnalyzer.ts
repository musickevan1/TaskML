import { Task } from '../../types/task';

interface TaskFeatures {
  title_length: number;
  description_length: number;
  has_due_date: boolean;
  days_until_due: number | null;
  estimated_duration: number;
  priority_level: number;
}

export function extractTaskFeatures(task: Task): TaskFeatures {
  const now = new Date();
  const dueDate = task.due_date ? new Date(task.due_date) : null;
  
  return {
    title_length: task.title.length,
    description_length: task.description.length,
    has_due_date: !!task.due_date,
    days_until_due: dueDate 
      ? Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null,
    estimated_duration: task.estimated_duration,
    priority_level: task.priority === 'high' ? 3 : task.priority === 'medium' ? 2 : 1
  };
}

export function calculateComplexityScore(features: TaskFeatures): number {
  const weights = {
    description_length: 0.3,
    estimated_duration: 0.3,
    priority_level: 0.2,
    days_until_due: 0.2
  };

  let score = 0;
  
  // Normalize description length (assume max 1000 chars)
  score += (features.description_length / 1000) * weights.description_length;
  
  // Normalize estimated duration (assume max 40 hours)
  score += (features.estimated_duration / 40) * weights.estimated_duration;
  
  // Priority level is already normalized (1-3)
  score += (features.priority_level / 3) * weights.priority_level;
  
  // Days until due date factor (closer = more complex)
  if (features.days_until_due !== null) {
    const daysUntilDueFactor = Math.max(0, 1 - (features.days_until_due / 14));
    score += daysUntilDueFactor * weights.days_until_due;
  }

  return Math.min(1, Math.max(0, score));
}