"use client";

import { useEffect } from 'react';
import clsx from 'clsx';

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
  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });
    
    setActiveSection(sectionId);
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block animate-fade-in animation-delay-700">
      <div className="bg-white/30 backdrop-blur-[4px] rounded-[10px] p-3 border-2 border-white">
        <div className="space-y-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={clsx(
                "group flex items-center gap-3 w-full text-left transition-all",
                "hover:bg-white/50 rounded-lg p-2",
                activeSection === section.id && "bg-white/50"
              )}
              aria-label={section.label}
            >
              <div className={clsx(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                activeSection === section.id 
                  ? "bg-[#BB0003] text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                {index + 1}
              </div>
              <span className={clsx(
                "text-sm transition-all",
                activeSection === section.id 
                  ? "text-[#2a2d35] font-medium"
                  : "text-gray-500"
              )}>
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionNav; 