'use client';

import { motion, animate, useTransform, MotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface AchievementsSectionProps {
  inView: boolean;
  scrollProgress: MotionValue<number>;
  onOpacityChange?: (opacity: number) => void;
}

const AchievementsSection = ({ inView, scrollProgress, onOpacityChange }: AchievementsSectionProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  // Fix the entrance and exit animations
  const sectionOpacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.8, 1],  // Start invisible, fade in by 20%, stay visible until 80%, fade out by 100%
    [0, 1, 1, 0]
  );

  // Add scale animation for smoother transition
  const sectionScale = useTransform(
    scrollProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  // Remove or adjust these animations that might be interfering
  // const valuesOpacity = useTransform(
  //   scrollProgress,
  //   [0, 0.2],
  //   [1, 0]
  // );

  // const contentOpacity = useTransform(
  //   scrollProgress,
  //   [0, 0.15],
  //   [1, 0]
  // );

  // Keep other animations but adjust their timing
  const titleY = useTransform(
    scrollProgress,
    [0.2, 0.4, 0.8, 1],
    [50, 0, 0, 50]
  );

  const contentScale = useTransform(
    scrollProgress,
    [0.2, 0.4, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );

  const leftContentX = useTransform(
    scrollProgress,
    [0.1, 0.3, 0.7, 0.9],
    [-100, 0, 0, -100]
  );

  const rightContentX = useTransform(
    scrollProgress,
    [0.1, 0.3, 0.7, 0.9],
    [100, 0, 0, 100]
  );

  const bottomContentY = useTransform(
    scrollProgress,
    [0.1, 0.3, 0.7, 0.9],
    [50, 0, 0, 50]
  );

  // Add opacity change listener
  useEffect(() => {
    if (onOpacityChange) {
      return sectionOpacity.onChange(onOpacityChange);
    }
  }, [sectionOpacity, onOpacityChange]);

  // Counter animation
  useEffect(() => {
    if (inView && counterRef.current) {
      const node = counterRef.current;
      const controls = animate(0, 9000, {
        duration: 2,
        onUpdate(value) {
          node.textContent = Math.round(value).toString();
        },
      });
      return () => controls.stop();
    }
  }, [inView]);

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      style={{ 
        opacity: sectionOpacity,
        scale: sectionScale
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          style={{ scale: contentScale }}
        >
          {/* Title */}
          <motion.h2 
            className="text-3xl font-light mb-8 text-center"
            style={{ y: titleY }}
          >
            <span className="text-[#2A2D35]">"MES JAU ČIA" – </span>
            <span className="text-[#2A2D35]">SPRENDIMAS VISIEMS LOGISTIKOS IŠŠŪKIAMS</span>
          </motion.h2>

          {/* Text and Counter in one line */}
          <div className="flex gap-6 mb-8">
            {/* Left text */}
            <motion.div 
              className="flex-1 p-4 h-[120px]"
              style={{ x: leftContentX }}
            >
              <p className="text-gray-700 text-xs">
                ŽINOME, KAD KIEKVIENAS KLIENTAS TURI UNIKALIŲ POREIKIŲ IR IŠŠŪKIŲ, TODĖL 
                MŪSŲ PAGRINDINIS TIKSLAS YRA PADĖTI JUMS UŽTIKRINTAI ĮGYVENDINTI BET 
                KOKĮ LOGISTINĮ PROJEKTĄ. PASIŪLANT LANKSTŲ PASLAUGŲ SPEKTRĄ, AUKŠTĄ 
                KOKYBĘ IR PRIIMTINĄ KAINĄ, MŪSŲ KOMANDA – TAI DAUGIAU NEI 9 000 
                SĖKMINGŲ PROJEKTŲ PATIRTĮ SUKAUPĘ SPECIALISTAI, KURIŲ ATSIDAVIMAS 
                DARBUI IR PROFESIONALUMAS UŽTIKRINS:
              </p>
            </motion.div>

            {/* Counter */}
            <motion.div
              className="flex-1 bg-[#BB0003] rounded-lg p-4 h-[120px] flex flex-col justify-center"
              style={{ x: rightContentX }}
            >
              <div className="flex justify-center items-center">
                <span ref={counterRef} className="text-7xl font-light text-white">0</span>
                <span className="text-7xl font-light text-white">+</span>
              </div>
              <p className="text-xl font-light text-white">
                PADARYTŲ UŽSAKYMŲ
              </p>
            </motion.div>
          </div>

          {/* Grid of features */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            style={{ y: titleY }}
          >
            <div className="bg-white/90 rounded-lg p-6 h-[180px]">
              <div className="w-6 h-6 mb-3">
                <Image src="/images/icons/clock.png" alt="Clock" width={24} height={24} />
              </div>
              <h3 className="font-medium mb-2 text-sm">SKLANDŲ, BE STRESO PERKRAUSTYMO PROCESĄ:</h3>
              <p className="text-gray-600 text-sm">Sutaupysite laiko, nes visus darbus – nuo pakrovimo iki išpakavimo – patikėsite mums.</p>
            </div>

            <div className="bg-white/90 rounded-lg p-6 h-[180px]">
              <div className="w-6 h-6 mb-3">
                <Image src="/images/icons/chart.png" alt="Chart" width={24} height={24} />
              </div>
              <h3 className="font-medium mb-2 text-sm">PATIKIMĄ PASIRENGIMĄ NETIKĖTOMS SITUACIJOMS:</h3>
              <p className="text-gray-600 text-sm">Dėl darbo patirties ir vidinių procedūrų iš anksto įvertiname rizikas ir numatome geriausius sprendimus.</p>
            </div>

            <div className="bg-white/90 rounded-lg p-6 h-[180px]">
              <div className="w-6 h-6 mb-3">
                <Image src="/images/icons/settings.png" alt="Settings" width={24} height={24} />
              </div>
              <h3 className="font-medium mb-2 text-sm">GALIMYBĘ UŽSISAKYTI TIK TAS PASLAUGAS, KURIŲ JUMS REIKIA:</h3>
              <p className="text-gray-600 text-sm">Mūsų paslaugų paketai gali būti pritaikomi individualiai.</p>
            </div>

            <div className="bg-white/90 rounded-lg p-6 h-[180px]">
              <div className="w-6 h-6 mb-3">
                <Image src="/images/icons/chat.png" alt="Chat" width={24} height={24} />
              </div>
              <h3 className="font-medium mb-2 text-sm">PATOGŲ BENDRAVIMĄ IR PAGALBĄ IŠKILUS KLAUSIMAMS:</h3>
              <p className="text-gray-600 text-sm">Dedikuotas specialistas bus atsakingas už Jūsų projektą, kad visuomet žinotumėte, į ką kreiptis.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AchievementsSection; 