import { CheckCircle2 } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ variant = 'default', size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className="relative">
        <CheckCircle2 
          className={`${sizeClasses[size]} text-electric-blue transition-colors`}
          strokeWidth={2}
        />
      </div>
      {variant === 'default' && (
        <span className={`ml-2 font-cyber font-semibold tracking-tight ${
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-3xl'
        }`}>
          Task<span className="text-electric-blue">ML</span>
        </span>
      )}
    </div>
  );
}