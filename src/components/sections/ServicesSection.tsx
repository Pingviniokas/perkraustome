"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';

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
        description: 'Kompleksinis biurų perkraustymas',
        image: '/images/im.jpeg',
      },
      {
        id: 'home',
        title: 'Namų perkraustymas',
        description: 'Privačių namų perkraustymas',
        image: '/images/per.jpeg',
      },
      {
        id: 'international',
        title: 'Tarptautinis perkraustymas',
        description: 'Perkraustymas į užsienį',
        image: '/images/fi.jpeg',
      },
      {
        id: 'packing',
        title: 'Pakavimo paslaugos',
        description: 'Profesionalus daiktų pakavimas',
        image: '/images/pe.jpeg',
      },
      {
        id: 'storage',
        title: 'Sandėliavimas',
        description: 'Laikinas daiktų saugojimas',
        image: '/images/ate.jpeg',
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
        id: 'furniture',
        title: 'Baldų išvežimas',
        description: 'Senų baldų išvežimas',
        image: '/images/pe.jpeg',
      },
      {
        id: 'electronic',
        title: 'Elektronikos utilizavimas',
        description: 'Elektronikos atliekų tvarkymas',
        image: '/images/fi.jpeg',
      },
      {
        id: 'garden',
        title: 'Sodo atliekų išvežimas',
        description: 'Žaliųjų atliekų tvarkymas',
        image: '/images/per.jpeg',
      }
    ]
  },
  {
    id: 'crane',
    title: 'Fiskaro Paslaugos',
    description: 'Krovinių kėlimo ir pervežimo paslaugos',
    image: '/images/fi.jpeg',
    subServices: [
      {
        id: 'lifting',
        title: 'Kėlimo darbai',
        description: 'Sunkių krovinių kėlimas',
        image: '/images/per.jpeg',
      },
      {
        id: 'transport',
        title: 'Negabaritinių krovinių pervežimas',
        description: 'Didelių gabaritų pervežimai',
        image: '/images/fi.jpeg',
      },
      {
        id: 'construction',
        title: 'Statybos darbai',
        description: 'Statybvietės aptarnavimas',
        image: '/images/ate.jpeg',
      },
      {
        id: 'equipment',
        title: 'Įrangos montavimas',
        description: 'Pramoninės įrangos montavimas',
        image: '/images/im.jpeg',
      },
      {
        id: 'tree',
        title: 'Medžių šalinimas',
        description: 'Aukštuminiai medžių darbai',
        image: '/images/pe.jpeg',
      }
    ]
  }
];

