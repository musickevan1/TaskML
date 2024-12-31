import { Link } from 'react-router-dom';
import CyberButton from '../ui/CyberButton';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">
          Task Management
          <span className="block text-electric-500">Reimagined</span>
        </h1>
        
        <p className="text-xl text-cyber-white/80 mb-12 max-w-2xl mx-auto">
          Harness the power of AI to streamline your workflow, boost productivity,
          and achieve more with less effort.
        </p>

        <div className="space-x-4">
          <Link to="/register">
            <CyberButton size="lg">
              Get Started Free
            </CyberButton>
          </Link>
        </div>

        <div className="mt-16">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800"
            alt="Dashboard Preview"
            className="rounded-lg shadow-neon mx-auto max-w-full"
            style={{ maxHeight: '60vh' }}
          />
        </div>
      </div>
    </section>
  );
}