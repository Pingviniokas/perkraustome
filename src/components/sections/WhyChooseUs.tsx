"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const WhyChooseUs = ({ inView }: { inView: boolean }) => {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.h2
        className="text-4xl font-light text-center text-[#2A2D35] mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        Kodėl Rinktis Mus?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="bg-white/40 backdrop-blur-[2px] rounded-lg p-6 border border-[#BB0003]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="h-12 w-12 mb-4 text-[#BB0003]">
              {reason.icon}
            </div>
            <h3 className="text-xl font-medium text-[#2A2D35] mb-2">{reason.title}</h3>
            <p className="text-gray-600">{reason.description}</p>
          </motion.div>
        ))}
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
