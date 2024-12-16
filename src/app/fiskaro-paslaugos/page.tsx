"use client";

import { useState } from 'react';
import TabsContainer from './../../components/sections/TabsContainer'; 

const MovingPage = () => {
  const [activeTab, setActiveTab] = useState('distance'); // Default tab

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Hero Section */}
      <header className="relative h-[60vh] md:h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url('/images/fisk.webp')` }}>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">Fiskaro paslaugos</h1>
            <p className="text-lg md:text-xl mb-8">Effortless Moves, Delivered. Get a Free Quote Today!</p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md">
              Get a Free Quote
            </button>
          </div>
        </div>
      </header>

      {/* Calculator Section */}
      <section className="bg-white py-2 px-20 md:px-12 shadow-md relative -mt-16 md:-mt-12 z-10 rounded-lg mx-4 md:mx-16">
        
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Kainos skaičiuoklė</h2>
            </div>
            <TabsContainer onTabChange={setActiveTab} /> 
          </div>
          <div className="absolute -top-1 -bottom-1 -left-1 -right-1 bg-gradient-to-b from-red-50/10 to-transparent rounded-2xl -z-10"></div>
        
      </section>
    </div>
  );
};

export default MovingPage;