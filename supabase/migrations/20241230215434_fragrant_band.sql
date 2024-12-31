/*
  # Initial Schema Setup for Task Management System

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `role` (text)
      - `created_at` (timestamp)
    
    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `status` (text)
      - `priority` (text)
      - `due_date` (timestamp)
      - `created_at` (timestamp)
      - `completed_at` (timestamp)
      - `assigned_to` (uuid, foreign key)
      - `estimated_duration` (integer)
      - `actual_duration` (integer)
    
    - `time_entries`
      - `id` (uuid, primary key)
      - `task_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `start_time` (timestamp)
      - `end_time` (timestamp)
      - `duration` (integer)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'completed')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date timestamptz,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  assigned_to uuid REFERENCES users(id),
  estimated_duration integer,
  actual_duration integer,
  created_by uuid REFERENCES users(id) DEFAULT auth.uid()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update assigned tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = assigned_to OR
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Time entries table
CREATE TABLE IF NOT EXISTS time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) NOT NULL,
  user_id uuid REFERENCES users(id) DEFAULT auth.uid(),
  start_time timestamptz NOT NULL DEFAULT now(),
  end_time timestamptz,
  duration integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their time entries"
  ON time_entries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  ));

CREATE POLICY "Users can create their time entries"
  ON time_entries FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their time entries"
  ON time_entries FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());