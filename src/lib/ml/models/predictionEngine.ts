import { Task } from '../../../types/task';
import { PredictionResult } from '../../../types/prediction';
import { findSimilarTasks } from './similarityEngine';
import { analyzeComplexity } from '../features/complexityAnalyzer';
import { calculateUrgency } from '../features/urgencyCalculator';

const MODEL_VERSION = '1.0';

export function generatePrediction(
  task: Task,
  historicalTasks: Task[]
): PredictionResult {
  const similarTasks = findSimilarTasks(task, historicalTasks);
  const prediction = calculatePrediction(task, similarTasks);
  const confidence = calculateConfidence(similarTasks);
  
  return {
    prediction: Math.round(prediction),
    confidence,
    features: {
      complexity: analyzeComplexity(task),
      urgency: calculateUrgency(task),
      similarity: calculateAverageSimilarity(similarTasks),
      contextual_factors: analyzeContextualFactors(similarTasks)
    },
    metadata: {
      model_version: MODEL_VERSION,
      timestamp: new Date().toISOString(),
      sample_size: similarTasks.length
    }
  };
}

function calculatePrediction(task: Task, similarTasks: Task[]): number {
  if (!similarTasks.length) return task.estimated_duration;

  const accuracyRatios = similarTasks
    .map(t => (t.actual_duration || t.estimated_duration) / t.estimated_duration);
  
  const averageRatio = accuracyRatios.reduce((sum, ratio) => sum + ratio, 0) / 
                      accuracyRatios.length;

  return task.estimated_duration * averageRatio;
}

function calculateConfidence(similarTasks: Task[]): number {
  if (!similarTasks.length) return 0.5;

  const accuracies = similarTasks.map(task => {
    if (!task.actual_duration) return 0;
    const error = Math.abs(task.actual_duration - task.estimated_duration);
    return Math.max(0, 1 - (error / task.estimated_duration));
  });

  return accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
}

function calculateAverageSimilarity(similarTasks: Task[]): number {
  return similarTasks.length ? 0.8 : 0.5; // Simplified for example
}

function analyzeContextualFactors(similarTasks: Task[]) {
  return {
    team_velocity: calculateTeamVelocity(similarTasks),
    historical_accuracy: calculateHistoricalAccuracy(similarTasks),
    seasonal_patterns: detectSeasonalPatterns(similarTasks)
  };
}

function calculateTeamVelocity(tasks: Task[]): number {
  return tasks.length ? 0.7 : 0.5; // Simplified
}

function calculateHistoricalAccuracy(tasks: Task[]): number {
  return tasks.length ? 0.8 : 0.5; // Simplified
}

function detectSeasonalPatterns(tasks: Task[]): number {
  return tasks.length ? 0.6 : 0.5; // Simplified
}