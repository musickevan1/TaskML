import { useState } from 'react';
import { Task } from '../../types/task';
import { X } from 'lucide-react';
import FormInput from '../forms/FormInput';
import FormTextArea from '../forms/FormTextArea';
import DateTimeField from '../forms/DateTimeField';

interface TaskEditModalProps {
  task: Task;
  onClose: () => void;
  onSave: (updates: Partial<Task>) => Promise<void>;
}

export default function TaskEditModal({ task, onClose, onSave }: TaskEditModalProps) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    due_date: task.due_date,
    priority: task.priority,
    estimated_duration: task.estimated_duration
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-space-900/80 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-space-800 rounded-lg shadow-neon w-full max-w-2xl">
          <div className="flex items-center justify-between p-4 border-b border-electric-500/20">
            <h2 className="text-lg font-medium text-cyber-white">Edit Task</h2>
            <button
              onClick={onClose}
              className="p-2 text-cyber-white/70 hover:text-cyber-white rounded-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <FormInput
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              disabled={loading}
            />

            <FormTextArea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={6}
              disabled={loading}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DateTimeField
                value={formData.due_date}
                onChange={(value) => setFormData({ ...formData, due_date: value })}
                required
              />

              <FormInput
                label="Estimated Hours"
                type="number"
                value={formData.estimated_duration}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  estimated_duration: parseInt(e.target.value) 
                })}
                required
                min={0}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cyber-white mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  priority: e.target.value as Task['priority']
                })}
                className="w-full bg-space-800 border border-electric-500/20 rounded-md px-3 py-2 
                         text-cyber-white focus:border-electric-500/50 focus:ring-1 
                         focus:ring-electric-500/50"
                disabled={loading}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
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
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}