'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useScroll, useTransform } from 'framer-motion';
import NewCalculator from '@/components/sections/NewCalculator';
import SectionNav from "@/components/shared/SectionNav";
import ServicesSection from '@/components/sections/ServicesSection';
import ValuesSection from '@/components/sections/ValuesSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  // 1. First, declare all useState hooks
  const [activeSection, setActiveSection] = useState('hero');
  const [windowHeight, setWindowHeight] = useState(0);

  // 2. Declare all refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // 3. Declare all useScroll hooks
  const { scrollY } = useScroll();
  const { scrollYProgress: transitionProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  // 4. Declare all useInView hooks
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5 });
  const { ref: calculatorRef, inView: calculatorInView } = useInView({ 
    threshold: 0.5
  });
  const { ref: servicesRef, inView: servicesInView } = useInView({
    threshold: 0.5
  });
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.5 });
  const { ref: achievementsRef, inView: achievementsInView } = useInView({ threshold: 0.5 });
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.5 });

  // 5. Declare transforms
  const backgroundOpacity = useTransform(
    scrollY,
    [0, windowHeight * 0.5],
    [0, 1]
  );

  // 6. Declare all useEffects
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (heroInView) setActiveSection('hero');
    else if (calculatorInView && !servicesInView) setActiveSection('calculator');
    else if (servicesInView) setActiveSection('services');
    else if (valuesInView) setActiveSection('values');
    else if (achievementsInView) setActiveSection('achievements');
    else if (contactInView) setActiveSection('contact');
  }, [heroInView, calculatorInView, servicesInView, valuesInView, achievementsInView, contactInView]);

  return (
    <>
      <SectionNav 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <div className="relative w-full overflow-x-hidden">
        {/* Hero Section - Static */}
        <section 
          id="hero" 
          ref={heroRef} 
          className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-full h-full object-cover"
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
          className="fixed inset-0 bg-[#fafafa] z-10"
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

        {/* Calculator and Services Container */}
        <div 
          ref={scrollContainerRef}
          className="relative w-full"
        >
          {/* Calculator Section */}
          <section 
            id="calculator" 
            ref={calculatorRef}
            className="h-screen relative z-20"
          >
            <div className="sticky top-0 w-full h-screen">
              <NewCalculator inView={calculatorInView} />
            </div>
          </section>

          {/* Services Section */}
          <section 
            id="services" 
            ref={servicesRef}
            className="h-screen relative z-20"
          >
            <div className="sticky top-0 w-full h-screen">
              <ServicesSection inView={servicesInView} />
            </div>
          </section>
        </div>

        {/* Values Section */}
        <section id="values" ref={valuesRef} className="relative min-h-screen z-20">
          <ValuesSection inView={valuesInView} />
        </section>

        {/* Achievements Section */}
        <section id="achievements" ref={achievementsRef} className="min-h-screen relative z-20">
          <AchievementsSection inView={achievementsInView} />
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="min-h-screen relative z-20">
          <ContactSection inView={contactInView} />
        </section>
      </div>
      
    </>
  );
}
