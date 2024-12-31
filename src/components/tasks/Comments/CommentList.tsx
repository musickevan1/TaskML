/**
 * CommentList component displays and manages comments for a task
 */
import { useEffect, useState } from 'react';
import { fetchComments } from '../../../services/commentService';
import type { TaskComment } from '../../../types/task';
import CommentItem from './CommentItem';
import NewCommentForm from './NewCommentForm';
import Card from '../../ui/Card';

interface CommentListProps {
  taskId: string;
  onCommentCountChange?: (count: number) => void;
}

export default function CommentList({ taskId, onCommentCountChange }: CommentListProps) {
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchComments(taskId);
      setComments(data);
      onCommentCountChange?.(data.length);
    } catch (err) {
      setError('Failed to load comments');
      console.error('Error loading comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [taskId]);

  const handleCommentAdded = async () => {
    await loadComments();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-electric-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-sm py-2">{error}</div>
    );
  }

  return (
    <div className="space-y-4">
      <NewCommentForm taskId={taskId} onCommentAdded={handleCommentAdded} />
      
      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment}
              onCommentUpdated={loadComments}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-6">
          <p className="text-cyber-white/50">No comments yet</p>
        </Card>
      )}
    </div>
  );
}