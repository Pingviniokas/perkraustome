"use client";

import { useState, useEffect } from 'react';

const CompanyLogoSlider = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const companies = [
    { name: 'City Service', logo: '/images/slider/cityservice.svg' },
    { name: 'Mambu', logo: '/images/slider/mambu.svg' },
    { name: 'Okseta', logo: '/images/slider/okseta.svg' },
    { name: 'Cup', logo: '/images/slider/logocup.svg' },
    { name: 'Havas', logo: '/images/slider/logohavas.svg' },
    { name: 'Distyle', logo: '/images/slider/distyle.png' },
    { name: 'Glastika', logo: '/images/slider/glastika.png' },
    { name: 'Homanit', logo: '/images/slider/homanit.png' },
    { name: 'Lidora', logo: '/images/slider/lidoralogo.png' },
    { name: 'MT', logo: '/images/slider/mt.png' },
    { name: 'Pool Service', logo: '/images/slider/poolservice.png' },
    { name: 'Publicum', logo: '/images/slider/publicum.png' },
    { name: 'ST', logo: '/images/slider/st.png' }
  ];

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1;
        return newPosition >= companies.length * 200 ? 0 : newPosition;
      });
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="w-full bg-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Mumis pasitikejo
        </h2>
        
        <div className="relative">
          <div className="flex items-center space-x-16" 
               style={{
                 transform: `translateX(-${scrollPosition}px)`,
                 transition: 'transform 0.5s linear'
               }}>
            {/* Double the logos for seamless infinite scroll */}
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 h-20 w-32 flex items-center justify-center"
              >
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogoSlider;