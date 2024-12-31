import { supabase } from '../../lib/supabase';
import { Task } from '../../types/task';
import { TaskPrediction, PredictionResult } from '../../types/prediction';
import { extractTaskFeatures } from './features/taskFeatureExtractor';
import { predictDuration } from './models/durationPredictor';

const MODEL_VERSION = '1.0';

export async function generatePrediction(task: Task): Promise<TaskPrediction | null> {
  try {
    // Get historical tasks
    const { data: historicalTasks, error: historyError } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', 'completed')
      .not('actual_duration', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(50);

    if (historyError) throw historyError;

    // Generate prediction
    const features = extractTaskFeatures(task);
    const result = predictDuration(task, features, historicalTasks || []);

    // Store prediction
    const { data: prediction, error: predictionError } = await supabase
      .from('ml_predictions')
      .insert([{
        task_id: task.id,
        predicted_duration: result.prediction,
        confidence_level: result.confidence,
        prediction_features: result.features,
        model_version: MODEL_VERSION
      }])
      .select()
      .single();

    if (predictionError) throw predictionError;

    return prediction;
  } catch (error) {
    console.error('Prediction generation failed:', error);
    return null;
  }
}

export async function updateActualDuration(
  taskId: string,
  actualDuration: number
): Promise<void> {
  const { error } = await supabase
    .from('ml_predictions')
    .update({ actual_duration: actualDuration })
    .eq('task_id', taskId);

  if (error) {
    console.error('Failed to update actual duration:', error);
  }
}