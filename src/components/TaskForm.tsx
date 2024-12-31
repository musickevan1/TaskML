import { useState } from 'react';
import { NewTask } from '../types/task';
import { Calendar, Clock } from 'lucide-react';
import FormInput from './forms/FormInput';
import FormTextArea from './forms/FormTextArea';
import DateTimeField from './forms/DateTimeField';
import TaskTemplates from './tasks/TaskTemplates';
import { usePrediction } from '../hooks/usePrediction';
import { analyzeComplexity } from '../lib/ml/features/complexityAnalyzer';
import { calculateUrgency } from '../lib/ml/features/urgencyCalculator';

interface TaskFormProps {
  onSubmit: (task: NewTask) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function TaskForm({ onSubmit, onCancel, isSubmitting = false }: TaskFormProps) {
  const [task, setTask] = useState<NewTask>({
    title: '',
    description: '',
    due_date: '',
    estimated_duration: 0
  });

  const { prediction, loading: predictionLoading } = usePrediction({
    ...task,
    id: 'temp',
    status: 'todo',
    priority: 'medium',
    created_by: '',
    assigned_to: '',
    actual_duration: null
  });

  const complexity = analyzeComplexity({
    ...task,
    id: 'temp',
    status: 'todo',
    priority: 'medium',
    created_by: '',
    assigned_to: '',
    actual_duration: null
  });

  const urgency = calculateUrgency({
    ...task,
    id: 'temp',
    status: 'todo',
    priority: 'medium',
    created_by: '',
    assigned_to: '',
    actual_duration: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(task);
  };

  const handleTemplateSelect = (template: NewTask) => {
    setTask(template);
  };

  return (
    <div className="space-y-6">
      {/* Mobile-friendly templates section */}
      <div className="-mx-6 px-4 sm:mx-0 sm:px-0">
        <TaskTemplates onSelect={handleTemplateSelect} />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="title"
          label="Title"
          type="text"
          required
          maxLength={50}
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="Enter task title"
          disabled={isSubmitting}
          className="text-base sm:text-sm"
        />

        <FormTextArea
          id="description"
          label="Description"
          required
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          rows={6}
          placeholder="Add detailed description..."
          disabled={isSubmitting}
          className="text-base sm:text-sm"
        />

        <div className="grid grid-cols-1 gap-4">
          <DateTimeField
            value={task.due_date}
            onChange={(value) => setTask({ ...task, due_date: value })}
            required
          />

          <FormInput
            id="estimated_duration"
            label="Estimated Hours"
            type="number"
            icon={Clock}
            required
            min="0"
            value={task.estimated_duration}
            onChange={(e) => setTask({ ...task, estimated_duration: parseInt(e.target.value) })}
            disabled={isSubmitting}
            className="text-base sm:text-sm"
          />
        </div>

        {/* ML Insights Panel */}
        {(prediction || complexity > 0 || urgency > 0) && (
          <div className="mt-6 p-4 bg-space-800/50 rounded-lg border border-electric-500/10">
            <h4 className="text-sm font-medium text-cyber-white mb-3">AI Insights</h4>
            <div className="space-y-2">
              {prediction && (
                <div className="flex justify-between text-sm">
                  <span className="text-cyber-white/70">Predicted Duration</span>
                  <span className="text-electric-500">
                    {prediction.predicted_duration}h
                    <span className="ml-1 text-xs text-cyber-white/50">
                      ({Math.round(prediction.confidence_level * 100)}% confidence)
                    </span>
                  </span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span className="text-cyber-white/70">Complexity Score</span>
                <span className="text-electric-500">
                  {Math.round(complexity * 100)}%
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-cyber-white/70">Urgency Score</span>
                <span className="text-electric-500">
                  {Math.round(urgency * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row justify-end space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-md text-base sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2.5 border border-transparent rounded-md shadow-sm text-base sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
}