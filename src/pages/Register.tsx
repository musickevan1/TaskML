import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/brand/Logo';
import ParticleBackground from '../components/ui/ParticleBackground';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, name);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-900 py-12 px-4 sm:px-6 lg:px-8">
      <ParticleBackground />
      <div className="max-w-md w-full space-y-8">
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 rounded-md
                   bg-space-800 border border-electric-500/20 
                   text-electric-500 hover:text-electric-400
                   hover:bg-space-700 hover:border-electric-500/30
                   transition-all duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

        <div className="flex flex-col items-center">
          <Logo size="lg" className="animate-float" />
          <h2 className="mt-6 text-3xl font-bold text-cyber-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-cyber-white/70">
            Join thousands of teams using TaskML
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-500/10 border border-red-500/20 p-4">
              <div className="text-sm text-red-400">{error}</div>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 bg-space-800 border border-electric-blue/20 placeholder-cyber-white/50 text-cyber-white focus:outline-none focus:ring-electric-blue focus:border-electric-blue focus:z-10 sm:text-sm"
                placeholder="Full name"
              />
            </div>
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 bg-space-800 border border-electric-blue/20 placeholder-cyber-white/50 text-cyber-white focus:outline-none focus:ring-electric-blue focus:border-electric-blue focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 bg-space-800 border border-electric-blue/20 placeholder-cyber-white/50 text-cyber-white focus:outline-none focus:ring-electric-blue focus:border-electric-blue focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="cyber-button w-full"
            >
              Sign up
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <Link
            to="/login"
            className="font-medium text-electric-blue hover:text-electric-blue/80 transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}