"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRightIcon } from 'lucide-react';

const services = [
  {
    category: "Perkraustymo Paslaugos",
    href: "/perkraustymo-paslaugos",
    items: [
      { title: "Vietiniai perkraustymai", href: "/perkraustymo-paslaugos/vietiniai-perkraustymai" },
      { title: "Tarpmiestinis perkraustymas", href: "/perkraustymo-paslaugos/tarpmiestinis-perkraustymas" },
      { title: "Tarptautiniai perkraustymai", href: "/perkraustymo-paslaugos/tarptautiniai-perkraustymai" },
      { title: "Įmonių perkraustymas", href: "/perkraustymo-paslaugos/imoniu-perkraustymas" }
    ]
  },
  {
    category: "Pervežimo Paslaugos",
    href: "/pervezimo-paslaugos",
    items: [
      { title: "Baldų pervežimas", href: "/pervezimo-paslaugos/baldu-pervezimas" },
      { title: "Daiktų pervežimas", href: "/pervezimo-paslaugos/daiktu-pervezimas" },
      { title: "Pianinų pervežimas", href: "/pervezimo-paslaugos/pianinu-pervezimas" },
      { title: "Express pervežimas", href: "/pervezimo-paslaugos/express-pervezimas" }
    ]
  },
  {
    category: "Fiskaro paslaugos",
    href: "/fiskaro-manipuliatoriaus-paslaugos",
    items: [
      { title: "Fiskaro nuoma", href: "/fiskaro-manipuliatoriaus-paslaugos/fiskaro-nuoma" },
      { title: "Garažų pervežimas", href: "/fiskaro-manipuliatoriaus-paslaugos/garazu-pervezimas" },
      { title: "Negabaritinių krovinių pervežimas", href: "/fiskaro-manipuliatoriaus-paslaugos/negabaritiniu-kroviniu-pervezimas" }
    ]
  },
  {
    category: "Utilizavimo Paslaugos",
    href: "/utilizavimo-paslaugos",
    items: [
      { title: "Buitinės technikos išvežimas", href: "/utilizavimo-paslaugos/buitines-technikos-isvezimas" },
      { title: "Senų baldų išvezimas", href: "/utilizavimo-paslaugos/senu-baldu-isvezimas" },
      { title: "Stabiagabaričių šiukšlių išvežimas", href: "/utilizavimo-paslaugos/stambiagabariciu-siuksliu-isvezimas" },
      { title: "Statybinių atliekų išvežimas", href: "/utilizavimo-paslaugos/statybiniu-atlieku-isvezimas" }
    ]
  },
  {
    category: "Kitos Paslaugos",
    href: "/kitos-paslaugos",
    items: [
      { title: "Informacija Ruošiama", href: "/kitos-paslaugos/kitos1" },
      { title: "Informacija Ruošiama", href: "/kitos-paslaugos/kitos2" },
      { title: "Informacija Ruošiama", href: "/kitos-paslaugos/kitos3" },
      { title: "Informacija Ruošiama", href: "/kitos-paslaugos/kitos4" },
    ]
  },
];

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesOpen(true);
    setIsNavHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
      setIsNavHovered(false);
    }, 200);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const AnimatedLogo = () => {
    const handleAnimationEnd = (e: React.AnimationEvent) => {
      if (e.animationName === 'logoFadeIn') {
        setIsAnimationComplete(true);
      }
    };

    return (
      <div 
        className={`w-[180px] h-[45px] ${
          isLoaded ? 'logo-animation' : 'opacity-0'
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        <Image
          src="/images/logoMJC.webp"
          alt="MJC Logo"
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          className="object-contain"
        />
      </div>
    );
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed w-full z-[50] top-0"
      >
        <div className="px-4 py-6">
          <div 
            className={`
              rounded-2xl overflow-hidden
              ${isLoaded ? 'nav-container' : 'opacity-0'}
              ${scrolled || isNavHovered ? 'glass-nav shadow-lg' : ''}
            `}
          >
            <div className="h-20 relative flex items-center justify-between">
              {/* Left Navigation */}
              <div className={`flex items-center gap-8 pl-8 nav-content ${
                isLoaded ? 'visible' : ''
              }`}>
                <div
                  className="nav-item-wrapper"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="/paslaugos" className="nav-item-modern text-gray-800">
                    Paslaugos
                    <span className="nav-item-indicator" />
                  </a>
                </div>
                <a href="/kainininkas" className="nav-item-modern text-gray-800">
                  Kainininkas
                  <span className="nav-item-indicator" />
                </a>
              </div>

              {/* Centered Logo */}
              <a 
                href="/"
                className={`absolute left-1/2 -translate-x-1/2 w-[180px] h-[45px] ${
                  isLoaded ? 'logo-animation' : 'opacity-0'
                }`}
              >
                <Image
                  src="/images/logoMJC.webp"
                  alt="MJC Logo"
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="object-contain"
                />
              </a>

              {/* Right Navigation */}
              <div className={`flex items-center gap-6 pr-8 nav-content ${
                isLoaded ? 'visible' : ''
              }`}>
                <a href="/apie-mus" className="nav-item-modern text-gray-800">
                  Apie Mus
                  <span className="nav-item-indicator" />
                </a>
                <a href="/kontaktai" className="nav-item-modern text-gray-800">
                  Kontaktai
                  <span className="nav-item-indicator" />
                </a>
                <button 
                  className="theme-toggle-button group"
                  aria-label="Perjungti tarp šviesios ir tamsios temos"
                >
                  <div className="toggle-slider">
                    <svg 
                      className="sun-icon" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="8" cy="8" r="4" fill="currentColor"/>
                      <path d="M8 0V2M8 14V16M16 8H14M2 8H0M13.7 2.3L12.3 3.7M3.7 12.3L2.3 13.7M13.7 13.7L12.3 12.3M3.7 3.7L2.3 2.3" 
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    
                    <svg 
                      className="moon-icon" 
                      width="14" 
                      height="14" 
                      viewBox="0 0 14 14" 
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M13 8.5C12.1 8.8 11.1 9 10 9C6.1 9 3 5.9 3 2C3 0.9 3.2 -0.1 3.5 -1C1.5 -0.1 0 1.7 0 4C0 7.9 3.1 11 7 11C9.3 11 11.1 9.5 12 7.5Z" 
                        fill="currentColor"/>
                    </svg>
                  </div>
                </button>
                <button 
                  className="px-6 py-2 text-gray-800 hover:text-gray-900 transition-colors"
                  aria-label="Pakeisti kalbą į lietuvių"
                >
                  LT
                </button>
              </div>
            </div>
          </div>
        </div>

        {isServicesOpen && !isMobileMenuOpen && (
          <div
            ref={menuRef}
            className="mega-menu-glass"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-5 gap-8">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className={`menu-column menu-column-${index + 1}`}
                  >
                    <a
                      href={service.href}
                      className="block text-lg font-medium text-gray-800 mb-4 hover:text-red-500 
                        transition-colors"
                    >
                      {service.category}
                    </a>
                    <div className="space-y-2">
                      {service.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          className="menu-item flex items-center gap-2 text-gray-600 hover:text-gray-800 
                            transition-colors py-1"
                        >
                          <ChevronRightIcon className="w-4 h-4 text-red-500/50 group-hover:text-red-500 
                            transition-colors" />
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
      </nav>

      {(isServicesOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[40] transition-all duration-500"
          style={{ top: '0px' }}
          onClick={() => {
            setIsServicesOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </>
  );
}