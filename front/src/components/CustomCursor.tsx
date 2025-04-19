'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <>
      <div 
        className="circle-cursor circle-cursor--outer"
        style={{ 
          transform: `translate(${position.x - 50}px, ${position.y - 50}px)`
        }}
      />
      <div 
        className="circle-cursor circle-cursor--inner"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
    </>
  );
} 