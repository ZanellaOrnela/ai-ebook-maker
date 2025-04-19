import Image from 'next/image';
import { useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Ana García",
    role: "Escritora Independiente",
    content: "Writealo ha revolucionado mi forma de crear ebooks. La IA me ayuda a generar ideas cuando tengo bloqueo creativo.",
    avatar: "/avatars/user1.png",
    rating: 5
  },
  {
    name: "Carlos Ruiz",
    role: "Profesor Universitario",
    content: "Excelente herramienta para crear materiales educativos. La interfaz es intuitiva y el resultado final es muy profesional.",
    avatar: "/avatars/user2.png",
    rating: 5
  },
  {
    name: "Laura Martínez",
    role: "Coach Personal",
    content: "Gracias a Writealo he podido crear y publicar mi primer ebook de desarrollo personal en tiempo récord.",
    avatar: "/avatars/user3.png",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 px-4 md:px-8" id="testimonials">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#0A3442] mb-4">
          Lo que dicen nuestros usuarios
        </h2>
        <p className="text-lg text-center text-[#0A3442]/80 mb-16">
          Historias de éxito de la comunidad Writealo
        </p>

        <div className="relative">
          {/* Carrusel de testimonios */}
          <div className="overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 p-8 md:p-12"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-6">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>

                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-[#FFE46B] text-2xl">★</span>
                      ))}
                    </div>

                    <blockquote className="text-xl text-[#0A3442] mb-6 italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>

                    <cite className="not-italic">
                      <div className="font-semibold text-[#0A3442]">{testimonial.name}</div>
                      <div className="text-[#0A3442]/70">{testimonial.role}</div>
                    </cite>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles del carrusel */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F2ACBF]"
          >
            ←
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F2ACBF]"
          >
            →
          </button>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-[#F2ACBF]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 