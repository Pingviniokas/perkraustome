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
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CompanyLogoSlider from '@/components/sections/Slider';
import HeroSection from '@/components/sections/HeroSection';

export default function Home() {
  // 1. First, declare all useState hooks
  const [activeSection, setActiveSection] = useState('hero');
  const [windowHeight, setWindowHeight] = useState(0);
  const [calculatorOpacity, setCalculatorOpacity] = useState(0);
  const [whyUsOpacity, setWhyUsOpacity] = useState(0);
  const [servicesOpacity, setServicesOpacity] = useState(0);
  const [valuesOpacity, setValuesOpacity] = useState(0);
  const [achievementsOpacity, setAchievementsOpacity] = useState(0);
  const [testimonialsOpacity, setTestimonialsOpacity] = useState(0);
  const [contactOpacity, setContactOpacity] = useState(0);

  // 2. Declare all refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroCalculatorRef = useRef<HTMLDivElement>(null);
  const calculatorWhyUsRef = useRef<HTMLDivElement>(null);
  const whyUsServicesRef = useRef<HTMLDivElement>(null);
  const servicesValuesRef = useRef<HTMLDivElement>(null);
  const valuesAchievementsRef = useRef<HTMLDivElement>(null);
  const achievementsTestimonialsRef = useRef<HTMLDivElement>(null);
  const testimonialsContactRef = useRef<HTMLDivElement>(null);
  
  // 3. Declare all useScroll hooks
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end start"]
  });

  // 4. Declare all useInView hooks
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5 });
  const { ref: calculatorRef, inView: calculatorInView } = useInView({ 
    threshold: 0.5,
    initialInView: false
  });
  const { ref: servicesRef, inView: servicesInView } = useInView({
    threshold: 0.5,
    initialInView: false
  });
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.5 });
  const { ref: achievementsRef, inView: achievementsInView } = useInView({ threshold: 0.5 });
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.5 });
  const { ref: whyUsRef, inView: whyUsInView } = useInView({ threshold: 0.5 });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ threshold: 0.5 });

  // 5. Declare transforms
  const backgroundOpacity = useTransform(
    scrollY,
    [0, windowHeight * 0.5],
    [0, 1]
  );

  // Hero content exits first (text and elements)
  const heroContentOpacity = useTransform(
    scrollYProgress,
    [0, 0.02], // Content fades out very quickly
    [1, 0]
  );

  // Hero elements slide out quickly
  const heroLeftContentX = useTransform(
    scrollYProgress,
    [0, 0.02],
    [0, -100]
  );

  const heroRightContentX = useTransform(
    scrollYProgress,
    [0, 0.02],
    [0, 100]
  );

  const heroSliderY = useTransform(
    scrollYProgress,
    [0, 0.02],
    [0, 100]
  );

  // Video fades out much later
  const heroOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.05], // Hero fades out completely before calculator appears
    [1, 0]
  );

  const videoOverlayOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.12], // Changed from [0.02, 0.06] to [0.04, 0.12]
    [0.4, 0]
  );

  // Add scroll progress for Hero/Calculator
  const { scrollYProgress: heroToCalculatorProgress } = useScroll({
    target: heroCalculatorRef,
    offset: ["start start", "end start"]
  });

  // Add scroll progress for Calculator/Why Choose Us
  const { scrollYProgress: calculatorWhyUsProgress } = useScroll({
    target: calculatorWhyUsRef,
    offset: ["start start", "end start"]
  });

  // Add scroll progress for Services/Values
  const { scrollYProgress: servicesValuesProgress } = useScroll({
    target: servicesValuesRef,
    offset: ["start start", "end start"]
  });

  // Add scroll progress for Values/Achievements
  const { scrollYProgress: valuesAchievementsProgress } = useScroll({
    target: valuesAchievementsRef,
    offset: ["start start", "75vh start"]
  });

  // Add scroll progress for Achievements/Testimonials
  const { scrollYProgress: achievementsTestimonialsProgress } = useScroll({
    target: achievementsTestimonialsRef,
    offset: ["start start", "75vh start"]
  });

  // Add scroll progress for Testimonials/Contact
  const { scrollYProgress: testimonialsContactProgress } = useScroll({
    target: testimonialsContactRef,
    offset: ["start start", "75vh start"]
  });

  // Add scroll progress for WhyUs/Services
  const { scrollYProgress: whyUsServicesProgress } = useScroll({
    target: whyUsServicesRef,
    offset: ["start start", "end start"]
  });

  // 6. Declare all useEffects
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (heroInView) setActiveSection('hero');
    else if (calculatorInView) setActiveSection('calculator');
    else if (whyUsInView) setActiveSection('why-us');
    else if (servicesInView) setActiveSection('services');
    else if (valuesInView) setActiveSection('values');
    else if (achievementsInView) setActiveSection('achievements');
    else if (testimonialsInView) setActiveSection('testimonials');
    else if (contactInView) setActiveSection('contact');
  }, [heroInView, calculatorInView, whyUsInView, servicesInView, valuesInView, 
      achievementsInView, testimonialsInView, contactInView]);

  useEffect(() => {
    console.log('Section visibility:', {
      hero: heroInView,
      calculator: calculatorInView,
      whyUs: whyUsInView,
      services: servicesInView,
      values: valuesInView,
      achievements: achievementsInView,
      testimonials: testimonialsInView,
      contact: contactInView
    });
  }, [heroInView, calculatorInView, whyUsInView, servicesInView, valuesInView, 
      achievementsInView, testimonialsInView, contactInView]);

  return (
    <>
      <SectionNav 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      {/* Main scroll container */}
      <div ref={scrollContainerRef} className="relative w-full isolate">
        <div ref={heroCalculatorRef} className="relative h-[120vh]">
          <section 
            id="hero" 
            ref={heroRef} 
            className="fixed top-0 left-0 w-full h-screen z-[1000]"
            style={{
              pointerEvents: heroInView ? 'auto' : 'none',
              visibility: heroOpacity.get() <= 0.1 ? 'hidden' : 'visible',
              opacity: heroOpacity.get()
            }}
          >
            <div className="relative w-full h-full">
              <HeroSection inView={heroInView} scrollProgress={heroToCalculatorProgress} />
            </div>
          </section>
          
          <section 
            id="calculator" 
            ref={calculatorRef} 
            className="fixed top-0 left-0 w-full h-screen z-[900]"
            style={{
              pointerEvents: calculatorInView && heroOpacity.get() <= 0.1 ? 'auto' : 'none',
              visibility: calculatorOpacity === 0 ? 'hidden' : 'visible',
              opacity: calculatorOpacity
            }}
          >
            <div className="relative w-full h-full">
              <NewCalculator 
                inView={calculatorInView} 
                scrollProgress={heroToCalculatorProgress}
                onOpacityChange={setCalculatorOpacity}
              />
            </div>
          </section>
        </div>

        <div ref={calculatorWhyUsRef} className="relative h-[120vh]">
          <section 
            id="why-us" 
            ref={whyUsRef} 
            className="fixed top-0 left-0 w-full h-screen z-[800]"
            style={{
              pointerEvents: whyUsInView && calculatorOpacity <= 0.1 ? 'auto' : 'none',
              visibility: whyUsOpacity === 0 ? 'hidden' : 'visible',
              opacity: whyUsOpacity
            }}
          >
            <div className="relative w-full h-full">
              <WhyChooseUs 
                inView={whyUsInView} 
                scrollProgress={calculatorWhyUsProgress}
                onOpacityChange={setWhyUsOpacity}
              />
            </div>
          </section>
        </div>

        <div ref={whyUsServicesRef} className="relative h-[120vh]">
          <section 
            id="services" 
            ref={servicesRef} 
            className="fixed top-0 left-0 w-full h-screen z-[700]"
            style={{
              pointerEvents: servicesInView && whyUsOpacity <= 0.1 ? 'auto' : 'none',
              visibility: servicesOpacity === 0 ? 'hidden' : 'visible',
              opacity: servicesOpacity
            }}
          >
            <div className="relative w-full h-full">
              <ServicesSection 
                inView={servicesInView} 
                scrollProgress={whyUsServicesProgress}
                onOpacityChange={setServicesOpacity}
              />
            </div>
          </section>
        </div>

        <div ref={servicesValuesRef} className="relative h-[120vh]">
          <section 
            id="values" 
            ref={valuesRef} 
            className="fixed top-0 left-0 w-full h-screen z-[600]"
            style={{
              pointerEvents: valuesInView && servicesOpacity <= 0.1 ? 'auto' : 'none',
              visibility: valuesOpacity === 0 ? 'hidden' : 'visible',
              opacity: valuesOpacity
            }}
          >
            <div className="relative w-full h-full">
              <ValuesSection 
                inView={valuesInView} 
                scrollProgress={servicesValuesProgress}
                onOpacityChange={setValuesOpacity}
              />
            </div>
          </section>
        </div>

        <div ref={valuesAchievementsRef} className="relative h-[120vh]">
          <section 
            id="achievements" 
            ref={achievementsRef} 
            className="fixed top-0 left-0 w-full h-screen z-[500]"
            style={{
              pointerEvents: achievementsInView && valuesOpacity <= 0.1 ? 'auto' : 'none',
              visibility: achievementsOpacity === 0 ? 'hidden' : 'visible',
              opacity: achievementsOpacity
            }}
          >
            <div className="relative w-full h-full">
              <AchievementsSection 
                inView={achievementsInView} 
                scrollProgress={valuesAchievementsProgress}
                onOpacityChange={setAchievementsOpacity}
              />
            </div>
          </section>
        </div>

        <div ref={achievementsTestimonialsRef} className="relative h-[120vh]">
          <section 
            id="testimonials" 
            ref={testimonialsRef} 
            className="fixed top-0 left-0 w-full h-screen z-[400]"
            style={{
              pointerEvents: testimonialsInView && achievementsOpacity <= 0.1 ? 'auto' : 'none',
              visibility: testimonialsOpacity === 0 ? 'hidden' : 'visible',
              opacity: testimonialsOpacity
            }}
          >
            <div className="relative w-full h-full">
              <TestimonialsSection 
                inView={testimonialsInView} 
                scrollProgress={achievementsTestimonialsProgress}
                onOpacityChange={setTestimonialsOpacity}
              />
            </div>
          </section>
        </div>

        <div ref={testimonialsContactRef} className="relative h-[120vh]">
          <section 
            id="contact" 
            ref={contactRef} 
            className="fixed top-0 left-0 w-full h-screen z-[300]"
            style={{
              pointerEvents: contactInView && testimonialsOpacity <= 0.1 ? 'auto' : 'none',
              visibility: contactOpacity === 0 ? 'hidden' : 'visible',
              opacity: contactOpacity
            }}
          >
            <div className="relative w-full h-full">
              <ContactSection 
                inView={contactInView} 
                scrollProgress={testimonialsContactProgress}
                onOpacityChange={setContactOpacity}
              />
            </div>
          </section>
        </div>

        {/* Final spacer to ensure last section is visible */}
        <div className="h-screen" />
      </div>
    </>
  );
}
