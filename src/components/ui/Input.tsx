import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-cyber-white/80">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-3 py-2 bg-space-800 border border-electric-500/20 
          rounded-lg text-cyber-white placeholder-cyber-white/30
          focus:outline-none focus:border-electric-500/50 
          focus:shadow-neon-focus transition-all duration-300
          ${error ? 'border-red-500/50' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}