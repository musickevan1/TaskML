import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { TaskPrediction } from '../types/prediction';
import { createPrediction } from '../lib/ml/services/predictionService';
import { PredictionError } from '../lib/ml/errors/PredictionError';

interface PredictionState {
  prediction: TaskPrediction | null;
  loading: boolean;
  error: string | null;
}

export function usePrediction(task: Task) {
  const [state, setState] = useState<PredictionState>({
    prediction: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    async function fetchPrediction() {
      if (!task.id) return;

      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const prediction = await createPrediction(task);
        if (mounted) {
          setState({ prediction, loading: false, error: null });
        }
      } catch (error) {
        if (!mounted) return;

        const message = error instanceof PredictionError
          ? error.message
          : 'Failed to generate prediction';

        setState(prev => ({
          ...prev,
          loading: false,
          error: message
        }));
      }
    }

    fetchPrediction();
    return () => { mounted = false; };
  }, [task.id]);

  return state;
}