"use client";

import { useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

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
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
      {/* Navigation container */}
      <div className="bg-white rounded-lg border border-[#BB0003] p-4">
        {/* Title inside container */}
        <p className="text-sm text-[#232323] mb-3">Greita navigacija</p>

        <nav className="flex flex-col gap-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={`flex items-center gap-2 p-2 rounded-[4px] transition-colors
                ${activeSection === section.id 
                  ? 'text-[#BB0003]' 
                  : 'text-[#232323] hover:bg-gray-50'} 
                ${activeSection !== section.id ? 'bg-[#EEF0F2]' : ''}`}
            >
              {/* Number badge */}
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-[3px] px-[2px] text-xs
                ${activeSection === section.id 
                  ? 'bg-[#BB0003] text-white' 
                  : 'bg-[#DDDDDD] text-[#232323]'}`}
              >
                {index + 1}
              </span>

              <span className="text-sm">{section.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SectionNav; 