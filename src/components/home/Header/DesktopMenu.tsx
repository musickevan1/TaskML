import { Link } from 'react-router-dom';
import CyberButton from '../../ui/CyberButton';

export default function DesktopMenu() {
  return (
    <nav className="hidden md:flex items-center space-x-3">
      <Link to="/login">
        <CyberButton 
          variant="secondary" 
          size="sm"
          className="border border-electric-500/30 hover:border-electric-500/50"
        >
          Login
        </CyberButton>
      </Link>
      <Link to="/register">
        <CyberButton 
          variant="primary" 
          size="sm"
        >
          Sign Up
        </CyberButton>
      </Link>
    </nav>
  );
}