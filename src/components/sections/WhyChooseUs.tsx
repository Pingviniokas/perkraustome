"use client";

import { useEffect, useRef } from 'react';

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        sectionRef.current.style.setProperty('--mouse-x', x.toString());
        sectionRef.current.style.setProperty('--mouse-y', y.toString());
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="absolute inset-0 bg-sparkle"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Kodėl verta rinktis mus?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Patirtis', description: 'Ilgametė patirtis užtikrina kokybiškas paslaugas' },
            { title: 'Profesionalumas', description: 'Kvalifikuota komanda sprendžia sudėtingiausius uždavinius' },
            { title: 'Patikimumas', description: 'Jūsų turtas mūsų rankose saugus ir apdraustas' },
            { title: 'Efektyvumas', description: 'Darbą atliekame greitai ir kokybiškai' },
            { title: 'Lankstumas', description: 'Prisitaikome prie jūsų individualių poreikių' },
            { title: 'Modernus inventorius', description: 'Naudojame šiuolaikišką įrangą ir transportą' },
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 card-hover"
            >
              <h3 className="text-xl font-semibold mb-3 text-red-600">{item.title}</h3>
              <p className="text-gray-800">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
