import { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

export default function FormInput({ label, icon: Icon, className = '', ...props }: FormInputProps) {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-cyber-white mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-electric-500/50" />
          </div>
        )}
        <input
          {...props}
          className={`
            block w-full ${Icon ? 'pl-10' : 'px-3'} py-2
            bg-space-800 border border-electric-500/20 
            rounded-md text-cyber-white placeholder-cyber-white/30
            focus:border-electric-500/50 focus:ring-1 focus:ring-electric-500/50
            transition-all duration-200
            ${className}
          `}
        />
      </div>
    </div>
  );
}