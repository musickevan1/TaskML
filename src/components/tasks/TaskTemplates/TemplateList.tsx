/**
 * Component for displaying and selecting task templates
 */
import { useState } from 'react';
import { Task } from '../../../types/task';
import { templates } from './templateData';
import Badge from '../../ui/Badge';

interface TemplateListProps {
  onSelect: (template: Partial<Task>) => void;
}

export default function TemplateList({ onSelect }: TemplateListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(templates.map(t => t.category))];
  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-3 py-1.5 text-sm rounded-full whitespace-nowrap
              ${selectedCategory === category
                ? 'bg-electric-500/20 text-electric-500'
                : 'text-cyber-white/50 hover:text-cyber-white/70'}
            `}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className="text-left p-4 bg-space-800 border border-electric-500/20 
                     rounded-lg hover:border-electric-500/40 transition-all"
          >
            <h3 className="text-lg font-medium text-cyber-white mb-2">
              {template.name}
            </h3>
            <p className="text-sm text-cyber-white/70 mb-4">
              {template.description}
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="info">
                {template.category}
              </Badge>
              <span className="text-xs text-cyber-white/50">
                Est. {template.estimated_duration}h
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}