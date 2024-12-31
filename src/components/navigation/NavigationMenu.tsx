import { useEffect, useRef } from 'react';
import { useNavigation } from './NavigationContext';
import NavigationItems from './NavigationItems';
import { Menu } from 'lucide-react';
import useSwipe from '../../hooks/useSwipe';
import useMediaQuery from '../../hooks/useMediaQuery';
import Logo from '../brand/Logo';

export default function NavigationMenu() {
  const { isOpen, isExpanded, toggleMenu } = useNavigation();
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
    onSwipeLeft: () => isMobile && toggleMenu(),
    onSwipeRight: () => isMobile && toggleMenu(),
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        toggleMenu();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, toggleMenu]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        toggleMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen, toggleMenu]);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden fixed top-0 left-0 z-50 p-4 text-cyber-white/70 
                   hover:text-electric-500 focus:outline-none focus:ring-2 
                   focus:ring-inset focus:ring-electric-500 transition-colors"
          aria-expanded={isOpen}
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-space-900/80 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        />
      )}

      <div
        ref={menuRef}
        role="navigation"
        aria-label="Main navigation"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`
          fixed top-0 left-0 h-full bg-space-800 border-r border-electric-500/10
          z-40 transition-all duration-300 ease-in-out shadow-neon
          ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''}
          ${!isMobile && !isExpanded ? 'w-16' : 'w-64'}
        `}
      >
        <div className="h-16 flex items-center px-4">
          <Logo variant={!isMobile && !isExpanded ? 'compact' : 'default'} size="sm" />
        </div>

        <NavigationItems isExpanded={!isMobile ? isExpanded : true} />
      </div>
    </>
  );
}