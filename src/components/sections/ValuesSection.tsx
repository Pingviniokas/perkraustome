'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const ValuesSection = ({ inView }: { inView: boolean }) => {
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Title with stagger animation */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-light text-[#2A2D35] mb-2">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Perkraustymo paslaugos.
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Fiskaro nuoma.
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Krovimo paslaugos.
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Atliekų išvežimas.
          </motion.span>
        </h2>
      </motion.div>

      {/* Main image container */}
      <motion.div
        className="max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="rounded-[10px] border border-[#BB0003] overflow-hidden">
          <Image
            src="/images/man.png"
            alt="Man"
            width={800}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </motion.div>

      {/* Bottom containers */}
      <div className="flex gap-6 max-w-4xl mx-auto">
        {/* Left container */}
        <motion.div
          className="flex-1 bg-[#BB0003] rounded-[8px] p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Add content here */}
        </motion.div>

        {/* Right container */}
        <motion.div
          className="flex-1 bg-white border border-[#BB0003] rounded-[8px] p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Add content here */}
        </motion.div>
      </div>
    </div>
  );
};

export default ValuesSection; 