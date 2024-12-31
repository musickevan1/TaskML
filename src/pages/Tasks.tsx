import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus } from 'lucide-react';
import { createTask } from '../services/taskService';
import { useTasks } from '../hooks/useTasks';
import { useFilteredTasks } from '../hooks/useFilteredTasks';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilters, { TaskFilters as TaskFiltersType } from '../components/tasks/TaskFilters';
import EmptyState from './tasks/EmptyState';
import Card from '../components/ui/Card';
import CyberButton from '../components/ui/CyberButton';
import type { NewTask } from '../types/task';

const initialFilters: TaskFiltersType = {
  search: '',
  status: 'all',
  priority: 'all',
  dateRange: {
    start: '',
    end: ''
  }
};

export default function Tasks() {
  const { user } = useAuth();
  const { tasks, loading, error: fetchError, refetchTasks } = useTasks();
  const [filters, setFilters] = useState<TaskFiltersType>(initialFilters);
  const filteredTasks = useFilteredTasks(tasks, filters);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTask = async (newTask: NewTask) => {
    if (!user) {
      setError('You must be logged in to create tasks');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await createTask(newTask, user.id);
      setShowNewTaskForm(false);
      refetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-electric-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyber-white">Tasks</h1>
        <CyberButton onClick={() => setShowNewTaskForm(true)} size="md">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </CyberButton>
      </div>

      {(error || fetchError) && (
        <div className="rounded-md bg-red-500/10 border border-red-500/20 p-4">
          <div className="text-sm text-red-400">{error || fetchError}</div>
        </div>
      )}

      {showNewTaskForm && (
        <Card>
          <h2 className="text-lg font-medium text-cyber-white mb-4">Create New Task</h2>
          <TaskForm 
            onSubmit={handleCreateTask}
            onCancel={() => setShowNewTaskForm(false)}
            isSubmitting={isSubmitting}
          />
        </Card>
      )}

      <TaskFilters onFilterChange={setFilters} />

      {tasks.length === 0 ? (
        <EmptyState onCreateTask={() => setShowNewTaskForm(true)} />
      ) : filteredTasks.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-cyber-white/50">No tasks match your filters</p>
          <button
            onClick={() => setFilters(initialFilters)}
            className="mt-2 text-electric-500 hover:text-electric-400"
          >
            Clear filters
          </button>
        </Card>
      ) : (
        <Card>
          <TaskList tasks={filteredTasks} onTaskUpdate={refetchTasks} />
        </Card>
      )}
    </div>
  );
}