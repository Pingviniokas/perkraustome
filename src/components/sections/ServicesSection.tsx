"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Truck, 
  Building2, 
  Globe,  
  Users, 
  Wrench, 
  Box, 
  Trash2,
  HardHat,
  PartyPopper,
  Presentation,
  Boxes,
  Forklift,
  Plane,
  Factory
} from 'lucide-react';

const popularServices = [
  {
    id: '01',
    title: 'Perkraustymo paslaugos',
    icon: <Truck className="w-6 h-6" />,
    description: 'Profesionalus ir saugus daiktų perkraustymas su patikima komanda.',
    image: '/images/per.jpeg',
    url: '/services/moving'
  },
  {
    id: '02',
    title: 'Įmonių perkraustymas',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Kompleksinis biurų ir įmonių perkraustymas, užtikrinant veiklos tęstinumą.',
    image: '/images/im.jpeg',
    url: '/services/business-moving'
  },
  {
    id: '03',
    title: 'Krovinių pervežimas',
    icon: <Box className="w-6 h-6" />,
    description: 'Saugus ir patikimas krovinių gabenimas visoje Lietuvoje.',
    image: '/images/ate.jpeg',
    url: '/services/freight'
  },
  {
    id: '04',
    title: 'Tarpmiestiniai perkraustymai',
    icon: <Truck className="w-6 h-6" />,
    description: 'Profesionalus perkraustymas tarp Lietuvos miestų.',
    image: '/images/fi.jpeg',
    url: '/services/intercity'
  },
  {
    id: '05',
    title: 'Tarptautiniai perkraustymai',
    icon: <Globe className="w-6 h-6" />,
    description: 'Patikimas perkraustymas į užsienio šalis ir iš jų.',
    image: '/images/pe.jpeg',
    url: '/services/international'
  }
];

const otherServices = [
  {
    id: '06',
    title: 'Fiskaro paslaugos',
    icon: <Factory className="w-6 h-6" />,
    description: 'Krovinių kėlimo ir pervežimo paslaugos su fiskaru.',
    url: '/services/fiskaro'
  },
  {
    id: '07',
    title: 'Nereikalingų daiktų išvežimas',
    icon: <Trash2 className="w-6 h-6" />,
    description: 'Operatyvus nereikalingų daiktų išvežimas ir utilizavimas.',
    url: '/services/junk-removal'
  },
  {
    id: '08',
    title: 'Statybinių atliekų išvežimas',
    icon: <HardHat className="w-6 h-6" />,
    description: 'Statybinių atliekų surinkimas ir išvežimas iš statybviečių.',
    url: '/services/construction-waste'
  },
  {
    id: '09',
    title: 'Krovikų paslaugos',
    icon: <Users className="w-6 h-6" />,
    description: 'Profesionalių krovikų komanda Jūsų paslaugoms.',
    url: '/services/loaders'
  },
  {
    id: '10',
    title: 'Renginių aptarnavimas',
    icon: <PartyPopper className="w-6 h-6" />,
    description: 'Pilnas renginių logistikos aptarnavimas.',
    url: '/services/events'
  },
  {
    id: '11',
    title: 'Parodų aptarnavimas',
    icon: <Presentation className="w-6 h-6" />,
    description: 'Parodų įrangos transportavimas ir montavimas.',
    url: '/services/exhibitions'
  },
  {
    id: '12',
    title: 'Montavimo darbai',
    icon: <Wrench className="w-6 h-6" />,
    description: 'Profesionalūs baldų ir įrangos montavimo darbai.',
    url: '/services/assembly'
  },
  {
    id: '13',
    title: 'Negabaritinių krovinių pervežimas',
    icon: <Forklift className="w-6 h-6" />,
    description: 'Didelių gabaritų krovinių transportavimas.',
    url: '/services/oversized'
  },
  {
    id: '14',
    title: 'Pakavimo medžiagos',
    icon: <Boxes className="w-6 h-6" />,
    description: 'Kokybiškas pakavimo medžiagos Jūsų daiktams.',
    url: '/services/packing-materials'
  },
  {
    id: '15',
    title: 'Asmenų pervežimas iš/į oro uostų',
    icon: <Plane className="w-6 h-6" />,
    description: 'Patogus keliautojų pervežimas į/iš oro uostų.',
    url: '/services/airport-transfer'
  }
];

const ServicesSection = () => {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Mūsų Paslaugos</h2>

        {/* Popular Services Horizontal Scroll */}
        <div className="mb-16">
          <div className="card-container">
            {popularServices.map((service) => (
              <Link key={service.id} href={service.url} className="card">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-72 h-96 relative overflow-hidden rounded-xl group"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-6 w-full">
                      <div className="flex items-center mb-3">
                        <div className="text-white/90 mr-3">{service.icon}</div>
                        <h3 className="text-xl font-bold text-white/90">{service.title}</h3>
                      </div>
                      <p className="text-white/80 text-sm mb-4 line-clamp-3">{service.description}</p>
                      <div className="inline-flex items-center text-red-400 font-semibold">
                        Sužinoti daugiau
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Other Services Grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold mb-8 text-center">Kitos paslaugos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {otherServices.map((service) => (
              <Link key={service.id} href={service.url}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center mb-3">
                    <div className="text-red-500 mr-3">{service.icon}</div>
                    <h4 className="font-semibold text-gray-900">{service.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          display: flex;
          overflow-x: auto;
          gap: 24px;
          padding: 20px 0;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }

        .card-container::-webkit-scrollbar {
          height: 8px;
        }

        .card-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .card-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        .card-container::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .card {
          flex: 0 0 auto;
          width: 288px;
          height: 384px;
          position: relative;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
