import { supabase } from '../../lib/supabase';
import type { Task } from '../../types/task';

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      user:users!created_by(id, name, email)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchTask(taskId: string): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      user:users!created_by(id, name, email)
    `)
    .eq('id', taskId)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Task not found');
  
  return data;
}