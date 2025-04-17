'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import '../styles/background.css'

interface Feature {
  id: string;
  title: string;
  description: string;
  emoji: string;
  bgColor: string;
}

interface LandingViewProps {
  features: Feature[];
}

export default function LandingView({ features }: LandingViewProps) {
  const defaultFeatures: Feature[] = [
    {
      id: '1',
      title: 'Generate\nIdeas',
      description: 'Instantly create\nfresh concepts\nfor your ebook',
      emoji: '💡',
      bgColor: 'bg-[#FFE46B]'
    },
    {
      id: '2',
      title: 'Fun\nCustomization',
      description: 'Personalize your\nebook with\nplayful styles',
      emoji: '❤️✏️',
      bgColor: 'bg-[#E8A6F6]'
    },
    {
      id: '3',
      title: 'Easy\nExport',
      description: 'Save and share\nyour ebook\neffortlessly',
      emoji: '✉️⬇️',
      bgColor: 'bg-[#29CCC4]'
    }
  ];

  const [currentFeature, setCurrentFeature] = useState(0);
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % featuresToRender.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + featuresToRender.length) % featuresToRender.length);
  };

  const featuresToRender = features.length > 0 ? features : defaultFeatures;

  return (
    <main className="min-h-screen landing-background flex flex-col">
      <div className="flex-grow max-w-md mx-auto px-8 pt-12">
        {/* Logo */}
        <div className="mb-16">
          <Image
            src="/icons/logo.svg"
            alt="Writealo Logo"
            width={171}
            height={41}
            priority
            className="w-auto h-auto"
          />
        </div>

        {/* Título Principal y Subtítulo */}
        <div className="mb-16 relative">
          <h2 className="text-[4rem] font-bold mb-4 text-[#FF6B6B] leading-tight">
            Unleash<br />
            Your<br />
            Creativity
          </h2>
          <div className="absolute -right-6 -top-4">
            <Image
              src="/images/bulb-icon.png"
              alt="Idea Bulb"
              width={140}
              height={140}
              className="w-auto h-auto"
            />
          </div>
          <p className="text-xl text-[#0A3442] mb-8">
            Craft unique and imaginative<br />ebooks with ease!
          </p>
          <Link 
            href="/auth/register" 
            className="relative inline-block rounded-full bg-[#ff6b57] px-8 py-3 text-[1.25rem] font-extrabold tracking-tight text-[#fff8e8] shadow-[inset_0_-4px_6px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-4 focus:ring-[#ffb6a9]/60 active:translate-y-[2px] active:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.20),0_4px_8px_rgba(0,0,0,0.15)]"
          >
            Get&nbsp;Started
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_40%)] mix-blend-overlay"></span>
          </Link>
        </div>

        {/* Carrusel de Características */}
        <div className="relative mb-16" id="features">
          <div className="overflow-hidden rounded-[2rem]">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentFeature * 100}%)` }}
            >
              {featuresToRender.map((feature) => (
                <div
                  key={feature.id}
                  className="w-full flex-shrink-0"
                >
                  <div className={`${feature.bgColor} h-[180px] flex items-center justify-center`}>
                    <span className="text-6xl">{feature.emoji}</span>
                  </div>
                  <div className="bg-[#FFF6D9] h-[180px] flex flex-col items-center justify-center px-8">
                    <h3 className="text-2xl font-extrabold mb-4 text-[#004445] whitespace-pre-line">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-[#004445] whitespace-pre-line">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles del carrusel */}
          <button 
            onClick={prevFeature}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6b57]"
          >
            ←
          </button>
          <button 
            onClick={nextFeature}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6b57]"
          >
            →
          </button>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {featuresToRender.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentFeature ? 'bg-[#ff6b57]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 py-8 bg-[#FFF6D9]/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex flex-col items-center gap-6">
            {/* Logo y Copyright */}
            <div className="flex items-center gap-3">
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
                          transition-all duration-200 relative overflow-hidden"
              >
                <span className="relative z-10">Funciones</span>
                <span className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-60 z-0"></span>
              </Link>
              
              <Link 
                href="/blog" 
                className="inline-block rounded-full bg-[#E8A6F6] px-6 py-2 text-sm font-bold text-white 
                          shadow-[inset_0_-4px_6px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)] 
                          hover:shadow-[inset_0_-4px_6px_rgba(0,0,0,0.1),0_6px_16px_rgba(0,0,0,0.15)] 
                          active:translate-y-[2px] active:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.1)] 
                          transition-all duration-200 relative overflow-hidden"
              >
                <span className="relative z-10">Blog</span>
                <span className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-60 z-0"></span>
              </Link>
              
              <Link 
                href="/contact" 
                className="inline-block rounded-full bg-[#29CCC4] px-6 py-2 text-sm font-bold text-white
                          shadow-[inset_0_-4px_6px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)] 
                          hover:shadow-[inset_0_-4px_6px_rgba(0,0,0,0.1),0_6px_16px_rgba(0,0,0,0.15)] 
                          active:translate-y-[2px] active:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.1)] 
                          transition-all duration-200 relative overflow-hidden"
              >
                <span className="relative z-10">Contacto</span>
                <span className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-60 z-0"></span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
} 