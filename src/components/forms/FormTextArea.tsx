import { TextareaHTMLAttributes } from 'react';

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function FormTextArea({ label, className = '', ...props }: FormTextAreaProps) {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-cyber-white mb-1">
        {label}
      </label>
      <textarea
        {...props}
        className={`
          mt-1 block w-full rounded-md
          bg-space-800 border border-electric-500/20 
          text-cyber-white placeholder-cyber-white/30
          focus:border-electric-500/50 focus:ring-1 focus:ring-electric-500/50
          transition-all duration-200
          ${className}
        `}
      />
    </div>
  );
}