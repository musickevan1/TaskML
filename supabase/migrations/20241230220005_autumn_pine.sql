/*
  # Fix Users Table RLS Policies

  1. Changes
    - Add policy to allow inserting new users during registration
    - Keep existing policies for reading and updating

  2. Security
    - Users can only be created during registration
    - Maintains existing read/update restrictions
*/

CREATE POLICY "Enable insert for registration"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);