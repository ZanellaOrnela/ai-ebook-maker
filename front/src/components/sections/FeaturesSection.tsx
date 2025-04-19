import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const features: Feature[] = [
  {
    title: "Generación de Ideas",
    description: "Obtén inspiración instantánea y conceptos frescos para tu ebook con nuestra IA.",
    icon:  "/icons/brain.png",
    color: "bg-gradient-to-br from-[#fffdf4] to-[#fff2ca]",

  },
  {
    title: "Edición Inteligente",
    description: "Herramientas avanzadas de edición que te ayudan a pulir tu contenido.",
    icon: "/icons/settings.png",
    color: "bg-gradient-to-br from-[#fff1f5] to-[#ffd3df]",
  },
  {
    title: "Personalización",
    description: "Adapta el estilo y diseño de tu ebook a tu gusto personal.",
    icon: "/icons/customize.png",
    color: "bg-gradient-to-br from-[#f3faff] to-[#ceecff]",
  },
  {
    title: "Exportación Fácil",
    description: "Exporta tu ebook en múltiples formatos con un solo clic.",
    icon: "/icons/export.png",
    color: "bg-gradient-to-br from-[#f6fcee] to-[#e0fcc3]",
  }
];

export default function FeaturesSection() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleFeatures(prev => [...new Set([...prev, index])]);
          } else {
            setVisibleFeatures(prev => prev.filter(i => i !== index));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px',
      }
    );

    document.querySelectorAll('.feature-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  return (
    <section className="py-16 px-4 md:px-8" id="features">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#0A3442] mb-4">
          Funcionalidades Principales
        </h2>
        <p className="text-lg text-center text-[#0A3442]/80 mb-12">
          Todo lo que necesitas para crear ebooks increíbles
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              data-index={index}
              onClick={() => handleCardClick(index)}
              className={`feature-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 cursor-pointer ${
                visibleFeatures.includes(index) 
                  ? 'opacity-100 translate-y-0 shadow-xl' 
                  : 'opacity-0 translate-y-8 shadow-none'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`${feature.color} absolute inset-0 opacity-50 transition-all duration-300 group-hover:opacity-20`} />
              
              <div className="relative z-10 flex items-center">
                <div className="w-30 h-26 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={120}
                    height={120}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                <div className="flex-1 pl-4">
                  <h3 className="text-xl font-semibold text-[#0A3442] transition-transform duration-300 group-hover:translate-x-2">
                    {feature.title}
                  </h3>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    expandedFeature === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-[#0A3442]/70 transition-transform duration-300 group-hover:translate-x-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 