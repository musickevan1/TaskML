import { Check, CheckCircle2 } from 'lucide-react';

interface LogoIconProps {
  size?: number;
  className?: string;
}

export default function LogoIcon({ size = 32, className = '' }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="16" cy="16" r="14" fill="#2563EB" />
      <path
        d="M9 16L14 21L23 12"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}