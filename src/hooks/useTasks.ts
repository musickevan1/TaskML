import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { fetchTasks as fetchTasksService } from '../services/taskService';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasksService();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, refetchTasks: fetchTasks };
}