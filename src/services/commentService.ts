/**
 * Service for managing task comments.
 * Handles comment CRUD operations with the Supabase backend.
 * 
 * @module commentService
 */
import { supabase } from '../lib/supabase';
import type { TaskComment } from '../types/task';

/**
 * Fetches comments for a specific task
 * 
 * @param {string} taskId - ID of the task to fetch comments for
 * @returns {Promise<TaskComment[]>} Array of comments
 * @throws {Error} If the database query fails
 */
export async function fetchComments(taskId: string): Promise<TaskComment[]> {
  const { data, error } = await supabase
    .from('task_comments')
    .select(`
      *,
      user:users(id, name, email)
    `)
    .eq('task_id', taskId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Creates a new comment for a task
 * 
 * @param {string} taskId - ID of the task to comment on
 * @param {string} content - Content of the comment
 * @returns {Promise<TaskComment>} Created comment
 * @throws {Error} If user is not authenticated or database operation fails
 */
export async function createComment(taskId: string, content: string): Promise<TaskComment> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const { data, error } = await supabase
    .from('task_comments')
    .insert([{ 
      task_id: taskId, 
      content,
      user_id: user.id
    }])
    .select(`
      *,
      user:users(id, name, email)
    `)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Updates an existing comment
 * 
 * @param {string} commentId - ID of the comment to update
 * @param {string} content - New content for the comment
 * @throws {Error} If the database operation fails
 */
export async function updateComment(commentId: string, content: string): Promise<void> {
  const { error } = await supabase
    .from('task_comments')
    .update({ 
      content, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', commentId);

  if (error) throw error;
}