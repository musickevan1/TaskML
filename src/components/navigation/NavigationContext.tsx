import { createContext, useContext, useState, useCallback } from 'react';

interface NavigationContextType {
  isOpen: boolean;
  isExpanded: boolean;
  toggleMenu: () => void;
  toggleExpanded: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const toggleExpanded = useCallback(() => setIsExpanded(prev => !prev), []);

  return (
    <NavigationContext.Provider value={{ isOpen, isExpanded, toggleMenu, toggleExpanded }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}