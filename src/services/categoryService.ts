import { supabase } from '../lib/supabase';
import type { TaskCategory } from '../types/task';

export async function fetchCategories(): Promise<TaskCategory[]> {
  const { data, error } = await supabase
    .from('task_categories')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function createCategory(name: string, color: string): Promise<TaskCategory> {
  const { data, error } = await supabase
    .from('task_categories')
    .insert([{ name, color }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function assignCategories(taskId: string, categoryIds: string[]): Promise<void> {
  const { error: deleteError } = await supabase
    .from('task_category_assignments')
    .delete()
    .eq('task_id', taskId);

  if (deleteError) throw deleteError;

  if (categoryIds.length > 0) {
    const assignments = categoryIds.map(categoryId => ({
      task_id: taskId,
      category_id: categoryId
    }));

    const { error: insertError } = await supabase
      .from('task_category_assignments')
      .insert(assignments);

    if (insertError) throw insertError;
  }
}