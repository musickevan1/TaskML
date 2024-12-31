import { Task } from '../../../types/task';
import { TaskFeatures } from '../features/taskFeatureExtractor';
import { PredictionResult } from '../../../types/prediction';

export function predictDuration(
  task: Task,
  features: TaskFeatures,
  historicalTasks: Task[]
): PredictionResult {
  const similarTasks = findSimilarTasks(historicalTasks, features);
  const prediction = calculatePrediction(task, similarTasks);
  const confidence = calculateConfidence(prediction, similarTasks);

  return {
    prediction: Math.round(prediction),
    confidence,
    features
  };
}

function findSimilarTasks(tasks: Task[], features: TaskFeatures): Task[] {
  return tasks
    .filter(t => t.status === 'completed' && t.actual_duration)
    .sort((a, b) => {
      const scoreA = calculateSimilarityScore(a, features);
      const scoreB = calculateSimilarityScore(b, features);
      return scoreB - scoreA;
    })
    .slice(0, 5);
}

function calculatePrediction(task: Task, similarTasks: Task[]): number {
  if (!similarTasks.length) return task.estimated_duration;

  const accuracyRatios = similarTasks.map(t => 
    (t.actual_duration || t.estimated_duration) / t.estimated_duration
  );
  
  const averageRatio = accuracyRatios.reduce((sum, ratio) => sum + ratio, 0) / 
                      accuracyRatios.length;

  return task.estimated_duration * averageRatio;
}

function calculateConfidence(prediction: number, similarTasks: Task[]): number {
  if (!similarTasks.length) return 0.5;

  const variance = calculateVariance(similarTasks);
  return Math.max(0, Math.min(1, 1 - variance));
}

function calculateSimilarityScore(task: Task, features: TaskFeatures): number {
  // Simplified similarity score based on task properties
  return features.similarityScore;
}

function calculateVariance(tasks: Task[]): number {
  if (!tasks.length) return 1;
  
  const durations = tasks.map(t => t.actual_duration || t.estimated_duration);
  const mean = durations.reduce((sum, d) => sum + d, 0) / durations.length;
  
  const variance = durations.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) / 
                  durations.length;
  
  return Math.min(1, variance / (mean * mean));
}