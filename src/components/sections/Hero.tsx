"use client";

import { useState } from 'react';
import { Shield, Users, Truck, Clock } from 'lucide-react';
import TabsContainer from './TabsContainer';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('moving');

  return (
    <section className="relative overflow-hidden">
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Dark Overlay with dynamic opacity */}
        <div
          className={`absolute inset-0 bg-black z-10 transition-opacity duration-1000 ease-in-out ${activeTab === 'moving' ? 'opacity-30' : 'opacity-40'
            }`}
        />

        {/* Moving Video Background */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${activeTab === 'moving'
            ? 'scale-100 opacity-100'
            : 'scale-105 opacity-0'
            }`}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover transition-transform duration-1000 ease-out"
          >
            <source src="/videos/mov.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Disposal Video Background */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${activeTab === 'disposal'
            ? 'scale-100 opacity-100'
            : 'scale-105 opacity-0'
            }`}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover transition-transform duration-1000 ease-out"
          >
            <source src="/videos/disposal.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Crane Video Background */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${activeTab === 'crane'
            ? 'scale-100 opacity-100'
            : 'scale-105 opacity-0'
            }`}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover transition-transform duration-1000 ease-out"
          >
            <source src="/videos/crane.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-20 pt-[80px]">
        <div className="py-12 sm:py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Left Content */}
              <div className="space-y-6 transition-opacity duration-500 ease-out">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white transition-colors duration-500">
                  Profesionalios
                  <br />
                  <span className="bg-gradient-to-r from-[#8B0000] to-[#FF0000] text-transparent bg-clip-text inline-block">
                    Transporto
                  </span>
                  <br />
                  Paslaugos
                </h1>

                <p className="text-lg sm:text-xl text-gray-200 max-w-lg leading-relaxed transition-opacity duration-500">
                  Mūsų patyrusi komanda pasirūpins visais Jūsų kraustymo, bei pervežimo rūpesčiais.
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-6 max-w-xl">
                  {[
                    { icon: <Truck size={16} className="sm:w-6 sm:h-6" />, title: 'Kraustymo paslaugos', desc: 'Kiti nestandartiniai užsakymai' },
                    { icon: <Shield size={16} className="sm:w-6 sm:h-6" />, title: 'Draudimas', desc: 'Mes atsakome už Jūsų turtą' },
                    { icon: <Users size={16} className="sm:w-6 sm:h-6" />, title: 'Patyrusi komanda', desc: 'Taupome Jūsų laiką' },
                    { icon: <Clock size={16} className="sm:w-6 sm:h-6" />, title: 'Dirbame 24/7 ', desc: 'Atvykstame laiku' }
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="group p-2 sm:p-4 bg-white/90 rounded-xl border border-white/20 hover:border-red-600 transition-all duration-300 cursor-pointer"
                      style={{
                        transitionDelay: `${index * 50}ms`
                      }}
                    >
                      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-center sm:text-left">
                        <div className="p-1.5 sm:p-2 bg-red-50 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                          {feature.icon}
                        </div>
                        <div>
                          <h2 className="font-semibold text-gray-900 text-xs sm:text-base">{feature.title}</h2>
                          <p className="text-[10px] sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{feature.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Calculator Card */}
              <div className="relative rounded-2xl shadow-2xl transition-all duration-500 ease-in-out bg-gradient-to-b from-white/90 to-white/95 backdrop-filter mt-8 lg:mt-0">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Kainos skaičiuoklė</h2>
                  </div>
                  <TabsContainer onTabChange={setActiveTab} />
                </div>
                <div className="absolute -top-1 -bottom-1 -left-1 -right-1 bg-gradient-to-b from-red-50/100 to-transparent rounded-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Professional Image */}
      <div className="absolute bottom-0 right-5 z-30 hidden lg:block">
        <img
          src="/images/pers.png"
          alt="Service Professional"
          className="h-[350px] object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;