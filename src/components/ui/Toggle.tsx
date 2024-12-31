import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface ToggleProps {
  label: string;
  description?: string;
  icon?: LucideIcon;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Toggle({
  label,
  description,
  icon: Icon,
  checked,
  onChange,
  disabled = false,
  size = 'md'
}: ToggleProps) {
  const [isFocused, setIsFocused] = useState(false);

  const sizes = {
    sm: {
      toggle: 'w-8 h-4',
      circle: 'h-3 w-3',
      translate: 'translate-x-4',
    },
    md: {
      toggle: 'w-11 h-6',
      circle: 'h-5 w-5',
      translate: 'translate-x-5',
    },
    lg: {
      toggle: 'w-14 h-7',
      circle: 'h-6 w-6',
      translate: 'translate-x-7',
    },
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        {Icon && (
          <Icon className={`
            flex-shrink-0 mt-0.5
            ${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'}
            ${checked ? 'text-blue-500' : 'text-gray-400'}
            transition-colors duration-200
          `} />
        )}
        <div>
          <div className="flex items-center gap-2">
            <span className={`
              font-medium
              ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'}
              ${disabled ? 'text-gray-400' : 'text-gray-900'}
            `}>
              {label}
            </span>
          </div>
          {description && (
            <p className={`
              mt-1 text-gray-500
              ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}
              ${disabled && 'text-gray-400'}
            `}>
              {description}
            </p>
          )}
        </div>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => !disabled && onChange(!checked)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className={`
          relative inline-flex shrink-0 
          ${sizes[size].toggle}
          cursor-pointer rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out
          ${checked ? 'bg-blue-600' : 'bg-gray-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'}
          ${isFocused ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
          focus:outline-none
        `}
      >
        <span
          className={`
            pointer-events-none
            ${sizes[size].circle}
            rounded-full bg-white shadow transform ring-0
            transition duration-200 ease-in-out
            ${checked ? sizes[size].translate : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}