const BackgroundPattern = () => (
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Main Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 96%, #000 96%),
            linear-gradient(0deg, transparent 96%, #000 96%)
          `,
          backgroundSize: '25px 25px',
          transform: 'rotate(-5deg) scale(2)',
        }}
      />
      {/* Diagonal Lines Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #000 1px, transparent 1px)
          `,
          backgroundSize: '35px 35px',
          transform: 'rotate(-5deg) scale(2)',
        }}
      />
      {/* Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'scale(2)',
        }}
      />
      <div className="absolute inset-0">
        <div
          className="h-full w-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, 
                        rgba(255,255,255,0) 0%, 
                        rgba(255,255,255,0.5) 25%, 
                        rgba(255,255,255,0.8) 50%, 
                        rgba(255,255,255,1) 100%)`
          }}
        />
      </div>
    </div>
  </div>
);

const TabButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isActive, onClick, children }) => (
  <motion.button
    onClick={onClick}
    className={`
      relative px-8 py-4 text-sm font-medium transition-all
      ${isActive
        ? 'text-red-600 border-b-2 border-red-600'
        : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
      }
    `}
    whileHover={{ y: -1 }}
    whileTap={{ y: 0 }}
  >
    {children}
  </motion.button>
);

const SubServiceCard: React.FC<{
  service: SubService;
}> = ({ service }) => (
  <motion.div
    className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
  >
    <div className="relative h-48 overflow-hidden">
      <Image
        src={service.image}
        alt={service.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        priority={false}
        className="object-cover transition-all duration-500 filter grayscale hover:grayscale-0 hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h4 className="font-semibold mb-2">{service.title}</h4>
      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
      <motion.button
        className="text-red-600 text-sm font-semibold hover:text-red-700 transition-colors inline-flex items-center group"
        whileHover={{ x: 4 }}
      >
        Sužinoti daugiau
        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
      </motion.button>
    </div>
  </motion.div>
);

type ServiceType = 'moving' | 'crane' | 'disposal';

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
}

const services: Record<ServiceType, Service[]> = {
  moving: [
    {
      id: '01',
      number: '01',
      title: 'ĮMONIŲ PERKRAUSTYMAS',
      description: 'Kompleksinis biurų perkraustymas',
      href: '/imoniu-perkraustymas'
    },
    {
      id: '02',
      number: '02',
      title: 'NAMŲ PERKRAUSTYMAS',
      description: 'Privačių namų perkraustymas',
      href: '/namu-perkraustymas'
    },
    {
      id: '03',
      number: '03',
      title: 'TARPTAUTINIS PERKRAUSTYMAS',
      description: 'Perkraustymas į užsienį',
      href: '/tarptautinis-perkraustymas'
    },
    {
      id: '04',
      number: '04',
      title: 'PAKAVIMO PASLAUGOS',
      description: 'Profesionalus daiktų pakavimas',
      href: '/pakavimo-paslaugos'
    },
    {
      id: '05',
      number: '05',
      title: 'SANDĖLIAVIMAS',
      description: 'Laikinas daiktų saugojimas',
      href: '/sandeliavimas'
    }
  ],
  crane: [
    {
      id: '01',
      number: '01',
      title: 'KĖLIMO DARBAI',
      description: 'Sunkių krovinių kėlimas',
      href: '/kelimo-darbai'
    },
    {
      id: '02',
      number: '02',
      title: 'NEGABARITINIŲ KROVINIŲ PERVEŽIMAS',
      description: 'Didelių gabaritų pervežimai',
      href: '/negabaritiniu-kroviniu-pervezimas'
    },
    {
      id: '03',
      number: '03',
      title: 'STATYBOS DARBAI',
      description: 'Statybvietės aptarnavimas',
      href: '/statybos-darbai'
    },
    {
      id: '04',
      number: '04',
      title: 'ĮRANGOS MONTAVIMAS',
      description: 'Pramoninės įrangos montavimas',
      href: '/irangos-montavimas'
    },
    {
      id: '05',
      number: '05',
      title: 'MEDŽIŲ ŠALINIMAS',
      description: 'Aukštuminiai medžių darbai',
      href: '/medziu-salinimas'
    }
  ],
  disposal: [
    {
      id: '01',
      number: '01',
      title: 'DAIKTŲ IŠVEŽIMAS',
      description: 'Nereikalingų daiktų išvežimas',
      href: '/daiktu-isvezimas'
    },
    {
      id: '02',
      number: '02',
      title: 'STATYBINIŲ ATLIEKŲ IŠVEŽIMAS',
      description: 'Statybinių atliekų surinkimas',
      href: '/statybiniu-atlieku-isvezimas'
    },
    {
      id: '03',
      number: '03',
      title: 'BALDŲ IŠVEŽIMAS',
      description: 'Senų baldų išvežimas',
      href: '/baldu-isvezimas'
    },
    {
      id: '04',
      number: '04',
      title: 'ELEKTRONIKOS UTILIZAVIMAS',
      description: 'Elektronikos atliekų tvarkymas',
      href: '/elektronikos-utilizavimas'
    },
    {
      id: '05',
      number: '05',
      title: 'SODO ATLIEKŲ IŠVEŽIMAS',
      description: 'Žaliųjų atliekų tvarkymas',
      href: '/sodo-atlieku-isvezimas'
    }
  ]
};

const ServicesSection = ({ inView }: { inView: boolean }) => {
  const [activeTab, setActiveTab] = useState<ServiceType>('moving');

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Title */}
      <motion.h2
        className="text-4xl font-light text-center text-[#2A2D35] mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        Mūsų Paslaugos
      </motion.h2>

      {/* Tabs - Made wider */}
      <motion.div 
        className="flex justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Each button takes equal width */}
        <button
          onClick={() => setActiveTab('moving')}
          className={clsx(
            'flex-1 max-w-[300px] py-3 rounded-lg font-medium transition-all',
            activeTab === 'moving'
              ? 'bg-[#BB0003] text-white'
              : 'bg-white/40 backdrop-blur-[2px] border border-[#BB0003] text-[#2A2D35] hover:bg-white/50'
          )}
        >
          PERKRAUSTYMO PASLAUGOS
        </button>
        <button
          onClick={() => setActiveTab('crane')}
          className={clsx(
            'flex-1 max-w-[300px] py-3 rounded-lg font-medium transition-all',
            activeTab === 'crane'
              ? 'bg-[#BB0003] text-white'
              : 'bg-white/40 backdrop-blur-[2px] border border-[#BB0003] text-[#2A2D35] hover:bg-white/50'
          )}
        >
          FISKARO PASLAUGOS
        </button>
        <button
          onClick={() => setActiveTab('disposal')}
          className={clsx(
            'flex-1 max-w-[300px] py-3 rounded-lg font-medium transition-all',
            activeTab === 'disposal'
              ? 'bg-[#BB0003] text-white'
              : 'bg-white/40 backdrop-blur-[2px] border border-[#BB0003] text-[#2A2D35] hover:bg-white/50'
          )}
        >
          UTILIZAVIMO PASLAUGOS
        </button>
      </motion.div>

      {/* Services List - Updated AnimatePresence */}
      <div className="max-w-4xl mx-auto space-y-3">
        <AnimatePresence mode="sync">
          {services[activeTab].map((service, index) => (
            <motion.a
              key={service.id}
              href={service.href}
              className="block w-full bg-white/40 backdrop-blur-[2px] rounded-lg p-4 border border-[#BB0003] hover:bg-white/50 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-6">
                <span className="text-2xl font-light text-[#BB0003] w-10">{service.number}</span>
                <div className="flex-1 text-center">
                  <h3 className="text-lg font-medium text-[#2A2D35] mb-0.5">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
                <div className="text-[#BB0003]">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform group-hover:translate-x-1 transition-transform"
                  >
                    <path 
                      d="M9 6L15 12L9 18" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServicesSection;
