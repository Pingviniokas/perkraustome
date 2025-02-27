"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, MotionValue } from 'framer-motion';

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

interface ServicesSectionProps {
  inView: boolean;
  scrollProgress: MotionValue<number>;
  onOpacityChange?: (opacity: number) => void;
}

const ServicesSection = ({ inView, scrollProgress, onOpacityChange }: ServicesSectionProps) => {
  const [activeTab, setActiveTab] = useState<ServiceType>('moving');
  const [activeService, setActiveService] = useState<string>('01');

  const sectionOpacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  useEffect(() => {
    if (onOpacityChange) {
      return sectionOpacity.onChange(onOpacityChange);
    }
  }, [sectionOpacity, onOpacityChange]);

  // Add entrance animation
  const sectionScale = useTransform(
    scrollProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  // Content fades out first
  const contentOpacity = useTransform(
    scrollProgress,
    [0, 0.15],
    [1, 0]
  );

  const titleY = useTransform(
    scrollProgress,
    [0.1, 0.3, 0.7, 0.9],
    [50, 0, 0, -50]
  );

  const contentScale = useTransform(
    scrollProgress,
    [0.1, 0.3, 0.7, 0.9],
    [0.8, 1, 1, 0.8]
  );

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      style={{ 
        opacity: sectionOpacity,
        scale: sectionScale
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.h2
            className="text-4xl font-light text-center text-[#2A2D35] mb-6"
            style={{ y: titleY }}
          >
            Mūsų Paslaugos
          </motion.h2>

          {/* Toggle-style buttons container */}
          <motion.div 
            className="text-center mb-6"
            style={{ scale: contentScale }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-white/40 backdrop-blur-[2px] rounded-lg border border-[#BB0003] p-1">
                {/* Sliding background */}
                <motion.div
                  className="absolute inset-1 bg-[#BB0003] rounded-md"
                  initial={{ width: '33.333333%' }}
                  animate={{ 
                    left: `calc(${['moving', 'crane', 'disposal'].indexOf(activeTab) * 33.333333}% + 4px)`,
                    width: 'calc(33.333333% - 8px)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                
                {/* Buttons */}
                <div className="grid grid-cols-3 relative">
                  <motion.button
                    className={`px-4 py-1.5 transition-colors w-full text-sm z-10
                      ${activeTab === 'moving' ? 'text-white' : 'text-[#2A2D35] hover:text-[#BB0003]'}`}
                    onClick={() => setActiveTab('moving')}
                  >
                    Perkraustymo paslaugos
                  </motion.button>
                  <motion.button
                    className={`px-4 py-1.5 transition-colors w-full text-sm z-10
                      ${activeTab === 'crane' ? 'text-white' : 'text-[#2A2D35] hover:text-[#BB0003]'}`}
                    onClick={() => setActiveTab('crane')}
                  >
                    Fiskaro paslaugos
                  </motion.button>
                  <motion.button
                    className={`px-4 py-1.5 transition-colors w-full text-sm z-10
                      ${activeTab === 'disposal' ? 'text-white' : 'text-[#2A2D35] hover:text-[#BB0003]'}`}
                    onClick={() => setActiveTab('disposal')}
                  >
                    Utilizavimo paslaugos
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service items */}
          <div className="max-w-4xl mx-auto space-y-4">
            {services[activeTab].map((service, index) => (
              <motion.div
                key={service.id}
                className={`relative flex items-start p-6 rounded-lg cursor-pointer transition-all
                  ${activeService === service.id 
                    ? 'bg-[#DDDDDD]/90 border border-[#BB0003]' 
                    : 'bg-white/90 hover:bg-[#DDDDDD]/90'}`}
                onClick={() => setActiveService(service.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Number - moved to left */}
                <span className="absolute top-3 left-4 text-sm text-gray-400">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content - centered */}
                <div className="w-full text-center px-12"> {/* Added padding to account for number */}
                  <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesSection;
