import { supabase } from '../../../lib/supabase';
import { Task } from '../../../types/task';
import { TaskPrediction } from '../../../types/prediction';
import { PredictionError } from '../errors/PredictionError';
import { validateTask } from '../utils/validation';
import { generatePrediction } from '../models/predictionEngine';
import { MODEL_VERSION } from '../constants';

export async function createPrediction(task: Task): Promise<TaskPrediction> {
  try {
    validateTask(task);

    const historicalTasks = await fetchHistoricalTasks();
    if (!historicalTasks.length) {
      throw PredictionError.insufficientData();
    }

    const result = generatePrediction(task, historicalTasks);
    return await storePrediction(task.id, result);
  } catch (error) {
    if (error instanceof PredictionError) throw error;
    throw PredictionError.modelError(error);
  }
}

async function fetchHistoricalTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', 'completed')
    .not('actual_duration', 'is', null)
    .order('completed_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return data || [];
}

async function storePrediction(
  taskId: string,
  result: ReturnType<typeof generatePrediction>
): Promise<TaskPrediction> {
  const { data, error } = await supabase
    .from('ml_predictions')
    .insert([{
      task_id: taskId,
      predicted_duration: result.prediction,
      confidence_level: result.confidence,
      prediction_features: result.features,
      model_version: MODEL_VERSION
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}