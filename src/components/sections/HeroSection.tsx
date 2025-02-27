"use client";

import { motion, useTransform, MotionValue } from 'framer-motion';
import CompanyLogoSlider from './Slider';

interface HeroSectionProps {
  inView: boolean;
  scrollProgress: MotionValue<number>;
}

const HeroSection = ({ inView, scrollProgress }: HeroSectionProps) => {
  // Hero content exits first
  const heroContentOpacity = useTransform(
    scrollProgress,
    [0, 0.15],  // Content starts fading immediately and is gone by 15%
    [1, 0]
  );

  // Hero elements slide out with content
  const heroLeftContentX = useTransform(
    scrollProgress,
    [0, 0.15],
    [0, -100]
  );

  const heroRightContentX = useTransform(
    scrollProgress,
    [0, 0.15],
    [0, 100]
  );

  const heroSliderY = useTransform(
    scrollProgress,
    [0, 0.15],
    [0, 100]
  );

  // Video starts fading after content starts disappearing, and fades out slowly
  const heroOpacity = useTransform(
    scrollProgress,
    [0.1, 0.45],  // Video starts fading at 10% and is completely gone by 45%
    [1, 0]
  );

  const videoOverlayOpacity = useTransform(
    scrollProgress,
    [0.1, 0.4],
    [0.4, 0]
  );

  const sectionOpacity = useTransform(
    scrollProgress,
    [0, 0.4],  // Fade out by 40%
    [1, 0]
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: heroOpacity }}
      >
        <motion.div 
          className="absolute inset-0 bg-black"
          style={{ opacity: videoOverlayOpacity }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/mesjauciatitulinis.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="relative container h-full flex flex-col items-center justify-center"
        style={{ opacity: heroContentOpacity }}
      >
        <div className="flex gap-12 max-w-6xl mx-auto mt-[15vh]">
          {/* Left side - Main Title */}
          <motion.div 
            className="w-1/2"
            style={{ x: heroLeftContentX }}
          >
            <h1 className="text-5xl mb-4 uppercase">
              <span className="font-bold text-[#BB0003]">PERKRAUSTYMO</span>{' '}
              <span className="font-light text-[#232323]">PASLAUGOS</span>
            </h1>
            <p className="text-2xl uppercase text-[#828282]">
              Jūsų patikimas partneris visiems logistikos ir perkraustymo iššūkiams!
            </p>
          </motion.div>

          {/* Right side - Glassmorphism Box */}
          <motion.div 
            className="w-1/2"
            style={{ x: heroRightContentX }}
          >
            <div className="bg-white/10 backdrop-blur-[8px] border border-[#BB0003] rounded-lg p-8">
              <p className="text-white/90 leading-relaxed">
                Sveiki atvykę į "Mes Jau Čia" – įmonę, kurią drąsiai galite vadinti vienu iš patikimiausių ir profesionaliausių transporto bei perkraustymo paslaugų teikėjų Lietuvoje.
              </p>
              <br />
              <p className="text-white/90 leading-relaxed">
                Mūsų veiklos pagrindas – padėti žmonėms ir verslams efektyviai bei patogiai persikelti iš vienos vietos į kitą, pasirūpinti sunkių ar nestandartinių daiktų pervežimu, fiskaro nuoma, atliekų išvežimu, o prireikus – visapusiškai pasirūpinti kompleksiniu logistikos procesu. Esame pasiruošę greitai ir saugiai įgyvendinti visas Jūsų idėjas ar išspręsti sudėtingus logistikos iššūkius, nesvarbu, ar tai būtų nedidelis buto perkraustymas, ar stambaus verslo objektų perkėlimas.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Trust text and slider at bottom */}
        <motion.div 
          className="w-full mt-16"
          style={{ y: heroSliderY }}
        >
          <h2 className="text-2xl font-light text-white text-center mb-12">
            Mumis pasitiki:
          </h2>
          <CompanyLogoSlider />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection; 