import { supabase } from '../../lib/supabase';
import type { Task } from '../../types/task';

export async function getTaskHistory(taskId: string) {
  const { data, error } = await supabase
    .from('task_history')
    .select(`
      *,
      user:users(id, name, email)
    `)
    .eq('task_id', taskId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createHistoryEntry(
  taskId: string,
  changes: Record<string, { old: any; new: any }>
) {
  const formattedChanges = Object.entries(changes).map(([field, values]) => ({
    field,
    old_value: values.old,
    new_value: values.new
  }));

  const { error } = await supabase
    .from('task_history')
    .insert([{
      task_id: taskId,
      changes: formattedChanges
    }]);

  if (error) throw error;
}