'use client';

import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="hero" className="h-screen w-full flex items-center justify-start relative scroll-mt-16 transition-all duration-500 ease-in-out">
      <div className="max-w-screen px-6 lg:px-8 xl:px-20">
        {/* Contenedor principal con flex en lg */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">
          {/* Título Principal y Subtítulo */}
          <div className="relative w-[300px]">
            <h2 className="text-[3.5rem] sm:text-[4rem] font-bold mb-4 text-[#FF6B6B] leading-tight">
              Unleash<br/>
              Your Creativity<br/>
            </h2>
            <div className="absolute -right-22 sm:-right-38 md:-right-120 lg:right-[-500px] lg:opacity-0 -top-4 transition-all duration-700 ease-in-out">
              <Image
                src="https://i.postimg.cc/wBS4fvgv/Chat-GPT-Image-18-abr-2025-11-42-19-p-m-upscayl-6x-high-fidelity-4x.png"
                alt="Idea Bulb"
                width={600}
                height={600}
                quality={100}
                priority
                className="w-[190px] h-[190px] sm:w-[190px] sm:h-[190px] md:w-[400px] md:h-[400px] lg:w-[400px] lg:h-[400px] transform transition-all duration-700 hover:scale-110"
              />
            </div>
            <p className="text-xl text-[#0A3442] mb-8">
              Craft unique and imaginatipxve ebooks with ease!
            </p>
            <Link 
              href="/auth/register" 
              className="relative inline-block rounded-full bg-[#ff6b57] px-8 py-3 text-[1.25rem] font-semibold tracking-wider text-[#fff8e8] shadow-[inset_0_-4px_6px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-4 focus:ring-[#ffb6a9]/60 active:translate-y-[2px] active:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.20),0_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#ff5540] hover:shadow-lg"
            >
              Get&nbsp;Started
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_40%)] mix-blend-overlay"></span>
            </Link>
          </div>
          
          {/* Imagen adicional que entra cuando la lámpara sale */}
          <div className="absolute top-0 left-[600px] w-[700px] h-[700px] lg:left-[400px] lg:top-[50px] xl:left-[500px] xl:top-[20px] xl:w-[800px] xl:h-[800px] opacity-0 translate-x-full lg:opacity-100 lg:translate-x-0 transition-all duration-700 ease-in-out transform-gpu">
            <Image
              src="https://i.postimg.cc/Y0SFQ6Zm/Chat-GPT-Image-19-abr-2025-12-01-38-a-m-upscayl-4x-high-fidelity-4x.png"
              alt="Creative Writing"
              width={900}
              height={900}
              quality={100}
              priority
              className="w-full h-full object-contain transform transition-all duration-700 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 