"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    id: '01',
    title: 'Perkraustymo paslaugos',
    description: 'Profesionalus ir saugus daiktų perkraustymas su patikima komanda.',
    image: '/images/per.jpeg',
  },
  {
    id: '02',
    title: 'Įmonių perkraustymas',
    description: 'Kompleksinis biurų ir įmonių perkraustymas, užtikrinant veiklos tęstinumą.',
    image: '/images/im.jpeg',
  },
  {
    id: '03',
    title: 'Krovinių pervežimas',
    description: 'Saugus ir patikimas krovinių gabenimas visoje Lietuvoje.',
    image: '/images/ate.jpeg',
  },
  {
    id: '04',
    title: 'Tarpmiestiniai perkraustymai',
    description: 'Profesionalus perkraustymas tarp Lietuvos miestų.',
    image: '/images/fi.jpeg',
  },
  {
    id: '05',
    title: 'Tarptautiniai perkraustymai',
    description: 'Patikimas perkraustymas į užsienio šalis ir iš jų.',
    image: '/images/pe.jpeg',
  },
];

const BackgroundPattern = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <svg className="absolute w-full h-full opacity-5" viewBox="0 0 100 100">
      <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
      <rect width="100" height="100" fill="url(#grid)" />
    </svg>
    <div className="absolute -top-1/2 -left-1/2 w-full h-full transform rotate-12">
      <div className="w-full h-full bg-red-500 opacity-5" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
    </div>
  </div>
);

const ServiceCard = ({ service, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2 } },
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="relative overflow-hidden bg-white rounded-lg shadow-lg"
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/10 rotate-12" />
      <Image
        src={service.image}
        alt={service.title}
        width={400}
        height={300}
        className="w-full h-64 object-cover transform transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 p-6 w-full">
        <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
        <p className="text-gray-200 text-sm line-clamp-2">{service.description}</p>
      </div>
      <motion.div
        className="absolute inset-0 bg-red-600 flex items-center justify-center opacity-0"
        whileHover={{ opacity: 1 }}
      >
        <button className="px-6 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          Sužinoti daugiau
        </button>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <BackgroundPattern />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
          Mūsų <span className="text-red-600">Paslaugos</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
