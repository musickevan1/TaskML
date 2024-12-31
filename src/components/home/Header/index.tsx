import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../brand/Logo';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isVisible 
          ? 'top-0 opacity-100' 
          : '-top-20 opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-space-900/80 backdrop-blur-sm border-b border-electric-blue/10" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <Logo size="md" className="animate-[slide-in_0.3s_ease-out]" />
          </Link>
          
          <DesktopMenu />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}