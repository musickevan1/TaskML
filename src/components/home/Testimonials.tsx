interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-20 bg-space-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-cyber-white mb-12">
          Trusted by Teams Worldwide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-space-700/50 p-8 rounded-lg border border-electric-blue/10
                       hover:border-electric-blue/30 transition-all duration-300
                       hover:shadow-neon"
            >
              <p className="text-cyber-white/90 mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="font-medium text-cyber-white">{testimonial.author}</p>
                <p className="text-sm text-cyber-white/70">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}