import { useState } from 'react';
import { NewTask } from '../../types/task';
import { taskTemplates } from './templates/templateData';
import TemplateCard from './templates/TemplateCard';

interface TaskTemplatesProps {
  onSelect: (template: NewTask) => void;
}

export default function TaskTemplates({ onSelect }: TaskTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const filteredTemplates = selectedCategory === 'all' 
    ? taskTemplates
    : taskTemplates.filter(t => t.category === selectedCategory);

  const categories = ['all', ...new Set(taskTemplates.map(t => t.category))];

  return (
    <div className="space-y-4 mb-6">
      {/* Scrollable category filters */}
      <div className="overflow-x-auto -mx-4 px-4 pb-2 flex items-center space-x-2 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Single column on mobile */}
      <div className="grid grid-cols-1 gap-3">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={() => onSelect({
              title: '',
              description: template.description,
              due_date: '',
              estimated_duration: template.estimatedDuration
            })}
          />
        ))}
      </div>
    </div>
  );
}