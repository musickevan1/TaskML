import { Task } from '../../../types/task';
import { analyzeComplexity } from '../features/complexityAnalyzer';
import { calculateUrgency } from '../features/urgencyCalculator';

export function findSimilarTasks(
  task: Task,
  historicalTasks: Task[],
  limit: number = 5
): Task[] {
  const taskFeatures = extractFeatures(task);
  
  return historicalTasks
    .filter(t => t.status === 'completed' && t.actual_duration)
    .map(t => ({
      task: t,
      similarity: calculateSimilarity(taskFeatures, extractFeatures(t))
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map(result => result.task);
}

function extractFeatures(task: Task) {
  return {
    complexity: analyzeComplexity(task),
    urgency: calculateUrgency(task),
    estimatedDuration: task.estimated_duration
  };
}

function calculateSimilarity(
  features1: ReturnType<typeof extractFeatures>,
  features2: ReturnType<typeof extractFeatures>
): number {
  const weights = {
    complexity: 0.4,
    urgency: 0.3,
    estimatedDuration: 0.3
  };

  const complexityDiff = Math.abs(features1.complexity - features2.complexity);
  const urgencyDiff = Math.abs(features1.urgency - features2.urgency);
  const durationDiff = Math.abs(
    features1.estimatedDuration - features2.estimatedDuration
  ) / Math.max(features1.estimatedDuration, features2.estimatedDuration);

  return 1 - (
    complexityDiff * weights.complexity +
    urgencyDiff * weights.urgency +
    durationDiff * weights.estimatedDuration
  );
}