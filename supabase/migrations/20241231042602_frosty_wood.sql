-- Drop existing RLS policies for task_comments
DROP POLICY IF EXISTS "Users can read comments on accessible tasks" ON task_comments;
DROP POLICY IF EXISTS "Users can create comments" ON task_comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON task_comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON task_comments;

-- Create new RLS policies with proper access control
CREATE POLICY "Users can read all task comments"
  ON task_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments on accessible tasks"
  ON task_comments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tasks
      WHERE tasks.id = task_id
      AND (
        tasks.created_by = auth.uid() OR
        tasks.assigned_to = auth.uid()
      )
    )
  );

CREATE POLICY "Users can update their own comments"
  ON task_comments FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own comments"
  ON task_comments FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());