/*
  # Fix RLS and Foreign Key Constraints

  1. Changes
    - Update RLS policy for users table to allow registration
    - Add ON DELETE CASCADE to tasks foreign key constraints
    - Add ON DELETE CASCADE to time_entries foreign key constraints

  2. Security
    - Maintain RLS policies while fixing registration flow
    - Ensure data integrity with proper foreign key behavior
*/

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Enable insert for registration" ON users;

-- Create new RLS policy for registration
CREATE POLICY "Users can register"
  ON users FOR INSERT
  WITH CHECK (true);

-- Update tasks foreign key constraints
ALTER TABLE tasks
  DROP CONSTRAINT IF EXISTS tasks_assigned_to_fkey,
  DROP CONSTRAINT IF EXISTS tasks_created_by_fkey;

ALTER TABLE tasks
  ADD CONSTRAINT tasks_assigned_to_fkey
    FOREIGN KEY (assigned_to)
    REFERENCES users(id)
    ON DELETE CASCADE,
  ADD CONSTRAINT tasks_created_by_fkey
    FOREIGN KEY (created_by)
    REFERENCES users(id)
    ON DELETE CASCADE;

-- Update time_entries foreign key constraints
ALTER TABLE time_entries
  DROP CONSTRAINT IF EXISTS time_entries_task_id_fkey,
  DROP CONSTRAINT IF EXISTS time_entries_user_id_fkey;

ALTER TABLE time_entries
  ADD CONSTRAINT time_entries_task_id_fkey
    FOREIGN KEY (task_id)
    REFERENCES tasks(id)
    ON DELETE CASCADE,
  ADD CONSTRAINT time_entries_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE;