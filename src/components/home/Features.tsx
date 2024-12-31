import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesProps {
  features: Feature[];
}

export default function Features({ features }: FeaturesProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="text-center p-6 bg-space-800/50 rounded-lg backdrop-blur-sm
                         border border-electric-blue/10 hover:border-electric-blue/30
                         transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 
                              rounded-full bg-space-700 mb-4 group-hover:shadow-neon
                              transition-all duration-300">
                  <Icon className="h-6 w-6 text-electric-blue" />
                </div>
                <h3 className="text-lg font-semibold text-cyber-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-cyber-white/70">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}