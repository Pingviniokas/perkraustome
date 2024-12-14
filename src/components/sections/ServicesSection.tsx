"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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

const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('moving');
  const activeService = serviceCategories.find(cat => cat.id === activeTab);

  return (
    <section className="relative py-24 overflow-hidden">
      <BackgroundPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Mūsų <span className="text-red-600">Paslaugos</span>
        </motion.h2>

        <div className="flex justify-center mb-12 border-b overflow-x-auto no-scrollbar">
          {serviceCategories.map((category) => (
            <TabButton
              key={category.id}
              isActive={activeTab === category.id}
              onClick={() => setActiveTab(category.id)}
            >
              {category.title}
            </TabButton>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              
            >
              {activeService.subServices.map((service) => (
                <SubServiceCard key={service.id} service={service} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;
