"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Building2, 
  Globe, 
  Package, 
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

const services = [
  {
    id: '01',
    title: 'Perkraustymo paslaugos',
    icon: <Truck className="w-6 h-6" />,
    description: 'Profesionalus ir saugus daiktų perkraustymas su patikima komanda.',
    category: 'moving'
  },
  {
    id: '02',
    title: 'Įmonių perkraustymas',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Kompleksinis biurų ir įmonių perkraustymas, užtikrinant veiklos tęstinumą.',
    category: 'business'
  },
  {
    id: '03',
    title: 'Krovinių pervežimas',
    icon: <Box className="w-6 h-6" />,
    description: 'Saugus ir patikimas krovinių gabenimas visoje Lietuvoje.',
    category: 'transport'
  },
  {
    id: '04',
    title: 'Tarpmiestiniai perkraustymai',
    icon: <Truck className="w-6 h-6" />,
    description: 'Profesionalus perkraustymas tarp Lietuvos miestų.',
    category: 'moving'
  },
  {
    id: '05',
    title: 'Tarptautiniai perkraustymai',
    icon: <Globe className="w-6 h-6" />,
    description: 'Patikimas perkraustymas į užsienio šalis ir iš jų.',
    category: 'moving'
  },
  {
    id: '06',
    title: 'Fiskaro paslaugos',
    icon: <Factory className="w-6 h-6" />,
    description: 'Krovinių kėlimo ir pervežimo paslaugos su fiskaru.',
    category: 'special'
  },
  {
    id: '07',
    title: 'Nereikalingų daiktų išvežimas',
    icon: <Trash2 className="w-6 h-6" />,
    description: 'Operatyvus nereikalingų daiktų išvežimas ir utilizavimas.',
    category: 'disposal'
  },
  {
    id: '08',
    title: 'Statybinių atliekų išvežimas',
    icon: <HardHat className="w-6 h-6" />,
    description: 'Statybinių atliekų surinkimas ir išvežimas iš statybviečių.',
    category: 'disposal'
  },
  {
    id: '09',
    title: 'Krovikų paslaugos',
    icon: <Users className="w-6 h-6" />,
    description: 'Profesionalių krovikų komanda Jūsų paslaugoms.',
    category: 'services'
  },
  {
    id: '10',
    title: 'Renginių aptarnavimas',
    icon: <PartyPopper className="w-6 h-6" />,
    description: 'Pilnas renginių logistikos aptarnavimas.',
    category: 'events'
  },
  {
    id: '11',
    title: 'Parodų aptarnavimas',
    icon: <Presentation className="w-6 h-6" />,
    description: 'Parodų įrangos transportavimas ir montavimas.',
    category: 'events'
  },
  {
    id: '12',
    title: 'Montavimo darbai',
    icon: <Wrench className="w-6 h-6" />,
    description: 'Profesionalūs baldų ir įrangos montavimo darbai.',
    category: 'services'
  },
  {
    id: '13',
    title: 'Negabaritinių krovinių pervežimas',
    icon: <Forklift className="w-6 h-6" />,
    description: 'Didelių gabaritų krovinių transportavimas.',
    category: 'transport'
  },
  {
    id: '14',
    title: 'Pakavimo medžiagos',
    icon: <Boxes className="w-6 h-6" />,
    description: 'Kokybiškas pakavimo medžiagos Jūsų daiktams.',
    category: 'supplies'
  },
  {
    id: '15',
    title: 'Asmenų pervežimas iš/į oro uostų',
    icon: <Plane className="w-6 h-6" />,
    description: 'Patogus keliautojų pervežimas į/iš oro uostų.',
    category: 'transport'
  }
];

const categories = [
  { id: 'all', label: 'Visos paslaugos' },
  { id: 'moving', label: 'Perkraustymas' },
  { id: 'transport', label: 'Pervežimai' },
  { id: 'business', label: 'Verslui' },
  { id: 'events', label: 'Renginiai' },
  { id: 'services', label: 'Paslaugos' },
  { id: 'disposal', label: 'Utilizavimas' }
];

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Mūsų Paslaugos</h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeCategory === category.id 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: parseInt(service.id) * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-4 left-4 text-2xl font-bold text-red-500/20 group-hover:text-red-500/40 transition-colors">
                {service.id}
              </div>
              <div className="p-8">
                <div className="mb-4 text-red-500 opacity-75 group-hover:opacity-100 transition-opacity">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;