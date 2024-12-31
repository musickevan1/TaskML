// Simple ML utility functions for task predictions
export const predictTaskDuration = (
  similarTasks: Array<{ estimated_duration: number; actual_duration: number }>,
): number => {
  if (!similarTasks.length) return 0;

  // Calculate average accuracy ratio of estimates
  const accuracyRatios = similarTasks.map(
    task => task.actual_duration / task.estimated_duration,
  );
  const averageRatio =
    accuracyRatios.reduce((sum, ratio) => sum + ratio, 0) / accuracyRatios.length;

  // Use the most recent estimated duration and adjust it based on historical accuracy
  const latestEstimate = similarTasks[similarTasks.length - 1].estimated_duration;
  return Math.round(latestEstimate * averageRatio);
};

export const suggestPriority = (
  dueDate: Date,
  estimatedDuration: number,
): 'low' | 'medium' | 'high' => {
  const now = new Date();
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  const workingHoursPerDay = 8;
  const availableHours = daysUntilDue * workingHoursPerDay;

  if (estimatedDuration >= availableHours * 0.75) return 'high';
  if (estimatedDuration >= availableHours * 0.5) return 'medium';
  return 'low';
};