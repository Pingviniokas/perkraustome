"use client";

import { motion, useTransform, MotionValue } from 'framer-motion';
import { useEffect } from 'react';

interface TestimonialsSectionProps {
  inView: boolean;
  scrollProgress: MotionValue<number>;
  onOpacityChange?: (opacity: number) => void;
}

const TestimonialsSection = ({ inView, scrollProgress, onOpacityChange }: TestimonialsSectionProps) => {
  // Exit animations for Achievements
  const achievementsOpacity = useTransform(
    scrollProgress,
    [0, 0.2],
    [1, 0]
  );

  // Entrance animations for Testimonials
  const sectionOpacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const titleY = useTransform(
    scrollProgress,
    [0.1, 0.3, 0.7, 0.9],
    [50, 0, 0, -50]
  );

  const cardsY = useTransform(
    scrollProgress,
    [0.1, 0.3, 0.7, 0.9],
    [100, 0, 0, -100]
  );

  const cardsScale = useTransform(
    scrollProgress,
    [0.1, 0.3, 0.7, 0.9],
    [0.9, 1, 1, 0.9]
  );

  useEffect(() => {
    if (onOpacityChange) {
      return sectionOpacity.onChange(onOpacityChange);
    }
  }, [sectionOpacity, onOpacityChange]);

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      style={{ opacity: sectionOpacity }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-light text-center text-[#2A2D35] mb-12"
          style={{ y: titleY }}
        >
          Klientų Atsiliepimai
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ y: cardsY, scale: cardsScale }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white/40 backdrop-blur-[2px] rounded-lg p-6 border border-[#BB0003]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <p className="text-gray-600 mb-4">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="font-medium text-[#2A2D35]">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
                <div className="text-[#BB0003]">★★★★★</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const testimonials = [
  {
    name: "Jonas Kazlauskas",
    location: "Vilnius",
    text: "Puiki komanda! Greitai ir profesionaliai perkraustė visus mūsų biuro baldus. Rekomenduoju!"
  },
  {
    name: "Laura Petrauskienė",
    location: "Kaunas",
    text: "Labai patenkinta paslaugomis. Viskas buvo supakuota rūpestingai ir saugiai pristatyta."
  },
  {
    name: "Marius Jonaitis",
    location: "Klaipėda",
    text: "Operatyvus ir kokybiškas aptarnavimas. Tikri savo srities profesionalai."
  }
];

export default TestimonialsSection; 