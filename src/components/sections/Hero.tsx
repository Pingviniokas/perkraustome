"use client";

import { useState } from 'react';
import { MapPin, Calendar, Shield, ArrowRight, Package, Users, Truck, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';

const VideoBackground = dynamic(() => import('./VideoBackground'), { ssr: false });

const Hero = () => {
  const [moveSize, setMoveSize] = useState('');

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <VideoBackground />
      </div>

      {/* Main Content */}
      <div className="relative z-20 pt-48 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-7xl font-bold leading-tight tracking-tight text-white">
                Professional
                <br />
                <span className="text-red-500">Moving</span>
                <br />
                Services
              </h1>

              <p className="text-xl text-gray-200 max-w-lg leading-relaxed">
                Experience seamless relocation with real-time tracking and premium moving services tailored to your needs.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {[
                  { icon: <Truck />, title: 'Local Moving', desc: 'Same-day available' },
                  { icon: <Shield />, title: 'Fully Insured', desc: 'Protected moves' },
                  { icon: <Users />, title: 'Expert Team', desc: 'Professional movers' },
                  { icon: <Clock />, title: '24/7 Support', desc: 'Always available' }
                ].map((feature, index) => (
                  <div key={index} className="group p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 hover:border-red-600 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-red-50 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
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
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Get Your Moving Quote</h2>
              <div className="space-y-6">
                <div className="relative group">
                  <MapPin className="absolute left-4 top-3.5 text-red-600 w-5 h-5 transition-transform group-hover:scale-110" />
                  <input
                    type="text"
                    placeholder="Moving From"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all hover:border-red-600"
                  />
                </div>

                <div className="relative group">
                  <MapPin className="absolute left-4 top-3.5 text-red-600 w-5 h-5 transition-transform group-hover:scale-110" />
                  <input
                    type="text"
                    placeholder="Moving To"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all hover:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <Package className="absolute left-4 top-3.5 text-red-600 w-5 h-5" />
                    <select 
                      value={moveSize}
                      onChange={(e) => setMoveSize(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all hover:border-red-600 appearance-none bg-white"
                    >
                      <option value="">Select Size</option>
                      <option value="studio">Studio</option>
                      <option value="1bed">1 Bedroom</option>
                      <option value="2bed">2-3 Bedrooms</option>
                      <option value="4bed">4+ Bedrooms</option>
                    </select>
                  </div>

                  <div className="relative group">
                    <Calendar className="absolute left-4 top-3.5 text-red-600 w-5 h-5" />
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all hover:border-red-600"
                    />
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white p-4 rounded-xl hover:from-red-700 hover:to-red-600 transition-all transform group flex items-center justify-center gap-2">
                  Calculate Cost
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
