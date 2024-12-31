import { useState } from 'react';
import { Task, TaskStatus } from '../types/task';
import { Clock, MessageSquare, Edit2 } from 'lucide-react';
import { updateTaskStatus, updateTask } from '../services/taskService';
import Badge from './ui/Badge';
import CommentList from './tasks/Comments/CommentList';
import TaskEditModal from './tasks/TaskEditModal';
import Card from './ui/Card';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: () => void;
}

export default function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      onTaskUpdate();
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const handleTaskEdit = async (taskId: string, updates: Partial<Task>) => {
    try {
      await updateTask(taskId, updates);
      onTaskUpdate();
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const toggleTask = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <>
      <div className="divide-y divide-electric-500/10">
        {tasks.map((task) => (
          <div key={task.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-space-700/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-cyber-white truncate">
                      {task.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTask(task);
                      }}
                      className="p-2 text-cyber-white/50 hover:text-electric-500 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-1 text-cyber-white/70">{task.description}</p>
                  <div className="mt-2 flex items-center text-sm text-cyber-white/50">
                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-electric-500/50" />
                    <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="ml-4 flex items-center text-cyber-white/50 hover:text-electric-500"
                    >
                      <MessageSquare className="mr-1.5 h-4 w-4" />
                      <span>Comments</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge
                    variant={
                      task.priority === 'high' ? 'error' :
                      task.priority === 'medium' ? 'warning' : 'success'
                    }
                  >
                    {task.priority}
                  </Badge>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                    className="px-2 py-1 text-sm rounded-md border bg-space-800
                             border-electric-500/20 text-cyber-white
                             focus:outline-none focus:ring-2 focus:ring-electric-500
                             transition-colors"
                  >
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {expandedTask === task.id && (
              <div className="px-4 py-4 sm:px-6 bg-space-700/30">
                <CommentList taskId={task.id} />
              </div>
            )}
          </div>
        ))}
      </div>

      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(updates) => handleTaskEdit(editingTask.id, updates)}
        />
      )}
    </>
  );
}