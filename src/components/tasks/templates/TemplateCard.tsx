import { LucideIcon } from 'lucide-react';
import { TaskTemplate } from './types';

interface TemplateCardProps {
  template: TaskTemplate;
  onSelect: () => void;
}

export default function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const Icon = template.icon as LucideIcon;
  
  return (
    <button
      onClick={onSelect}
      className="flex flex-col w-full p-4 border rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors text-left touch-manipulation"
    >
      <div className="flex items-center mb-2">
        <Icon className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
        <span className="text-base font-medium text-gray-900">{template.name}</span>
      </div>
      <p className="text-sm text-gray-500 line-clamp-2">
        {template.description.split('\n')[0].replace('## ', '')}
      </p>
      <div className="mt-3 flex items-center">
        <span className="text-xs text-gray-400">
          Est. {template.estimatedDuration}h
        </span>
        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
          {template.category}
        </span>
      </div>
    </button>
  );
}