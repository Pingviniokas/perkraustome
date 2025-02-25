"use client";

import { motion } from 'framer-motion';

const TestimonialsSection = ({ inView }: { inView: boolean }) => {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.h2
        className="text-4xl font-light text-center text-[#2A2D35] mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        Klientų Atsiliepimai
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white/40 backdrop-blur-[2px] rounded-lg p-6 border border-[#BB0003]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
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
      </div>
    </div>
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