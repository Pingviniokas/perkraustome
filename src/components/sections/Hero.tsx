"use client";

import { Shield, Users, Truck, Clock } from 'lucide-react';
import TabsContainer from './TabsContainer';  // Updated import path

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/mb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Main Content */}
      <div className="relative z-20 pt-48 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-7xl font-bold leading-tight tracking-tight text-white">
                Profesionalios
                <br />
                <span className="text-red-500">Pervežimo</span>
                <br />
                Paslaugos
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
              <h2 className="text-2xl font-bold mb-6">Pervežimo kainos skaičiuotuvas </h2>
              <TabsContainer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;