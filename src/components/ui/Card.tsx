interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div 
      className={`
        bg-space-800 border border-electric-500/10 rounded-lg p-6 
        ${hover ? 'hover:shadow-neon hover:border-electric-500/20' : ''}
        transition-all duration-300 
        ${className}
      `}
    >
      {children}
    </div>
  );
}