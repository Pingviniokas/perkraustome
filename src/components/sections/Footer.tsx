"use client";

import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
  const menuItems = [
    {
      title: "Perkraustymo Paslaugos",
      items: [
        { title: "Vietiniai perkraustymai", href: "/vietiniai-perkraustymai" },
        { title: "Tarpmiestinis perkraustymas", href: "/tarpmiestinis-perkraustymas" },
        { title: "Tarptautiniai perkraustymai", href: "/tarptautiniai-perkraustymai" },
        { title: "Įmonių perkraustymas", href: "/imoniu-perkraustymas" }
      ]
    },
    {
      title: "Fiskaro paslaugos",
      items: [
        { title: "Fiskaro nuoma", href: "/fiskaro-nuoma" },
        { title: "Garažų pervežimas", href: "/garazu-pervezimas" },
        { title: "Negabaritinių krovinių pervežimas", href: "/negabaritiniu-kroviniu-pervezimas" }
      ]
    }
  ];

  return (
    <footer className="relative z-50 bg-white">
      <div className="max-w-7xl mx-auto px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Image src="/logoMJC.webp" alt="MJC Logo" width={180} height={60} />
            <p className="text-gray-600">
              Profesionalios pervežimo paslaugos visoje Lietuvoje ir užsienyje
            </p>
            <div className="flex gap-4">
              {[
                { icon: FaFacebook, href: "#", label: "Facebook" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaLinkedin, href: "#", label: "LinkedIn" }
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          {menuItems.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-gray-900 font-medium">{section.title}</h4>
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-red-600 transition-colors text-sm"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-gray-900 font-medium">Kontaktai</h4>
            <div className="space-y-4">
              <a href="tel:+37063510000" className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors">
                <PhoneIcon className="h-5 w-5" />
                <span>+370 63510000</span>
              </a>
              <a href="mailto:info@mesjaucia.lt" className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors">
                <EnvelopeIcon className="h-5 w-5" />
                <span>info@mesjaucia.lt</span>
              </a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Kainininkas
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Mes Jau Čia. Visos teisės saugomos.
            </p>
            <div className="flex gap-8">
              <a href="/privatumo-politika" className="text-gray-600 hover:text-red-600 text-sm transition-colors">
                Privatumo politika
              </a>
              <a href="/salygos" className="text-gray-600 hover:text-red-600 text-sm transition-colors">
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
