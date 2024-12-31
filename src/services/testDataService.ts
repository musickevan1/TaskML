/**
 * Service for populating test data in the application.
 * For development and testing purposes only.
 */
import { supabase } from '../lib/supabase';
import { testTasks } from '../data/testTasks';
import type { NewTask } from '../types/task';

/**
 * Populates the database with test tasks
 * @param userId - ID of the user to associate tasks with
 */
export async function populateTestTasks(userId: string): Promise<void> {
  try {
    for (const task of testTasks) {
      const newTask: NewTask = {
        ...task,
        created_by: userId,
        assigned_to: userId,
        status: 'todo'
      };

      const { error } = await supabase
        .from('tasks')
        .insert([newTask]);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error populating test tasks:', error);
    throw error;
  }
}