// Core prediction types
export interface TaskPrediction {
  prediction_id: string;
  task_id: string;
  predicted_duration: number;
  confidence_level: number;
  actual_duration?: number;
  prediction_features: PredictionFeatures;
  model_version: string;
  created_at: string;
  updated_at: string;
}

// Feature-related types
export interface PredictionFeatures {
  complexity: number;
  urgency: number;
  similarity: number;
  contextual_factors: ContextualFactors;
}

export interface ContextualFactors {
  team_velocity?: number;
  historical_accuracy?: number;
  seasonal_patterns?: number;
}

// Prediction results
export interface PredictionResult {
  prediction: number;
  confidence: number;
  features: PredictionFeatures;
  metadata: PredictionMetadata;
}

export interface PredictionMetadata {
  model_version: string;
  timestamp: string;
  sample_size: number;
}