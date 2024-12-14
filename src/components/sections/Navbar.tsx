"use client";

import { useState, useEffect, useRef } from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface SubItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  href: string;
  subItems?: SubItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Perkraustymo Paslaugos",
    href: "/perkraustymo-paslaugos",
    subItems: [
      { title: "Vietiniai perkraustymai", href: "/vietiniai-perkraustymai" },
      { title: "Tarpmiestinis perkraustymas", href: "/tarpmiestinis-perkraustymas" },
      { title: "Tarptautiniai perkraustymai", href: "/tarptautiniai-perkraustymai" },
      { title: "Įmonių perkraustymas", href: "/imoniu-perkraustymas" }
    ]
  },
  {
    title: "Fiskaro paslaugos",
    href: "/fiskaro-paslaugos",
    subItems: [
      { title: "Fiskaro nuoma", href: "/fiskaro-nuoma" },
      { title: "Garažų pervežimas", href: "/garazu-pervezimas" },
      { title: "Negabaritinių krovinių pervežimas", href: "/negabaritiniu-kroviniu-pervezimas" }
    ]
  },
  {
    title: "Kitos paslaugos",
    href: "/kitos-paslaugos",
    subItems: [
      { title: "Baldų pervežimas", href: "/baldu-pervezimas" },
      { title: "Daiktų pervežimas", href: "/daiktu-pervezimas" },
      { title: "Pianinų pervežimas", href: "/pianinu-pervezimas" },
      { title: "Express pervežimas", href: "/express-pervezimas" }
    ]
  },
  { title: "Apie Mus", href: "/apie-mus" },
  { title: "Kontaktai", href: "/kontaktai" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsDropdownVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavItemHover = (index: number) => {
    setActiveDropdown(index);
    setIsDropdownVisible(true);
  };

  const handleNavLeave = (e: React.MouseEvent) => {
    const navElement = navRef.current;
    const dropdownElement = dropdownRef.current;
    const relatedTarget = e.relatedTarget as HTMLElement;

    if (!navElement?.contains(relatedTarget) && !dropdownElement?.contains(relatedTarget)) {
      setIsDropdownVisible(false);
      setActiveDropdown(null);
    }
  };

  return (
    <>
      <nav 
        ref={navRef} 
        className="fixed w-full z-[100] bg-white/95 backdrop-blur-sm"
        onMouseLeave={handleNavLeave}
      >
        {/* Keep existing top header code */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-12">
            <div className="lg:hidden h-20 flex items-center justify-between">
              <Image src="/logoMJC.webp" alt="MJC Logo" width={120} height={40} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="h-20 relative">
                <div className="absolute inset-0 flex items-center justify-between">
                  <div className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                    <EnvelopeIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">info@mesjaucia.lt</span>
                  </div>
                  <Image
                    src="/logoMJC.webp"
                    alt="MJC Logo"
                    width={230}
                    height={40}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">+370 63510000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block h-px bg-gray-200"></div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-white shadow-lg">
            <div className="py-2 space-y-1">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {item.title}
                  </button>
                  {item.subItems && activeDropdown === index && (
                    <div className="bg-gray-50">
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 px-4">
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors">
                  Kainininkas
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop menu */}
        <div
          className={`bg-white transition-all duration-300 hidden lg:block ${
            scrolled ? 'shadow-md py-2' : 'py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center">
              <div className="flex items-center gap-8">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative nav-item"
                    onMouseEnter={() => handleNavItemHover(index)}
                  >
                    <a
                      href={item.href}
                      className="text-gray-700 text-sm font-medium hover:text-red-600 transition-colors py-2"
                    >
                      {item.title}
                    </a>
                    {item.subItems && activeDropdown === index && isDropdownVisible && (
                      <div
                        ref={dropdownRef}
                        className="fixed left-0 right-0 w-full bg-white shadow-lg animate-dropdown"
                        style={{ top: '100%' }}
                      >
                        <div className="max-w-7xl mx-auto px-4 py-8">
                          <div className="flex flex-col items-center gap-6">
                            {item.subItems.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.href}
                                className="text-lg font-semibold text-gray-700 hover:text-red-600 transition-colors px-8 py-3 rounded-lg hover:bg-gray-50 w-fit"
                              >
                                {subItem.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="bg-red-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-red-700 transition-colors ml-8">
                Kainininkas
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isDropdownVisible && activeDropdown !== null && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-md z-[90]"
          onClick={() => {
            setIsDropdownVisible(false);
            setActiveDropdown(null);
          }}
        />
      )}
    </>
  );
}
