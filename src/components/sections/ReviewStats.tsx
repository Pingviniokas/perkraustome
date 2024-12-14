"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Review = {
  text: string
  author: string
}

const reviews = [
  {
    text: "Norime padėkoti įmonės MB LIUMIKAS direktoriui Valdui Liumarovui už Ilgalaikį ir operatyvų bendradarbiavimą, Lengvą ir sklandų darbų organizavimą, Nepriekaištingą transporto ir krovimo paslaugų atlikimą, Įmonės teikiamų paslaugų aukštos kokybės kontrolę.",
    author: "Bitė Lietuva"
  },
  {
    text: "Noriu pabrėžti, kaik smarkiai vertiname Jūsų paslaugas, kurios buvo efektyvios ir nepakeičiamos Ministro Pirmininko Benjamin Netanyahu vizito Lietuvoje metu. Noriu Jums asmeniškai už tai padėkoti. Izraelio ambasadorius",
    author: "Izraelio ambasada"
  }
] as const;

const stats = [
  { number: "9000+ ;) ", text: "Aptarnautų klientų" },
  { number: "10+", text: "metų patirtis" },
  { number: "4.7/5", text: "Įvertinimas" }
] as const;

const ReviewStats = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <blockquote className="text-gray-700 text-base font-light leading-relaxed italic">
                  „{reviews[currentReview].text}"
                </blockquote>
                <p className="text-gray-900 font-medium text-sm">
                  - {reviews[currentReview].author}
                </p>
              </motion.div>
            </AnimatePresence>
            
            <button 
              onClick={prevReview} 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full"
              aria-label="Previous review"
            >
              <FaChevronLeft className="text-gray-400 hover:text-gray-600" />
            </button>
            
            <button 
              onClick={nextReview} 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
              aria-label="Next review"
            >
              <FaChevronRight className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </span>
                <span className="text-sm text-gray-600 text-center">
                  {stat.text}
                </span>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewStats;
