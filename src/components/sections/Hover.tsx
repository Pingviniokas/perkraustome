'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';

const Hover = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBoxHovered, setIsBoxHovered] = useState(false);

  // Create static random positions that won't change on re-render
  const imagePositions = useMemo(() => 
    Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    })), []  // Empty dependency array means this only runs once
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  return (
    <div 
      className="relative w-full h-screen bg-gray-950 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Hidden image layer */}
      <div 
        className="absolute inset-0"
        style={{
          WebkitMaskImage: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          maskImage: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          background: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.2), transparent)`
        }}
      >
        {imagePositions.map((pos, index) => (
          <div
            key={index}
            className="absolute pointer-events-none"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: '300px',
              height: '300px',
              filter: 'brightness(1.5) contrast(1.2)'
            }}
          >
            <Image
              src="/images/LOGOmjc.webp"
              alt="MJC Logo"
              fill
              className="object-contain mix-blend-screen opacity-90"
              sizes="300px"
            />
          </div>
        ))}
      </div>

      {/* Centered content box with rotating border effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Rotating border container */}
          <div 
            className={`absolute -inset-1 rounded-xl opacity-75 transition-opacity duration-300
              ${isBoxHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background: 'linear-gradient(90deg, #ff0000, #ffffff, #ff0000)',
              backgroundSize: '300% 100%',
              animation: isBoxHovered ? 'moveGradient 2s linear infinite' : 'none',
              filter: 'blur(8px)'
            }}
          />
          
          {/* Rotating border */}
          <div 
            className={`absolute -inset-1 rounded-xl transition-opacity duration-300
              ${isBoxHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background: 'linear-gradient(90deg, #ff0000, #ffffff, #ff0000)',
              backgroundSize: '200% 100%',
              animation: isBoxHovered ? 'moveGradient 2s linear infinite' : 'none'
            }}
          />

          {/* Content container */}
          <div
            className="relative min-w-[600px] rounded-xl bg-gray-900 p-16 transition-transform duration-300"
            onMouseEnter={() => setIsBoxHovered(true)}
            onMouseLeave={() => setIsBoxHovered(false)}
          >
            <h2 className="text-6xl font-light text-white mb-6">Ka TU KA VAKARE</h2>
            <p className="text-2xl text-gray-300">
              LABAS, MES JAU CIA.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes moveGradient {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
      `}</style>
    </div>
  );
};

export default Hover;