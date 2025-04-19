import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Genera tu Idea",
    description: "Comienza con un concepto o deja que nuestra IA te inspire con ideas frescas y originales.",
    image: "/images/step1.png"
  },
  {
    number: 2,
    title: "Desarrolla el Contenido",
    description: "Utiliza nuestras herramientas de IA para expandir tus ideas y crear contenido atractivo.",
    image: "/images/step2.png"
  },
  {
    number: 3,
    title: "Personaliza el Diseño",
    description: "Elige entre una variedad de plantillas y ajusta el estilo según tus preferencias.",
    image: "/images/step3.png"
  },
  {
    number: 4,
    title: "Publica y Comparte",
    description: "Exporta tu ebook en múltiples formatos y compártelo con el mundo.",
    image: "/images/step4.png"
  }
];

export default function HowItWorksSection() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSteps(prev => [...new Set([...prev, index])]);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px',
      }
    );

    document.querySelectorAll('.step-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 bg-white/50" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#0A3442] mb-4">
          ¿Cómo Funciona?
        </h2>
        <p className="text-lg text-center text-[#0A3442]/80 mb-16">
          Crear tu ebook es más fácil de lo que piensas
        </p>

        <div className="space-y-12 md:space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index}
              data-index={index}
              className={`step-card flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 md:gap-16 transition-all duration-700 ${
                visibleSteps.includes(index)
                  ? 'opacity-100 translate-x-0'
                  : index % 2 === 0
                    ? 'opacity-0 -translate-x-12'
                    : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Contenido */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-[#F2ACBF] text-white text-xl font-semibold rounded-full w-12 h-12 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-12">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-[#0A3442] mb-4 transition-transform duration-300 hover:translate-x-2">
                  {step.title}
                </h3>
                <p className="text-lg text-[#0A3442]/70 transition-transform duration-300 hover:translate-x-2">
                  {step.description}
                </p>
              </div>

              {/* Imagen */}
              <div className="flex-1">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-105 hover:rotate-1">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 