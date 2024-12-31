import MobileMenu from './Header/MobileMenu';
import DesktopMenu from './Header/DesktopMenu';
import Logo from '../brand/Logo';

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 bg-space-900/80 backdrop-blur-sm border-b border-electric-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo size="md" />
          <DesktopMenu />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}