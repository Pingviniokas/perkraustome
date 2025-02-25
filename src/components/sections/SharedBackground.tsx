'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useScroll, useTransform } from 'framer-motion';
import NewCalculator from './NewCalculator';

const SharedBackground = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();

  // Background opacity based on scroll
  const backgroundOpacity = useTransform(
    scrollY,
    [0, window.innerHeight * 0.5],
    [0, 1]
  );

  // Ref for calculator section
  const { ref: calculatorRef, inView: calculatorInView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (calculatorInView) setActiveSection('calculator');
  }, [calculatorInView]);

  return (
    <div className="relative w-full">
      {/* Hero Section - Static */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/* Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover transition-transform duration-1000 ease-out"
          >
            <source src="/videos/mesjauciatitulinis.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div className="container relative z-20">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-5xl font-light text-white mb-4">
                Perkraustymo paslaugos
              </h1>
              <p className="text-2xl text-white/90">
                Jūsų patikimas partneris visiems logistikos ir perkraustymo iššūkiams!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-[8px] border border-[#BB0003] rounded-lg p-8">
              <p className="text-white/90 leading-relaxed">
                Sveiki atvykę į „Mes Jau Čia"...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Background */}
      <motion.div 
        className="fixed inset-0 bg-[#fafafa]"
        style={{ opacity: backgroundOpacity }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #9B0003 1px, transparent 1px),
              linear-gradient(to bottom, #9B0003 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            transform: 'rotate(-5deg) scale(1.5)',
          }}
        />
        
        {/* Europe Map */}
        <div className="absolute -right-[5%] top-1/2 -translate-y-1/2 w-[1600px] h-[1000px]">
          <div 
            className="w-full h-full opacity-[0.75]"
            style={{
              backgroundImage: 'url("/images/europe.svg")',
              backgroundSize: 'contain',
              backgroundPosition: 'right',
              backgroundRepeat: 'no-repeat',
              filter: 'contrast(150%) brightness(95%)',
            }}
          />
        </div>
      </motion.div>

      {/* Scrolling Container */}
      <div className="relative min-h-screen">
        {/* Calculator Section */}
        <div ref={calculatorRef} className="h-screen">
          <NewCalculator inView={calculatorInView} />
        </div>
      </div>
    </div>
  );
};

export default SharedBackground; 