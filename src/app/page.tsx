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
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();

  // Fix window is not defined error
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Set window height after component mounts
    setWindowHeight(window.innerHeight);

    // Optional: Update on resize
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use windowHeight state instead of direct window access
  const backgroundOpacity = useTransform(
    scrollY,
    [0, windowHeight * 0.5],
    [0, 1]
  );

  // Refs for each section
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5 });
  const { ref: calculatorRef, inView: calculatorInView } = useInView({ 
    threshold: 0.5,
    margin: "-45% 0px -45% 0px"
  });
  const { ref: servicesRef, inView: servicesInView } = useInView({
    threshold: 0.7,
    margin: "-30% 0px -30% 0px"
  });
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.5 });
  const { ref: achievementsRef, inView: achievementsInView } = useInView({ threshold: 0.5 });
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.5 });

  // Update active section based on scroll
  useEffect(() => {
    if (heroInView) setActiveSection('hero');
    else if (calculatorInView && !servicesInView) setActiveSection('calculator');
    else if (servicesInView) setActiveSection('services');
    else if (valuesInView) setActiveSection('values');
    else if (achievementsInView) setActiveSection('achievements');
    else if (contactInView) setActiveSection('contact');
  }, [heroInView, calculatorInView, servicesInView, valuesInView, achievementsInView, contactInView]);

  // Add scroll container ref
  const scrollContainerRef = useRef(null);

  // Update scroll progress tracking with adjusted offset
  const { scrollYProgress: transitionProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end start"] // Changed to make calculator fully visible at start
  });

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
          className="relative h-[200vh]"
          id="transition-container"
          style={{ position: 'relative' }}
        >
          {/* Calculator Section */}
          <section 
            id="calculator" 
            ref={calculatorRef}
            className="sticky top-0 h-screen w-full z-20 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: useTransform(transitionProgress, 
                  [0, 0.2, 0.4],
                  [1, 1, 0]
                ),
                scale: useTransform(transitionProgress,
                  [0, 0.4],
                  [1, 0.95]
                )
              }}
            >
              <NewCalculator inView={calculatorInView} />
            </motion.div>
          </section>

          {/* Services Section */}
          <section 
            id="services" 
            ref={servicesRef}
            className="absolute top-[100vh] h-screen w-full z-20"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: useTransform(transitionProgress,
                  [0.4, 0.45, 0.5],
                  [0, 0.7, 1]
                ),
                scale: useTransform(transitionProgress,
                  [0.4, 0.5],
                  [1.02, 1]
                ),
                y: useTransform(transitionProgress,
                  [0.4, 0.5],
                  ['10%', '0%']
                )
              }}
            >
              <ServicesSection inView={servicesInView} />
            </motion.div>
          </section>
        </div>

        {/* Values Section */}
        <section id="values" ref={valuesRef} className="min-h-screen relative z-20">
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
