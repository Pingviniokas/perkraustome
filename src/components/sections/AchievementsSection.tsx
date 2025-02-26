'use client';

import { motion, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const AchievementsSection = ({ inView }: { inView: boolean }) => {
  const counterRef = useRef<HTMLSpanElement>(null);

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
    <div className="container mx-auto px-4 py-16 pt-20">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <h2 className="text-3xl font-light mb-8 text-center">
          <span className="text-[#2A2D35]">"MES JAU ČIA" – </span>
          <span className="text-[#2A2D35]">SPRENDIMAS VISIEMS LOGISTIKOS IŠŠŪKIAMS</span>
        </h2>

        {/* Text and Counter in one line */}
        <div className="flex gap-6 mb-8">
          {/* Left text */}
          <div className="flex-1 p-4 h-[120px]">
            <p className="text-gray-700 text-xs">
              ŽINOME, KAD KIEKVIENAS KLIENTAS TURI UNIKALIŲ POREIKIŲ IR IŠŠŪKIŲ, TODĖL 
              MŪSŲ PAGRINDINIS TIKSLAS YRA PADĖTI JUMS UŽTIKRINTAI ĮGYVENDINTI BET 
              KOKĮ LOGISTINĮ PROJEKTĄ. PASIŪLANT LANKSTŲ PASLAUGŲ SPEKTRĄ, AUKŠTĄ 
              KOKYBĘ IR PRIIMTINĄ KAINĄ, MŪSŲ KOMANDA – TAI DAUGIAU NEI 9 000 
              SĖKMINGŲ PROJEKTŲ PATIRTĮ SUKAUPĘ SPECIALISTAI, KURIŲ ATSIDAVIMAS 
              DARBUI IR PROFESIONALUMAS UŽTIKRINS:
            </p>
          </div>

          {/* Counter */}
          <div className="flex-1 bg-[#BB0003] rounded-lg p-4 h-[120px] flex flex-col justify-center">
            <div className="flex justify-center items-center">
              <span ref={counterRef} className="text-7xl font-light text-white">0</span>
              <span className="text-7xl font-light text-white">+</span>
            </div>
            <p className="text-xl font-light text-white">
              PADARYTŲ UŽSAKYMŲ
            </p>
          </div>
        </div>

        {/* Grid of features */}
        <div className="grid grid-cols-2 gap-4">
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
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementsSection; 