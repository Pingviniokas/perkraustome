"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface SubService {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  subServices: SubService[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'moving',
    title: 'Perkraustymo Paslaugos',
    description: 'Profesionalus ir saugus daiktų perkraustymas',
    image: '/images/per.jpeg',
    subServices: [
      {
        id: 'business',
        title: 'Įmonių perkraustymas',
        description: 'Kompleksinis biurų ir įmonių perkraustymas',
        image: '/images/im.jpeg',
      },
      {
        id: 'intercity',
        title: 'Tarpmiestiniai perkraustymai',
        description: 'Profesionalus perkraustymas tarp miestų',
        image: '/images/fi.jpeg',
      },
      {
        id: 'international',
        title: 'Tarptautiniai perkraustymai',
        description: 'Perkraustymas į užsienio šalis',
        image: '/images/pe.jpeg',
      },
      {
        id: 'packing',
        title: 'Pakavimo paslaugos',
        description: 'Profesionalus daiktų pakavimas',
        image: '/images/im.jpeg',
      }
    ]
  },
  {
    id: 'disposal',
    title: 'Utilizavimo Paslaugos',
    description: 'Profesionalus atliekų išvežimas ir utilizavimas',
    image: '/images/ate.jpeg',
    subServices: [
      {
        id: 'junk',
        title: 'Daiktų išvežimas',
        description: 'Nereikalingų daiktų išvežimas',
        image: '/images/im.jpeg',
      },
      {
        id: 'construction',
        title: 'Statybinių atliekų išvežimas',
        description: 'Statybinių atliekų surinkimas',
        image: '/images/ate.jpeg',
      },
      {
        id: 'electronic',
        title: 'Elektronikos atliekų utilizavimas',
        description: 'Saugus elektronikos atliekų tvarkymas',
        image: '/images/fi.jpeg',
      },
      {
        id: 'furniture',
        title: 'Baldų išvežimas',
        description: 'Senų baldų išvežimas ir utilizavimas',
        image: '/images/pe.jpeg',
      }
    ]
  },
  {
    id: 'special',
    title: 'Fiskaro Paslaugos',
    description: 'Krovinių kėlimo ir pervežimo paslaugos',
    image: '/images/fi.jpeg',
    subServices: [
      {
        id: 'crane',
        title: 'Kėlimo darbai',
        description: 'Sunkių krovinių kėlimas',
        image: '/images/per.jpeg',
      },
      {
        id: 'oversized',
        title: 'Negabaritinių krovinių pervežimas',
        description: 'Didelių gabaritų pervežimai',
        image: '/images/fi.jpeg',
      },
      {
        id: 'construction',
        title: 'Statybos darbai',
        description: 'Fiskaro paslaugos statybvietėse',
        image: '/images/ate.jpeg',
      },
      {
        id: 'equipment',
        title: 'Įrangos montavimas',
        description: 'Sunkios įrangos montavimo darbai',
        image: '/images/im.jpeg',
      },
      {
        id: 'tree',
        title: 'Medžių šalinimas',
        description: 'Pavojingų medžių šalinimas',
        image: '/images/pe.jpeg',
      }
    ]
  }
];

const BackgroundGrid = ({ isExpanded }: { isExpanded: boolean }) => (
  <motion.div 
    className="absolute inset-0 pointer-events-none overflow-hidden"
    initial={{ opacity: 0.15 }}
    animate={{ 
      opacity: isExpanded ? 0.08 : 0.15,
      rotate: isExpanded ? 30 : 0,
      scale: isExpanded ? 1.2 : 1,
    }}
    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
  >
    <div className="absolute -left-1/4 -top-1/4 w-3/4 h-3/4">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
          <path d="M 15 0 L 0 0 0 15" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>
    <div className="absolute -right-1/4 -bottom-1/4 w-3/4 h-3/4">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>
  </motion.div>
);

const ServiceCard: React.FC<{
  category: ServiceCategory;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ category, isExpanded, onToggle }) => {
  return (
    <motion.div 
      layout
      className={`w-full bg-white rounded-xl overflow-hidden shadow-lg ${isExpanded ? 'col-span-full' : ''}`}
    >
      <motion.div 
        className="relative cursor-pointer group"
        onClick={onToggle}
        animate={{ height: isExpanded ? 125 : 250 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={category.image}
          alt={category.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 p-6 w-full">
          <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
          <p className="text-white/80 text-sm">{category.description}</p>
        </div>
        <motion.div 
          className="absolute top-4 right-4 p-2 bg-white/10 rounded-full"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>

      <AnimatePresence initial={false} mode="wait">
        {isExpanded && (
          <motion.div
            key={`expanded-${category.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white"
          >
            <div className="grid grid-cols-2 gap-6 p-8">
              {category.subServices.map((service) => (
                <div 
                  key={service.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{service.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <button className="text-red-600 text-sm font-semibold hover:text-red-700 transition-colors inline-flex items-center">
                      Sužinoti daugiau
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <BackgroundGrid isExpanded={!!expandedId} />
      
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Mūsų <span className="text-red-600">Paslaugos</span>
        </h2>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category) => (
            <ServiceCard
              key={category.id}
              category={category}
              isExpanded={expandedId === category.id}
              onToggle={() => setExpandedId(expandedId === category.id ? null : category.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
