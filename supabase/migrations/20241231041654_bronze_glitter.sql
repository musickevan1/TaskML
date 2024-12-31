/*
  # ML and Analytics Schema Enhancement
  
  1. New Tables
    - ml_models: Stores ML model metadata and performance metrics
    - task_analytics: Stores task-specific analytics and predictions
    - workflow_patterns: Captures recurring workflow patterns
  
  2. Security
    - Enable RLS on all tables
    - Add policies for secure data access
    
  3. Changes
    - Add ML-related columns to existing tasks table
*/

-- ML Models table
CREATE TABLE IF NOT EXISTS ml_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_type text NOT NULL CHECK (model_type IN ('priority', 'workload', 'burnout', 'categorization')),
  version text NOT NULL,
  training_date timestamptz DEFAULT now(),
  performance_metrics jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ml_models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read ML models"
  ON ml_models FOR SELECT
  TO authenticated
  USING (true);

-- Task Analytics table
CREATE TABLE IF NOT EXISTS task_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  predicted_duration integer,
  actual_duration integer,
  confidence_score float CHECK (confidence_score >= 0 AND confidence_score <= 1),
  prediction_features jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE task_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read analytics for accessible tasks"
  ON task_analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tasks
      WHERE tasks.id = task_id
      AND (tasks.created_by = auth.uid() OR tasks.assigned_to = auth.uid())
    )
  );

-- Workflow Patterns table
CREATE TABLE IF NOT EXISTS workflow_patterns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern_name text NOT NULL,
  pattern_type text NOT NULL,
  frequency integer DEFAULT 0,
  success_rate float CHECK (success_rate >= 0 AND success_rate <= 1),
  pattern_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE workflow_patterns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read workflow patterns"
  ON workflow_patterns FOR SELECT
  TO authenticated
  USING (true);

-- Add ML-related columns to tasks table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tasks' AND column_name = 'ml_predictions'
  ) THEN
    ALTER TABLE tasks
    ADD COLUMN ml_predictions jsonb DEFAULT '{}'::jsonb,
    ADD COLUMN complexity_score float;
  END IF;
END $$;