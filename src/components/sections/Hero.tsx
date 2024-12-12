"use client";

import { useState } from 'react';
import { Shield, Users, Truck, Clock } from 'lucide-react';
import TabsContainer from './TabsContainer';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('moving');

  return (
    <section className="relative overflow-hidden">  {/* Fixed height for navbar */}
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Dark Overlay with dynamic opacity */}
        <div 
          className={`absolute inset-0 bg-black z-10 transition-opacity duration-1000 ease-in-out ${
            activeTab === 'moving' ? 'opacity-30' : 'opacity-40'
          }`} 
        />
        
        {/* Moving Video Background */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            activeTab === 'moving' 
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
            <source src="/videos/mb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Disposal Video Background */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            activeTab === 'disposal' 
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
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            activeTab === 'crane' 
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
      <div className="relative z-20 pt-[200px]">
        <div className="py-16"> {/* Changed py-16 to pt-10 pb-16 */}
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start"> {/* Changed to items-start */}
              {/* Left Content */}
              <div className="space-y-6 transition-opacity duration-500 ease-out">
                <h1 className="text-6xl font-bold leading-tight tracking-tight text-white transition-colors duration-500">
                  Profesionalios
                  <br />
                  <span className="text-red-500">Pervežimo</span>
                  <br />
                  Paslaugos
                </h1>

                <p className="text-xl text-gray-200 max-w-lg leading-relaxed transition-opacity duration-500">
                  Experience seamless relocation with real-time tracking and premium moving services tailored to your needs.
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  {[
                    { icon: <Truck />, title: 'Local Moving', desc: 'Same-day available' },
                    { icon: <Shield />, title: 'Fully Insured', desc: 'Protected moves' },
                    { icon: <Users />, title: 'Expert Team', desc: 'Professional movers' },
                    { icon: <Clock />, title: '24/7 Support', desc: 'Always available' }
                  ].map((feature, index) => (
                    <div 
                      key={index} 
                      className="group p-4 bg-white/90 rounded-xl border border-white/20 hover:border-red-600 transition-all duration-300 cursor-pointer"
                      style={{
                        transitionDelay: `${index * 50}ms`
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-red-50 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Calculator Card */}
              <div className="relative rounded-2xl shadow-2xl transition-all duration-500 ease-in-out bg-gradient-to-b from-white/90 to-white/95 backdrop-filter">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Kainos skaičiuotuvas</h2>
                  </div>
                  <TabsContainer onTabChange={setActiveTab} />
                </div>
                <div className="absolute -top-1 -bottom-1 -left-1 -right-1 bg-gradient-to-b from-red-50/100 to-transparent rounded-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;