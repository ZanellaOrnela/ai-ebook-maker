'use client';

import Image from 'next/image'
import Link from 'next/link'
import type { HomeViewProps } from './types'

function HomeView({ appName, features }: HomeViewProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFE5D9] to-[#FFD6CC] p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Logo y Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0A3442] mb-2">
            {appName}
          </h1>
        </div>

        {/* Título Principal y Subtítulo */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-[#FF6B6B]">
            Unleash <br />
            Your <br />
            Creativity
          </h2>
          <p className="text-xl text-[#0A3442] mb-8">
            Craft unique and imaginative ebooks with ease!
          </p>
          <Link 
            href="/auth/register" 
            className="inline-block bg-[#FF6B6B] text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-[#FF5252] transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Características */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className={`${feature.bgColor} p-4 rounded-xl text-center`}
            >
              <div className="w-12 h-12 mx-auto mb-2">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[#0A3442] font-semibold mb-1">{feature.title}</h3>
              <p className="text-xs text-[#0A3442]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default HomeView 