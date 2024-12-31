import { ReactNode } from 'react';

interface ToggleGroupProps {
  label?: string;
  description?: string;
  children: ReactNode;
}

export function ToggleGroup({ label, description, children }: ToggleGroupProps) {
  return (
    <div className="space-y-6">
      {(label || description) && (
        <div>
          {label && (
            <h3 className="text-lg font-medium text-gray-900">{label}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}