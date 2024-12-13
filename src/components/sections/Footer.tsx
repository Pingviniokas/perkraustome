// Footer.tsx
"use client";

import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Image src="/logoMJC.webp" alt="MJC Logo" width={180} height={60} />
            <p className="text-gray-600 max-w-xs">
              Profesionalios pervežimo paslaugos visoje Lietuvoje ir užsienyje
            </p>
            <div className="flex gap-4">
              {["facebook", "instagram", "linkedin"].map((social) => (
                <motion.a
                  key={social}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  href={`#${social}`}
                >
                  <span className="sr-only">{social}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-gray-900 font-medium">Paslaugos</h4>
            <ul className="space-y-3">
              {[
                "Perkraustymo Paslaugos",
                "Fiskaro Paslaugos",
                "Baldų Pervežimas",
                "Express Pervežimas"
              ].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-gray-900 font-medium">Kontaktai</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-600">
                <PhoneIcon className="h-5 w-5" />
                <span>+370 63510000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <EnvelopeIcon className="h-5 w-5" />
                <span>info@mesjaucia.lt</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-gray-900 font-medium">Naujienlaiškis</h4>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Jūsų el. paštas"
                className="w-full px-4 py-2.5 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Prenumeruoti
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {currentYear} Mes Jau Čia. Visos teisės saugomos.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-600 hover:text-red-600 text-sm transition-colors">
                Privatumo politika
              </a>
              <a href="#" className="text-gray-600 hover:text-red-600 text-sm transition-colors">
                Sąlygos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
