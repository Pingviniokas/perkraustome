"use client";

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Pradinis' },
  { id: 'calculator', label: 'Kainos skaičiuoklė' },
  { id: 'why-us', label: 'Kodėl mes?' },
  { id: 'services', label: 'Paslaugos' },
  { id: 'values', label: 'Vertybės ir išskirtinumai' },
  { id: 'achievements', label: 'Tikslai ir pasiekimai' },
  { id: 'testimonials', label: 'Atsiliepimai' },
  { id: 'contact', label: 'Susisiekite su mumis' },
];

interface SectionNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SectionNav = ({ activeSection, setActiveSection }: SectionNavProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const viewportHeight = window.innerHeight;
      let scrollPosition;

      if (sectionId === 'hero') {
        scrollPosition = 0;
      } else {
        const sectionOffsets = {
          'calculator': viewportHeight * 0.6,
          'why-us': viewportHeight * 2.0,
          'services': viewportHeight * 3.2,
          'values': viewportHeight * 4.4,
          'achievements': viewportHeight * 5.2,
          'testimonials': viewportHeight * 6.4,
          'contact': viewportHeight * 7.6
        };
        
        scrollPosition = sectionOffsets[sectionId as keyof typeof sectionOffsets];
      }
      
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
    }
  };

  // Add scroll listener to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Define section breakpoints
      const breakpoints = {
        'hero': [0, viewportHeight * 0.3],
        'calculator': [viewportHeight * 0.3, viewportHeight * 1.5],
        'why-us': [viewportHeight * 1.5, viewportHeight * 2.7],
        'services': [viewportHeight * 2.7, viewportHeight * 3.9],
        'values': [viewportHeight * 3.9, viewportHeight * 5.1],
        'achievements': [viewportHeight * 5.1, viewportHeight * 6.3],
        'testimonials': [viewportHeight * 6.3, viewportHeight * 7.5],
        'contact': [viewportHeight * 7.5, Infinity]
      };

      // Find current section
      for (const [sectionId, [start, end]] of Object.entries(breakpoints)) {
        if (scrollPosition >= start && scrollPosition < end) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  return (
    <>
      {/* Desktop Navigation (existing) */}
      <motion.nav 
        className="fixed left-8 top-1/2 -translate-y-1/2 z-[2000] hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative flex items-stretch">
          {/* Main navigation container */}
          <motion.div 
            className="bg-white/80 backdrop-blur-[2px] rounded-l-[12px] border border-[#BB0003] overflow-hidden"
            initial={{ width: 'auto', height: 'auto' }}
            animate={{ 
              width: isCollapsed ? 0 : 'auto',
              height: isCollapsed ? '48px' : 'auto',
              padding: isCollapsed ? '0' : '0.75rem',
              opacity: isCollapsed ? 0 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4 whitespace-nowrap py-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => handleClick(section.id)}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-2.5 rounded-[8px] transition-colors',
                    activeSection === section.id 
                      ? 'bg-[#BB0003] text-white' 
                      : 'hover:bg-[#DDDDDD]'
                  )}
                >
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-[4px] text-xs flex-shrink-0
                    ${activeSection === section.id 
                      ? 'bg-white text-[#BB0003]' 
                      : 'bg-[#DDDDDD] text-[#232323]'}`}
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm">{section.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Toggle button */}
          <motion.button
            initial={{ width: '32px', height: 'auto' }}
            animate={{ 
              width: isCollapsed ? 'auto' : '32px',
              height: 'auto',
              padding: isCollapsed ? '0.5rem 1rem' : '0.5rem',
              borderRadius: isCollapsed ? '12px' : '0 12px 12px 0',
              borderLeft: isCollapsed ? '' : 'none'
            }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="relative border border-[#BB0003] bg-[#F5F5F5]/90 backdrop-blur-[2px] hover:bg-[#EBEBEB] active:bg-[#E0E0E0] transition-colors flex items-center justify-center -ml-[1px]"
          >
            <motion.div 
              className="flex items-center gap-2 whitespace-nowrap"
              animate={{ 
                opacity: isCollapsed ? 1 : 1
              }}
            >
              {isCollapsed && <span className="text-sm">Greita navigacija</span>}
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav 
        className="fixed left-0 top-[35%] h-[60%] z-[2000] md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-full flex">
          {/* Mobile navigation container */}
          <motion.div 
            className="bg-white/95 backdrop-blur-[2px] border-r border-[#BB0003] overflow-hidden"
            initial={{ width: 0 }}
            animate={{ 
              width: isCollapsed ? 0 : '200px',
              opacity: isCollapsed ? 0 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col py-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    handleClick(section.id);
                    setIsCollapsed(true);
                  }}
                  className={clsx(
                    'px-6 py-3 text-left transition-colors',
                    activeSection === section.id 
                      ? 'bg-[#BB0003] text-white' 
                      : 'hover:bg-[#DDDDDD]'
                  )}
                >
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Mobile toggle button - shorter height */}
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute right-0 translate-x-full h-24 px-2 bg-[#F5F5F5]/90 backdrop-blur-[2px] hover:bg-[#EBEBEB] active:bg-[#E0E0E0] transition-colors border border-l-0 border-[#BB0003] rounded-r-lg flex items-center justify-center"
            animate={{ 
              borderRadius: isCollapsed ? '0 6px 6px 0' : '0',
              height: isCollapsed ? '96px' : '100%' // Shorter when collapsed
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className={`w-5 h-5 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
};

export default SectionNav; 