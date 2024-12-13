"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const allServices = [
  {
    id: '01',
    title: 'Perkraustymo paslaugos',
    description: 'Profesionalus ir saugus daiktų perkraustymas su patikima komanda.',
    image: '/images/per.jpeg',
    url: '/services/moving'
  },
  {
    id: '02',
    title: 'Įmonių perkraustymas',
    description: 'Kompleksinis biurų ir įmonių perkraustymas, užtikrinant veiklos tęstinumą.',
    image: '/images/im.jpeg',
    url: '/services/business-moving'
  },
  {
    id: '03',
    title: 'Krovinių pervežimas',
    description: 'Saugus ir patikimas krovinių gabenimas visoje Lietuvoje.',
    image: '/images/ate.jpeg',
    url: '/services/freight'
  },
  {
    id: '04',
    title: 'Tarpmiestiniai perkraustymai',
    description: 'Profesionalus perkraustymas tarp Lietuvos miestų.',
    image: '/images/fi.jpeg',
    url: '/services/intercity'
  },
  {
    id: '05',
    title: 'Tarptautiniai perkraustymai',
    description: 'Patikimas perkraustymas į užsienio šalis ir iš jų.',
    image: '/images/pe.jpeg',
    url: '/services/international'
  },
  // ... (include all other services here)
];

const ServicesSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let intervalId: number | null = null;
    const container = scrollContainerRef.current;

    const autoScroll = () => {
      if (container) {
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'auto' });
        } else {
          container.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    };

    if (!isHovered) {
      intervalId = window.setInterval(autoScroll, 5000);
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const progress = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
      setScrollProgress(progress);

      // Infinite scroll
      if (container.scrollLeft === 0) {
        container.scrollLeft = 1; // Prevent getting stuck at 0
      } else if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
        container.scrollLeft = 1; // Loop back to start
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white py-24 overflow-hidden">
      <div className="max-w-full mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center px-8">Mūsų Paslaugos</h2>

        <div className="relative"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
          <button 
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <div 
            className="card-container" 
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {[...allServices, ...allServices].map((service, index) => (
              <Link key={`${service.id}-${index}`} href={service.url} className="card">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-[350px] h-[450px] relative overflow-hidden rounded-xl group"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-6 w-full">
                      <h3 className="text-2xl font-bold text-white/90 mb-3">{service.title}</h3>
                      <p className="text-white/80 text-sm mb-4 line-clamp-3">{service.description}</p>
                      <div className="inline-flex items-center text-red-400 font-semibold text-base">
                        Sužinoti daugiau
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <div 
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          display: flex;
          overflow-x: auto;
          gap: 24px;
          padding: 16px 0;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
          margin: 0 -16px;
          padding: 16px;
          width: calc(100% + 32px);
        }

        .card-container::-webkit-scrollbar {
          height: 6px;
        }

        .card-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 8px;
        }

        .card-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 8px;
          transition: background 0.3s ease;
        }

        .card-container::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .card {
          flex: 0 0 auto;
          width: 350px;
          height: 450px;
          position: relative;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
