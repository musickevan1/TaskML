import { useMemo } from 'react';
import { Task } from '../types/task';
import type { TaskFilters } from '../components/tasks/TaskFilters';

export function useFilteredTasks(tasks: Task[], filters: TaskFilters) {
  return useMemo(() => {
    return tasks.filter(task => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm);
        
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }

      // Priority filter
      if (filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const taskDate = new Date(task.due_date);
        
        if (filters.dateRange.start) {
          const startDate = new Date(filters.dateRange.start);
          if (taskDate < startDate) return false;
        }
        
        if (filters.dateRange.end) {
          const endDate = new Date(filters.dateRange.end);
          if (taskDate > endDate) return false;
        }
      }

      return true;
    });
  }, [tasks, filters]);
}