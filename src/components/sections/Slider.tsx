"use client";

import { useState, useEffect, useRef } from 'react';

const CompanyLogoSlider = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

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
    if (scrollRef.current) {
      setContainerWidth(scrollRef.current.scrollWidth / 3);
    }
  }, []);

  useEffect(() => {
    if (!containerWidth) return;

    const scroll = () => {
      if (scrollRef.current && !isPaused) {
        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= containerWidth) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, [containerWidth, isPaused]);

  return (
    <div className="w-screen bg-transparent overflow-hidden -mx-[calc((100vw-100%)/2)]">
      <div 
        ref={scrollRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="inline-flex items-center space-x-24 whitespace-nowrap">
          {[...companies, ...companies, ...companies].map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="inline-block h-24 w-40 flex items-center justify-center first:ml-0"
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
  );
};

export default CompanyLogoSlider;