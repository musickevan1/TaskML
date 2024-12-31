-- Task History table for tracking changes
CREATE TABLE IF NOT EXISTS task_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  changes jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE task_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read history for accessible tasks"
  ON task_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tasks
      WHERE tasks.id = task_id
      AND (tasks.created_by = auth.uid() OR tasks.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Users can create history entries for accessible tasks"
  ON task_history FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tasks
      WHERE tasks.id = task_id
      AND (tasks.created_by = auth.uid() OR tasks.assigned_to = auth.uid())
    )
  );

-- Add task_version column to tasks table
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS version integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Create function to update version on task changes
CREATE OR REPLACE FUNCTION update_task_version()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version := OLD.version + 1;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update version
CREATE TRIGGER update_task_version_trigger
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_task_version();