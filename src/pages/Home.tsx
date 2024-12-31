import { CheckCircle, Clock, Users, Shield } from 'lucide-react';
import ParticleBackground from '../components/ui/ParticleBackground';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import Footer from '../components/home/Footer';

const features = [
  {
    icon: CheckCircle,
    title: 'Smart Task Management',
    description: 'AI-powered task organization and prioritization to keep you focused on what matters most.'
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Automatic time tracking and estimation to help you better understand your productivity patterns.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Seamlessly work together with your team, assign tasks, and track progress in real-time.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security and data protection to keep your information safe and compliant.'
  }
];

const testimonials = [
  {
    quote: "TaskML has transformed how our team manages projects. It's intuitive and powerful.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp"
  },
  {
    quote: "The AI-powered insights have helped us improve our estimation accuracy by 40%.",
    author: "Michael Rodriguez",
    role: "Engineering Lead",
    company: "InnovateLabs"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-space-900">
      <ParticleBackground />
      <Header />
      <main className="pt-16"> {/* Add padding-top to account for fixed header */}
        <HeroSection />
        <Features features={features} />
        <Testimonials testimonials={testimonials} />
      </main>
      <Footer />
    </div>
  );
}