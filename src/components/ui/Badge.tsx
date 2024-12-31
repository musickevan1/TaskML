interface BadgeProps {
  children: React.ReactNode;
  variant: 'success' | 'error' | 'warning' | 'info';
  className?: string;
}

export default function Badge({ children, variant, className = '' }: BadgeProps) {
  const variantClasses = {
    success: 'bg-green-500/10 text-green-400',
    error: 'bg-red-500/10 text-red-400',
    warning: 'bg-yellow-500/10 text-yellow-400',
    info: 'bg-blue-500/10 text-blue-400'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}