import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { useNavigation } from './navigation/NavigationContext';
import useMediaQuery from '../hooks/useMediaQuery';
import Logo from './brand/Logo';

export default function Navbar() {
  const { signOut } = useAuth();
  const { isOpen } = useNavigation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <nav className="bg-space-800 border-b border-electric-500/10 fixed top-0 right-0 left-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/dashboard" 
              className={`${isMobile ? 'ml-12' : ''} hover:opacity-90 transition-opacity`}
            >
              <Logo size={isMobile ? 'sm' : 'md'} />
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut()}
              className="inline-flex items-center px-3 py-2 border border-electric-500/20 
                       text-sm leading-4 font-medium rounded-md text-cyber-white/70 
                       hover:text-electric-500 hover:border-electric-500/40 
                       focus:outline-none focus:ring-2 focus:ring-electric-500 
                       transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}