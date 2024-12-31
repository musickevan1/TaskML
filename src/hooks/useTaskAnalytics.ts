import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types/task';
import { TaskPrediction } from '../types/prediction';
import { supabase } from '../lib/supabase';
import { generatePrediction } from '../lib/ml/models/predictionEngine';

interface TaskAnalytics {
  loading: boolean;
  prediction: TaskPrediction | null;
  error: string | null;
  historicalAccuracy: number | null;
}

export function useTaskAnalytics(task: Task) {
  const [analytics, setAnalytics] = useState<TaskAnalytics>({
    loading: false,
    prediction: null,
    error: null,
    historicalAccuracy: null
  });

  const fetchPrediction = useCallback(async () => {
    setAnalytics(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Fetch historical tasks
      const { data: historicalTasks, error: historyError } = await supabase
        .from('tasks')
        .select('*')
        .eq('status', 'completed')
        .not('actual_duration', 'is', null)
        .order('completed_at', { ascending: false })
        .limit(50);

      if (historyError) throw historyError;

      // Generate prediction
      const result = generatePrediction(task, historicalTasks || []);

      // Store prediction
      const { data: prediction, error: predictionError } = await supabase
        .from('ml_predictions')
        .insert([{
          task_id: task.id,
          predicted_duration: result.prediction,
          confidence_level: result.confidence,
          prediction_features: result.features,
          model_version: result.metadata.model_version
        }])
        .select()
        .single();

      if (predictionError) throw predictionError;

      setAnalytics({
        loading: false,
        prediction,
        error: null,
        historicalAccuracy: calculateHistoricalAccuracy(historicalTasks || [])
      });
    } catch (err) {
      setAnalytics(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to generate prediction'
      }));
    }
  }, [task]);

  useEffect(() => {
    fetchPrediction();
  }, [fetchPrediction]);

  return {
    ...analytics,
    refresh: fetchPrediction
  };
}

function calculateHistoricalAccuracy(tasks: Task[]): number {
  if (!tasks.length) return 0;

  const accuracies = tasks
    .filter(t => t.actual_duration)
    .map(t => {
      const error = Math.abs((t.actual_duration || 0) - t.estimated_duration);
      return Math.max(0, 1 - (error / t.estimated_duration));
    });

  return accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
}