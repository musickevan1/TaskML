import { ClipboardList, Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateTask: () => void;
}

export default function EmptyState({ onCreateTask }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new task</p>
      <div className="mt-6">
        <button
          onClick={onCreateTask}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </button>
      </div>
    </div>
  );
}