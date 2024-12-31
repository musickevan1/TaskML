import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { updateComment } from '../../../services/commentService';
import type { TaskComment } from '../../../types/task';
import { useAuth } from '../../../contexts/AuthContext';

interface CommentItemProps {
  comment: TaskComment;
  onCommentUpdated: () => void;
}

export default function CommentItem({ comment, onCommentUpdated }: CommentItemProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [error, setError] = useState<string | null>(null);

  const isAuthor = user?.id === comment.user_id;
  const formattedDate = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });

  const handleUpdate = async () => {
    if (!editedContent.trim()) return;
    
    try {
      await updateComment(comment.id, editedContent);
      onCommentUpdated();
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update comment');
    }
  };

  return (
    <div className="bg-space-800 border border-electric-500/10 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="font-medium text-cyber-white">
            {comment.user?.name || comment.user?.email?.split('@')[0] || 'Anonymous User'}
          </span>
          <span className="text-sm text-cyber-white/50 ml-2">
            {formattedDate}
          </span>
        </div>
        
        {isAuthor && !isEditing && (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-cyber-white/50 hover:text-electric-500 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full px-3 py-2 bg-space-700 border border-electric-500/20 
                     rounded-lg text-cyber-white placeholder-cyber-white/30
                     focus:outline-none focus:border-electric-500/50 
                     focus:shadow-neon-focus transition-all duration-300"
            rows={3}
          />
          
          {error && <p className="text-sm text-red-400">{error}</p>}
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedContent(comment.content);
              }}
              className="p-2 text-cyber-white/50 hover:text-red-400 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={handleUpdate}
              className="p-2 text-cyber-white/50 hover:text-electric-500 transition-colors"
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-cyber-white/80 whitespace-pre-wrap">{comment.content}</p>
      )}
    </div>
  );
}