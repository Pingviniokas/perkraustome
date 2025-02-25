"use client";

import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/mesjauciatitulinis.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="container relative z-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Title */}
          <div className="text-center">
            <h1 className="text-5xl font-light text-white mb-4">
              Perkraustymo paslaugos
            </h1>
            <p className="text-2xl text-white/90">
              Jūsų patikimas partneris visiems logistikos ir perkraustymo iššūkiams!
            </p>
          </div>

          {/* Glassmorphism Box */}
          <div className="bg-white/10 backdrop-blur-[8px] border border-[#BB0003] rounded-lg p-8">
            <p className="text-white/90 leading-relaxed">
              Sveiki atvykę į „Mes Jau Čia" – įmonę, kurią drąsiai galite vadinti vienu iš patikimiausių ir profesionaliausių transporto bei perkraustymo paslaugų teikėjų Lietuvoje.
            </p>
            <br />
            <p className="text-white/90 leading-relaxed">
              Mūsų veiklos pagrindas – padėti žmonėms ir verslams efektyviai bei patogiai persikelti iš vienos vietos į kitą, pasirūpinti sunkių ar nestandartinių daiktų pervežimu, fiskaro nuoma, atliekų išvežimu, o prireikus – visapusiškai pasirūpinti kompleksiniu logistikos procesu. Esame pasiruošę greitai ir saugiai įgyvendinti visas Jūsų idėjas ar išspręsti sudėtingus logistikos iššūkius, nesvarbu, ar tai būtų nedidelis buto perkraustymas, ar stambaus verslo objektų perkėlimas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;