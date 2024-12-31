import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import CyberButton from '../../ui/CyberButton';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-cyber-white/70 hover:text-electric-500 
                 focus:outline-none focus:ring-2 focus:ring-electric-500/50
                 transition-colors duration-200"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-space-900/95 backdrop-blur-sm 
                      border-b border-electric-500/10 animate-[slide-in_0.3s_ease-out]">
          <div className="px-4 py-8 space-y-3">
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)}
              className="block w-full"
            >
              <CyberButton 
                variant="secondary" 
                size="sm" 
                className="w-full border border-electric-500/30 hover:border-electric-500/50"
              >
                Login
              </CyberButton>
            </Link>
            <Link 
              to="/register" 
              onClick={() => setIsOpen(false)}
              className="block w-full"
            >
              <CyberButton 
                variant="primary" 
                size="sm" 
                className="w-full"
              >
                Sign Up
              </CyberButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}