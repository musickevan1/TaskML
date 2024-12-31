import { Task } from '../../../types/task';
import { PredictionFeatures } from '../../../types/prediction';

export function validateTask(task: Task): void {
  if (!task.id) throw new Error('Task ID is required');
  if (!task.title) throw new Error('Task title is required');
  if (!task.estimated_duration) throw new Error('Estimated duration is required');
}

export function validateFeatures(features: PredictionFeatures): void {
  if (features.complexity < 0 || features.complexity > 1) {
    throw new Error('Complexity score must be between 0 and 1');
  }
  if (features.urgency < 0 || features.urgency > 1) {
    throw new Error('Urgency score must be between 0 and 1');
  }
  if (features.similarity < 0 || features.similarity > 1) {
    throw new Error('Similarity score must be between 0 and 1');
  }
}