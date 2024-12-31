import { supabase } from '../lib/supabase';

export async function createUser(userId: string, email: string, name: string) {
  try {
    // First check if user already exists to prevent duplicate entries
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (existingUser) {
      return; // User already exists, no need to create
    }

    const { error } = await supabase
      .from('users')
      .insert([{ id: userId, email, name }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}