'use client';

import { useEffect } from 'react';

export default function SectionObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Agregar clase para animación de entrada
            entry.target.classList.add('in-view');
            
            // Animar elementos dentro de la sección
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((element, index) => {
              // Agregar delay basado en el índice
              element.classList.add(`delay-${(index + 1) * 100}`);
              
              // Determinar la dirección de la animación basada en la posición
              const rect = element.getBoundingClientRect();
              const isLeft = rect.left < window.innerWidth / 2;
              const isTop = rect.top < window.innerHeight / 2;
              
              // Aplicar animación de morphing
              if (isLeft) {
                element.classList.add('animate-morph-in-left');
              } else {
                element.classList.add('animate-morph-in-right');
              }
              
              if (isTop) {
                element.classList.add('animate-morph-in-down');
              } else {
                element.classList.add('animate-morph-in-up');
              }
            });
          } else {
            // Remover clases de animación cuando la sección sale de vista
            entry.target.classList.remove('in-view');
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach(element => {
              element.classList.remove(
                'animate-morph-in-up',
                'animate-morph-in-down',
                'animate-morph-in-left',
                'animate-morph-in-right',
                'delay-100',
                'delay-200',
                'delay-300',
                'delay-400',
                'delay-500'
              );
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px',
      }
    );

    // Observar todas las secciones
    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
} 