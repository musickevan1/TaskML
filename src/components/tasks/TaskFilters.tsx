import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { TaskStatus, TaskPriority } from '../../types/task';
import Input from '../ui/Input';
import CyberButton from '../ui/CyberButton';

interface TaskFiltersProps {
  onFilterChange: (filters: TaskFilters) => void;
}

export interface TaskFilters {
  search: string;
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  dateRange: {
    start: string;
    end: string;
  };
}

const initialFilters: TaskFilters = {
  search: '',
  status: 'all',
  priority: 'all',
  dateRange: {
    start: '',
    end: ''
  }
};

export default function TaskFilters({ onFilterChange }: TaskFiltersProps) {
  const [filters, setFilters] = useState<TaskFilters>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (newFilters: Partial<TaskFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            className="pl-10"
            icon={Search}
          />
        </div>
        <CyberButton
          onClick={() => setShowFilters(!showFilters)}
          variant="secondary"
          size="sm"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </CyberButton>
        {(filters.status !== 'all' || filters.priority !== 'all' || filters.dateRange.start || filters.dateRange.end) && (
          <CyberButton
            onClick={clearFilters}
            variant="secondary"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </CyberButton>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-space-800 rounded-lg border border-electric-500/10">
          <div>
            <label className="block text-sm font-medium text-cyber-white mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange({ status: e.target.value as TaskStatus | 'all' })}
              className="w-full bg-space-700 border border-electric-500/20 rounded-md px-3 py-2 text-cyber-white focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20"
            >
              <option value="all">All</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-cyber-white mb-1">
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange({ priority: e.target.value as TaskPriority | 'all' })}
              className="w-full bg-space-700 border border-electric-500/20 rounded-md px-3 py-2 text-cyber-white focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20"
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-cyber-white mb-1">
                Due Date Range
              </label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleFilterChange({
                  dateRange: { ...filters.dateRange, start: e.target.value }
                })}
                className="w-full bg-space-700 border border-electric-500/20 rounded-md px-3 py-2 text-cyber-white focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20"
              />
            </div>
            <div>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleFilterChange({
                  dateRange: { ...filters.dateRange, end: e.target.value }
                })}
                className="w-full bg-space-700 border border-electric-500/20 rounded-md px-3 py-2 text-cyber-white focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}