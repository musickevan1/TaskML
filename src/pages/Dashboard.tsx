import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date: string;
}

interface TaskMetrics {
  total: number;
  completed: number;
  overdue: number;
}

interface TaskStatusData {
  name: string;
  count: number;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [metrics, setMetrics] = useState<TaskMetrics>({ total: 0, completed: 0, overdue: 0 });
  const [tasksByStatus, setTasksByStatus] = useState<TaskStatusData[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tasks:', error);
        return;
      }

      if (data) {
        setTasks(data);
        
        const completed = data.filter(task => task.status === 'completed').length;
        const overdue = data.filter(task => {
          return task.status !== 'completed' && 
                 task.due_date && 
                 new Date(task.due_date) < new Date();
        }).length;

        setMetrics({
          total: data.length,
          completed,
          overdue
        });

        const statusCount = data.reduce((acc: Record<string, number>, task) => {
          acc[task.status] = (acc[task.status] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.entries(statusCount).map(([status, count]) => ({
          name: status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1),
          count
        }));

        setTasksByStatus(formattedData);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-cyber-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover={false}>
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-electric-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-cyber-white/70">Total Tasks</p>
              <p className="text-2xl font-semibold text-cyber-white">{metrics.total}</p>
            </div>
          </div>
        </Card>
        
        <Card hover={false}>
          <div className="flex items-center">
            <CheckCircle2 className="h-8 w-8 text-electric-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-cyber-white/70">Completed</p>
              <p className="text-2xl font-semibold text-cyber-white">{metrics.completed}</p>
            </div>
          </div>
        </Card>
        
        <Card hover={false}>
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-electric-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-cyber-white/70">Overdue</p>
              <p className="text-2xl font-semibold text-cyber-white">{metrics.overdue}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-medium text-cyber-white mb-4">Tasks by Status</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tasksByStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
              <XAxis dataKey="name" stroke="#f0f7ff" />
              <YAxis stroke="#f0f7ff" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#141537',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#f0f7ff' }}
              />
              <Bar dataKey="count" fill="#00f0ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <div className="px-6 py-4 border-b border-electric-500/10">
          <h2 className="text-lg font-medium text-cyber-white">Recent Tasks</h2>
        </div>
        <div className="divide-y divide-electric-500/10">
          {tasks.slice(0, 5).map((task) => (
            <div key={task.id} className="px-6 py-4 hover:bg-space-700/30 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyber-white">{task.title}</p>
                  <p className="text-sm text-cyber-white/50">
                    Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${task.priority === 'high'
                      ? 'bg-red-500/10 text-red-400'
                      : task.priority === 'medium'
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'bg-green-500/10 text-green-400'}
                  `}>
                    {task.priority}
                  </span>
                  <span className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${task.status === 'completed'
                      ? 'bg-green-500/10 text-green-400'
                      : task.status === 'in_progress'
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-gray-500/10 text-gray-400'}
                  `}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}