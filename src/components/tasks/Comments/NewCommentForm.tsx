import { useState } from 'react';
import { Send } from 'lucide-react';
import { createComment } from '../../../services/commentService';

interface NewCommentFormProps {
  taskId: string;
  onCommentAdded: () => void;
}

export default function NewCommentForm({ taskId, onCommentAdded }: NewCommentFormProps) {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await createComment(taskId, content);
      setContent('');
      onCommentAdded();
    } catch (err) {
      setError('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
          disabled={isSubmitting}
          className="w-full px-3 py-2 pr-10 bg-space-800 border border-electric-500/20 
                   rounded-lg text-cyber-white placeholder-cyber-white/30
                   focus:outline-none focus:border-electric-500/50 
                   focus:shadow-neon-focus transition-all duration-300
                   disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="absolute right-2 bottom-2 p-2 text-cyber-white/50 
                   hover:text-electric-500 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </form>
  );
}