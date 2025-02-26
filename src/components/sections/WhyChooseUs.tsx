"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface ServiceContent {
  id: string;
  buttonText: string;
  title: string;
  description: string;
  image: string;
}

const serviceContents: ServiceContent[] = [
  {
    id: 'moving',
    buttonText: 'Perkraustymo paslaugos',
    title: 'Visapusiškos perkraustymo paslaugos',
    description: 'Nuo daiktų pakavimo ir supakavimui reikalingų priemonių suteikimo iki jų išpakavimo ir tvarkingo sustatymo naujoje vietoje.',
    image: '/images/man.webp'
  },
  {
    id: 'crane',
    buttonText: 'Fiskaro nuoma',
    title: 'Fiskaro (manipuliatoriaus) nuoma',
    description: 'Su patyrusiu operatoriumi.',
    image: '/images/fiskaras.webp'
  },
  {
    id: 'loading',
    buttonText: 'Krovimo paslaugos',
    title: 'Patikimos krovimo paslaugos',
    description: 'Turime reikiamą įrangą ir sukauptą patirtį visiems krovimo darbams.',
    image: '/images/krovimas.webp'
  },
  {
    id: 'waste',
    buttonText: 'Atliekų išvežimas',
    title: 'Atliekų išvežimas',
    description: 'Išvežame senus baldus, statybines atliekas, pakuotes ar kitus nereikalingus daiktus utilizuoti.',
    image: '/images/atliekos.webp'
  }
];

const WhyChooseUs = ({ inView }: { inView: boolean }) => {
  const [activeService, setActiveService] = useState<string>('moving');

  const activeContent = serviceContents.find(content => content.id === activeService);

  return (
    <div className="container mx-auto px-4 py-16 pt-20">
      {/* Title buttons with stagger animation */}
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Connected buttons container with background */}
          <div className="relative bg-white/40 backdrop-blur-[2px] rounded-lg border border-[#BB0003] p-1">
            {/* Sliding background */}
            <motion.div
              className="absolute inset-1 bg-[#BB0003] rounded-md"
              initial={{ width: '25%' }}
              animate={{ 
                left: `calc(${serviceContents.findIndex(s => s.id === activeService) * 25}% + 4px)`,
                width: 'calc(25% - 8px)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            {/* Buttons */}
            <div className="grid grid-cols-4 relative">
              {serviceContents.map((service, index) => (
                <motion.button
                  key={service.id}
                  className={`px-4 py-1.5 transition-colors w-full text-sm z-10
                    ${activeService === service.id 
                      ? 'text-white'
                      : 'text-[#2A2D35] hover:text-[#BB0003]'
                    }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  onClick={() => setActiveService(service.id)}
                >
                  {service.buttonText}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main image container */}
      <motion.div
        className="max-w-4xl mx-auto mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="rounded-[10px] border border-[#BB0003] overflow-hidden h-[500px] relative">
          <motion.div
            key={activeContent?.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={activeContent?.image || '/images/man.webp'}
              alt={activeContent?.title || ''}
              width={1200}
              height={500}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            key={activeContent?.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-[10px] left-[10px] right-[10px] bg-[#FCFCFC]/80 backdrop-blur-[2px] rounded-[8px] p-4"
          >
            <h3 className="text-xl font-medium text-[#2A2D35] mb-2">
              {activeContent?.title}
            </h3>
            <p className="text-gray-600">
              {activeContent?.description}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom containers */}
      <div className="flex gap-3 max-w-4xl mx-auto">
        {/* Left container */}
        <motion.div
          className="flex-[3] bg-[#BB0003] rounded-[8px] p-4 min-h-[120px] text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-base font-light mb-2">
            Kodėl verta rinktis "Mes Jau Čia" ?
          </h3>
          <p className="leading-relaxed text-xs">
            Mūsų komandoje dirba tik patyrę ir profesionalūs darbuotojai, kurie supranta, 
            kad sklandus ir greitas darbų atlikimas yra būtinas kiekvienam klientui.
          </p>
        </motion.div>

        {/* Right container */}
        <motion.div
          className="flex-[2] bg-white border border-[#BB0003] rounded-[8px] p-4 min-h-[120px] flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-600 leading-relaxed text-xs flex-grow">
            Ši kompleksinė paslaugų sistema leidžia mums būti tikru Jūsų pagalbininku 
            ir sutaupyti brangų laiką, eliminuojant poreikį ieškoti skirtingų tiekėjų 
            skirtingoms užduotims.
          </p>
          <div className="flex justify-end">
            <button className="mt-2 px-4 py-1.5 bg-[#2A2D35] text-white rounded-md hover:bg-black transition-colors text-xs">
              Susisiekite
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const reasons = [
  {
    title: "Patirtis",
    description: "Ilgametė patirtis perkraustymo srityje užtikrina aukščiausią paslaugų kokybę.",
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.3H3.73L12 5.45z"/></svg>
  },
  {
    title: "Profesionalumas",
    description: "Mūsų komanda - kvalifikuoti specialistai, pasirengę spręsti sudėtingiausius iššūkius.",
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
  },
  {
    title: "Modernios Technologijos",
    description: "Naudojame pažangiausią įrangą ir transporto priemones saugiam krovinių gabenimui.",
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
  }
];

export default WhyChooseUs;
