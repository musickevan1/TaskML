import { supabase } from '../../lib/supabase';
import type { Task, NewTask, TaskStatus } from '../../types/task';

export async function createTask(task: NewTask, userId: string): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{
      ...task,
      created_by: userId,
      assigned_to: userId,
      status: 'todo'
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', taskId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTaskStatus(taskId: string, status: TaskStatus): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .update({ 
      status,
      completed_at: status === 'completed' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    })
    .eq('id', taskId);

  if (error) throw error;
}

export async function deleteTask(taskId: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

  if (error) throw error;
}