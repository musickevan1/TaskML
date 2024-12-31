import { formatDistanceToNow } from 'date-fns';
import { History } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTaskHistory } from '../../services/taskService';

interface TaskHistoryProps {
  taskId: string;
}

export default function TaskHistory({ taskId }: TaskHistoryProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getTaskHistory(taskId);
        setHistory(data);
      } catch (err) {
        setError('Failed to load history');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [taskId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-electric-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-400">
        {error}
      </div>
    );
  }

  if (!history.length) {
    return (
      <div className="text-center py-8 text-cyber-white/50">
        No changes recorded yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((entry) => (
        <div 
          key={entry.id}
          className="border-l-2 border-electric-500/30 pl-4 py-2"
        >
          <div className="flex items-center text-sm text-cyber-white/70 mb-2">
            <History className="h-4 w-4 mr-2" />
            <span className="font-medium">
              {entry.user?.name || entry.user?.email?.split('@')[0] || 'Unknown User'}
            </span>
            <span className="mx-2">•</span>
            <span>
              {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
            </span>
          </div>

          <div className="space-y-2">
            {entry.changes.map((change: any, index: number) => (
              <div key={index} className="text-sm">
                <span className="text-cyber-white/50">{change.field}:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded-full line-through">
                    {change.old_value}
                  </span>
                  <span className="text-cyber-white/30">→</span>
                  <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full">
                    {change.new_value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}