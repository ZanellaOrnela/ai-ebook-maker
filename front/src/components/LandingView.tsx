'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import '../styles/background.css'
import Navbar from './Navbar'
import HeroSection from './sections/HeroSection'
import FeaturesSection from './sections/FeaturesSection'
import HowItWorksSection from './sections/HowItWorksSection'
import TestimonialsSection from './sections/TestimonialsSection'
import SectionObserver from './utils/SectionObserver'

export default function LandingView() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <main className="landing-background">
      <SectionObserver />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />

      {/* Footer */}
      <footer className="mt-24 py-8 bg-[#FFF6D9]/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex flex-col items-center gap-6">
            {/* Logo y Copyright */}
            <div className="flex items-center gap-3 animate-on-scroll">
              <Image
                src="/icons/logo.svg"
                alt="Writealo Logo"
                width={100}
                height={24}
                className="w-auto h-6"
              />
              <p className="text-sm text-[#004445]">&copy; {year}</p>
            </div>
            
            {/* Enlaces */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="#features" 
                className="inline-block rounded-full bg-[#FFE46B] px-6 py-2 text-sm font-bold text-white
                          shadow-[inset_0_-4px_6px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)] 
                          hover:shadow-[inset_0_-4px_6px_rgba(0,0,0,0.1),0_6px_16px_rgba(0,0,0,0.15)] 
                          active:translate-y-[2px] active:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.1)] 
                          transition-all duration-200 relative overflow-hidden animate-on-scroll"
              >
                <span className="relative z-10">Funciones</span>
                <span className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-60 z-0"></span>
              </Link>
              
              <Link 
                href="#how-it-works" 
                className="inline-block rounded-full bg-[#E8A6F6] px-6 py-2 text-sm font-bold text-white 
                          shadow-[inset_0_-4px_6px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)] 
                          hover:shadow-[inset_0_-4px_6px_rgba(0,0,0,0.1),0_6px_16px_rgba(0,0,0,0.15)] 
                          active:translate-y-[2px] active:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.1)] 
                          transition-all duration-200 relative overflow-hidden animate-on-scroll"
              >
                <span className="relative z-10">Cómo Funciona</span>
                <span className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-60 z-0"></span>
              </Link>
              
              <Link 
                href="#testimonials" 
                className="inline-block rounded-full bg-[#29CCC4] px-6 py-2 text-sm font-bold text-white
                          shadow-[inset_0_-4px_6px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)] 
                          hover:shadow-[inset_0_-4px_6px_rgba(0,0,0,0.1),0_6px_16px_rgba(0,0,0,0.15)] 
                          active:translate-y-[2px] active:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.1)] 
                          transition-all duration-200 relative overflow-hidden animate-on-scroll"
              >
                <span className="relative z-10">Testimonios</span>
                <span className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-60 z-0"></span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 