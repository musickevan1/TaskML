/**
 * Task editor component for creating and editing tasks
 * Supports markdown formatting and template selection
 */
import { useState } from 'react';
import { Task, TaskPriority } from '../../types/task';
import { Calendar, Clock, Tag, AlertTriangle } from 'lucide-react';
import FormInput from '../forms/FormInput';
import FormTextArea from '../forms/FormTextArea';
import DateTimeField from '../forms/DateTimeField';
import Badge from '../ui/Badge';

interface TaskEditorProps {
  task?: Task;
  onSave: (taskData: Partial<Task>) => Promise<void>;
  onCancel: () => void;
}

export default function TaskEditor({ task, onSave, onCancel }: TaskEditorProps) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    due_date: task?.due_date || '',
    priority: task?.priority || 'medium' as TaskPriority,
    estimated_duration: task?.estimated_duration || 0,
    tags: task?.tags || []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSave(formData);
    } catch (err) {
      setError('Failed to save task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <FormInput
        id="title"
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        placeholder="Task title"
        disabled={loading}
      />

      <FormTextArea
        id="description"
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
        rows={6}
        placeholder="Use markdown for formatting:
- Use bullets for lists
- Add ## for headings
- Include code blocks with ```"
        disabled={loading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DateTimeField
          value={formData.due_date}
          onChange={(value) => setFormData({ ...formData, due_date: value })}
          required
        />

        <div>
          <label className="block text-sm font-medium text-cyber-white mb-1">
            Priority
          </label>
          <div className="flex space-x-4">
            {(['low', 'medium', 'high'] as const).map((priority) => (
              <label
                key={priority}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  checked={formData.priority === priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
                  className="sr-only"
                  disabled={loading}
                />
                <Badge
                  variant={
                    priority === 'high' ? 'error' :
                    priority === 'medium' ? 'warning' : 'success'
                  }
                  className={`cursor-pointer transition-all ${
                    formData.priority === priority 
                      ? 'ring-2 ring-electric-500 ring-offset-2 ring-offset-space-900' 
                      : 'opacity-50 hover:opacity-75'
                  }`}
                >
                  {priority}
                </Badge>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-cyber-white/70 hover:text-cyber-white"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="cyber-button"
          disabled={loading}
        >
          {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}