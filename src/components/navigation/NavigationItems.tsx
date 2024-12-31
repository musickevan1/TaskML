import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Settings, HelpCircle } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

interface NavigationItemsProps {
  isExpanded: boolean;
}

export default function NavigationItems({ isExpanded }: NavigationItemsProps) {
  const location = useLocation();

  return (
    <div className="flex-1 overflow-y-auto py-4">
      <nav className="px-2 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-3 py-3 rounded-md text-sm font-medium
                transition-colors duration-150 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-electric-500
                ${isActive
                  ? 'bg-electric-500/10 text-electric-500'
                  : 'text-cyber-white/60 hover:bg-space-700/50 hover:text-cyber-white'}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`
                flex-shrink-0 h-5 w-5 transition-colors duration-150 ease-in-out
                ${isActive ? 'text-electric-500' : 'text-cyber-white/50 group-hover:text-cyber-white/70'}
              `} />
              {isExpanded && (
                <span className="ml-3 whitespace-nowrap">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}