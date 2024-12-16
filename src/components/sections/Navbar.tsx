"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRightIcon } from 'lucide-react';

const services = [
  {
    category: "Perkraustymo Paslaugos",
    href: "/perkraustymo-paslaugos",
    items: [
      { title: "Vietiniai perkraustymai", href: "/vietiniai-perkraustymai" },
      { title: "Tarpmiestinis perkraustymas", href: "/tarpmiestinis-perkraustymas" },
      { title: "Tarptautiniai perkraustymai", href: "/tarptautiniai-perkraustymai" },
      { title: "Įmonių perkraustymas", href: "/imoniu-perkraustymas" }
    ]
  },
  {
    category: "Fiskaro paslaugos",
    href: "/fiskaro-paslaugos",
    items: [
      { title: "Fiskaro nuoma", href: "/fiskaro-nuoma" },
      { title: "Garažų pervežimas", href: "/garazu-pervezimas" },
      { title: "Negabaritinių krovinių pervežimas", href: "/negabaritiniu-kroviniu-pervezimas" }
    ]
  },
  {
    category: "Kitos paslaugos",
    href: "/kitos-paslaugos",
    items: [
      { title: "Baldų pervežimas", href: "/baldu-pervezimas" },
      { title: "Daiktų pervežimas", href: "/daiktu-pervezimas" },
      { title: "Pianinų pervežimas", href: "/pianinu-pervezimas" },
      { title: "Express pervežimas", href: "/express-pervezimas" }
    ]
  }
];

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesOpen(true);
    setIsNavHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
      setIsNavHovered(false);
    }, 200);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed w-full z-[100] transition-all duration-700 ${isLoaded ? 'navbar-enter' : 'opacity-0'
          } ${scrolled || isNavHovered ? 'bg-white shadow-sm' : 'bg-transparent'
          }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 relative w-[200px] h-[50px]">
              <Image
                src="/logoMJC.webp"
                alt="MJC Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>

            {/* Desktop Navigation */}
            <div
              className="hidden lg:flex items-center space-x-12"
              onMouseEnter={() => setIsNavHovered(true)}
            >
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
              >
                <a
                  href="/paslaugos"
                  className={`font-semibold text-base transition-colors duration-300 ${scrolled || isNavHovered ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-400'
                    }`}
                >
                  Paslaugos
                </a>
              </div>

              <a
                href="/apie-mus"
                className={`font-semibold text-base transition-colors duration-300 ${scrolled || isNavHovered ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-400'
                  }`}
              >
                Apie Mus
              </a>
              <a
                href="/kontaktai"
                className={`font-semibold text-base transition-colors duration-300 ${scrolled || isNavHovered ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-400'
                  }`}
              >
                Kontaktai
              </a>
              <button className="bg-red-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition-colors duration-300">
                Kainininkas
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-300 ${scrolled || isNavHovered ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'
                  }`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Services Mega Menu */}
        {isServicesOpen && (
          <div
            ref={menuRef}
            className="absolute left-0 w-full bg-white shadow-xl z-[100] submenu-enter"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-3 gap-x-8">
                {services.map((service, index) => (
                  <div key={index} className={`flex flex-col column-enter column-enter-${index + 1}`}>
                    <a
                      href={service.href}
                      className="text-base font-semibold text-gray-900 mb-6 hover:text-red-600 transition-colors duration-300"
                    >
                      {service.category}
                    </a>
                    <div className="space-y-4">
                      {service.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          className={`flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300 group submenu-item-enter submenu-item-delay-${idx + 1}`}
                        >
                          <ChevronRightIcon className="w-4 h-4 mr-2 text-gray-400 group-hover:text-red-600 transition-colors duration-300" />
                          <span className="text-sm">{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full text-left px-3 py-2 text-base font-semibold text-gray-900 hover:text-red-600 transition-colors duration-300"
              >
                Paslaugos
              </button>
              {isServicesOpen && (
                <div className="pl-6 space-y-4 mt-2">
                  {services.map((service, index) => (
                    <div key={index} className="space-y-2">
                      <a
                        href={service.href}
                        className="font-semibold text-gray-900 text-base hover:text-red-600 transition-colors duration-300"
                      >
                        {service.category}
                      </a>
                      <div className="space-y-2">
                        {service.items.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className="flex items-center py-1 text-gray-600 hover:text-red-600 text-sm transition-colors duration-300"
                          >
                            <ChevronRightIcon className="w-4 h-4 mr-2" />
                            <span>{item.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <a href="/apie-mus" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:text-red-600 transition-colors duration-300">
                Apie Mus
              </a>
              <a href="/kontaktai" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:text-red-600 transition-colors duration-300">
                Kontaktai
              </a>
              <div className="pt-4">
                <button className="w-full bg-red-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition-colors duration-300">
                  Kainininkas
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Blur Overlay */}
      {isServicesOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-md z-[90]"
          style={{ top: '80px' }}
          onClick={() => setIsServicesOpen(false)}
        />
      )}
    </>
  );
}