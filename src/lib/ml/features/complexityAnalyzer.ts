import { Task } from '../../../types/task';

export function analyzeComplexity(task: Task): number {
  const factors = {
    description: analyzeDescriptionComplexity(task.description),
    priority: analyzePriorityImpact(task.priority),
    duration: normalizeEstimatedDuration(task.estimated_duration)
  };

  return calculateWeightedScore(factors);
}

function analyzeDescriptionComplexity(description: string): number {
  const wordCount = description.split(/\s+/).length;
  const technicalTerms = countTechnicalTerms(description);
  return Math.min(1, (wordCount / 200) + (technicalTerms * 0.1));
}

function analyzePriorityImpact(priority: string): number {
  return priority === 'high' ? 1 : 
         priority === 'medium' ? 0.6 : 0.3;
}

function normalizeEstimatedDuration(duration: number): number {
  return Math.min(1, duration / 40); // Normalize to 40-hour max
}

function calculateWeightedScore(factors: Record<string, number>): number {
  const weights = { description: 0.4, priority: 0.3, duration: 0.3 };
  return Object.entries(factors)
    .reduce((score, [key, value]) => score + value * weights[key], 0);
}

function countTechnicalTerms(text: string): number {
  const technicalTerms = [
    'api', 'database', 'integration', 'deployment', 'optimization',
    'refactor', 'migration', 'security', 'authentication', 'testing'
  ];
  return technicalTerms.reduce((count, term) => 
    count + (text.toLowerCase().match(new RegExp(term, 'g'))?.length || 0), 0);
}