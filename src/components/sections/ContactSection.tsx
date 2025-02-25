'use client';

import { motion } from 'framer-motion';

const ContactSection = ({ inView }: { inView: boolean }) => {
  return (
    <motion.div
      className="container mx-auto h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/30 backdrop-blur-[4px] rounded-lg p-8 border border-[#BB0003]">
        <h2 className="text-2xl font-light text-center text-[#2A2D35]">
          Susisiekite su mumis (Coming Soon)
        </h2>
      </div>
    </motion.div>
  );
};

export default ContactSection; 