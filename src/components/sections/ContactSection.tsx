'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

type ContactMethod = 'phone' | 'email' | 'website' | 'social';

interface ContactInfo {
  text: string;
  contact: string;
  image: string;
}

const contactData: Record<ContactMethod, ContactInfo> = {
  phone: {
    text: 'Maloniai paskambinsime ir atsakysime į visus klausimus.',
    contact: '+370 63510000',
    image: '/images/icons/telefonu.png'
  },
  email: {
    text: 'Pateikite užklausą, pridėkite detalių apie krovinio apimtį ar paslaugų tipą, kurio ieškote, ir pateiksime Jums tikslų pasiūlymą.',
    contact: 'Info@mesjaucia.lt',
    image: '/images/icons/el-pastu.png'
  },
  website: {
    text: 'Užpildykite užsakymo formą nurodydami svarbiausią informaciją, o mes su Jumis susisieksime per artimiausią laiką.',
    contact: 'www.mesjaucia.lt',
    image: '/images/icons/tinklapyje.png'
  },
  social: {
    text: 'Sekite mūsų naujienas, susisiekite privačia žinute ir sužinokite daugiau apie mūsų teikiamus sprendimus.',
    contact: 'Mes Jau Čia',
    image: '/images/icons/socialiniai-tinklai.png'
  }
};

interface ContactSectionProps {
  inView: boolean;
  scrollProgress: MotionValue<number>;
  onOpacityChange?: (opacity: number) => void;
}

const ContactSection = ({ inView, scrollProgress, onOpacityChange }: ContactSectionProps) => {
  const [activeMethod, setActiveMethod] = useState<ContactMethod>('phone');

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

  const titleY = useTransform(
    scrollProgress,
    [0.1, 0.3, 0.7, 0.9],
    [50, 0, 0, -50]
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

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      style={{ opacity: sectionOpacity }}
    >
      <div className="container mx-auto px-4">
        <motion.div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl font-light text-center mb-12"
            style={{ y: titleY }}
          >
            <span className="text-[#BB0003]">SUSISIEKITE</span>
            <span className="text-[#2A2D35]"> SU MUMIS JAU ŠIANDIEN!</span>
          </motion.h2>

          <div className="flex gap-8 mb-8">
            {/* Contact forms */}
            <motion.div 
              className="w-1/2 space-y-4"
              style={{ x: leftContentX }}
            >
              <button 
                className={`w-full rounded-lg p-4 text-left border transition-colors
                  ${activeMethod === 'phone' 
                    ? 'bg-[#E5E5E5] border-[#BB0003]' 
                    : 'bg-white border-transparent hover:bg-[#E5E5E5]'}`}
                onClick={() => setActiveMethod('phone')}
              >
                TELEFONU
              </button>
              <button 
                className={`w-full rounded-lg p-4 text-left border transition-colors
                  ${activeMethod === 'email' 
                    ? 'bg-[#E5E5E5] border-[#BB0003]' 
                    : 'bg-white border-transparent hover:bg-[#E5E5E5]'}`}
                onClick={() => setActiveMethod('email')}
              >
                EL. PAŠTU
              </button>
              <button 
                className={`w-full rounded-lg p-4 text-left border transition-colors
                  ${activeMethod === 'website' 
                    ? 'bg-[#E5E5E5] border-[#BB0003]' 
                    : 'bg-white border-transparent hover:bg-[#E5E5E5]'}`}
                onClick={() => setActiveMethod('website')}
              >
                PER SVETAINĘ
              </button>
              <button 
                className={`w-full rounded-lg p-4 text-left border transition-colors
                  ${activeMethod === 'social' 
                    ? 'bg-[#E5E5E5] border-[#BB0003]' 
                    : 'bg-white border-transparent hover:bg-[#E5E5E5]'}`}
                onClick={() => setActiveMethod('social')}
              >
                SOCIALINIUOSE TINKLUOSE
              </button>
            </motion.div>

            {/* Phone image container */}
            <motion.div 
              className="w-1/2 relative h-[232px]"
              style={{ x: rightContentX }}
            >
              <div className="absolute inset-0 flex items-center translate-x-8">
                <Image 
                  src={contactData[activeMethod].image}
                  alt="Contact method"
                  width={300}
                  height={300}
                  className="object-contain h-full"
                />
              </div>
            </motion.div>
          </div>

          {/* Contact info box */}
          <motion.div 
            className="bg-[#E5E5E5] rounded-lg p-4 flex justify-between items-center mb-8 border border-[#BB0003]"
            style={{ y: bottomContentY }}
          >
            <span className="text-xs text-gray-600 max-w-[70%]">
              {contactData[activeMethod].text}
            </span>
            <span className="text-[#BB0003] font-medium text-sm">
              {contactData[activeMethod].contact}
              {activeMethod === 'social' && (
                <div className="flex gap-2 mt-1">
                  <Image src="/images/icons/facebook.png" alt="Facebook" width={24} height={24} />
                  <Image src="/images/icons/instagram.png" alt="Instagram" width={24} height={24} />
                </div>
              )}
            </span>
          </motion.div>

          {/* Description boxes */}
          <motion.div 
            className="bg-white/60 rounded-lg p-6 space-y-4 mb-12 border border-[#C1191C]"
            style={{ y: bottomContentY }}
          >
            <p className="text-xs text-gray-600">
              Nesvarbu, ar planuojate nedidelį buto perkraustymą, ar ruošiatės didelo biuro persikraustymui, "Mes Jau Čia" 
              visuomet pasirengs padėti. Jeigu Jums kyla klausimų dėl specifinių krovinių, norite užsisakyti fiskaro nuomą ar ieškote 
              greito sprendimo atlikų išvežimus, kreipkitės į mus – sutarsime efektyviausią būdą išspręsti net pačius sudėtingiausius 
              logistikos uždavinius.
            </p>
            <p className="text-xs text-gray-600">
              "Mes Jau Čia" – tai daugiau nei įprasta transporto ar perkraustymo įmonė. Tai patikimas partneris, kuris pasirūpins 
              Jumis nuo pirmojo skambučio iki darbų pabaigos, leisdamas mėgautis ramybe, patogumu bei aukščiausios kokybės 
              rezultatais.
            </p>
          </motion.div>

          {/* Bottom text */}
          <motion.div 
            className="text-center"
            style={{ y: bottomContentY }}
          >
            <p className="text-xl text-gray-700">
              PATIRKITE, KĄ REIŠKIA LENGVAS IR BE RŪPESČIŲ KRAUSTYMASIS AR DAIKTŲ 
              TRANSPORTAVIMAS – <span className="text-[#BB0003]">MES JAU ČIA</span>, KAD IŠPILDYTUME VISUS JŪSŲ 
              LŪKESČIUS IR UŽTIKRINTUME VISIŠKAI SKLANDŽIĄ PATIRTĮ!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactSection; 