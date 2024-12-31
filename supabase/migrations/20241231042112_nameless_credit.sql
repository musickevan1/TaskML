/*
  # ML Predictions Schema
  
  1. New Tables
    - ml_predictions: Stores task duration predictions and validation data
  
  2. Security
    - Enable RLS
    - Add policies for secure data access
*/

CREATE TABLE IF NOT EXISTS ml_predictions (
  prediction_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  predicted_duration integer NOT NULL,
  confidence_level float NOT NULL CHECK (confidence_level >= 0 AND confidence_level <= 1),
  actual_duration integer,
  prediction_features jsonb NOT NULL DEFAULT '{}'::jsonb,
  model_version text NOT NULL DEFAULT '1.0',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ml_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read predictions for their tasks"
  ON ml_predictions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tasks
      WHERE tasks.id = task_id
      AND (tasks.created_by = auth.uid() OR tasks.assigned_to = auth.uid())
    )
  );