import { Outlet } from 'react-router-dom';
import { NavigationProvider } from './navigation/NavigationContext';
import NavigationMenu from './navigation/NavigationMenu';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <NavigationProvider>
      <div className="min-h-screen bg-space-900">
        <Navbar />
        <NavigationMenu />
        <main className="md:ml-16 lg:ml-64 pt-16 p-6 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </NavigationProvider>
  );
}