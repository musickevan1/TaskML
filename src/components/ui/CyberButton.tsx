import { ButtonHTMLAttributes } from 'react';

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export default function CyberButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: CyberButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-electric-500/10 border border-electric-500/30 text-electric-500 hover:bg-electric-500/20 hover:border-electric-500/50',
    secondary: 'bg-transparent border border-electric-500/20 text-electric-500/80 hover:text-electric-500 hover:border-electric-500/40'
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-md
        font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-electric-500/50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}