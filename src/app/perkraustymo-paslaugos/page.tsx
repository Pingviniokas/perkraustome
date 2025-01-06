'use client';
import Image from 'next/image';
import { useState } from 'react';

const MovingServicesPage = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number>(0);

  const handleCardClick = (index: number): void => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  const cards = [
    {
      title: 'Ramybė ir saugumas',
      description: 'Mes suprantame, kad jūsų turtas turi ne tik materialinę, bet ir emocinę vertę. Todėl didžiausią dėmesį skiriame atsargumui, naudojame profesionalius pakavimo sprendimus, patikimus automobilius transportavimui, modernią techniką bei aukštos kvalifikacijos darbuotojų komandą.',
      image: '/images/3f.png'
    },
    {
      title: 'Patogumas ir kontrolė',
      description: '„Mes Jau Čia" rūpinasi, kad visa patirtis būtų kuo paprastesnė ir lengvesnė klientui. Greitas paslaugos užsakymas svetainėje, telefonu, el. paštu ar kitais kanalais, papildomi įrankiai, tokie kaip pakavimo brošiūros ir daiktų sąrašai, padeda klientui lengviau planuoti procesą.',
      image: '/images/3f.png'
    },
    {
      title: 'Reagavimas ir operatyvumas',
      description: 'Suprantame, kad laikas – brangiausias išteklius. Todėl imantis darbų reaguojame greitai: perkraustymo procesą galime pradėti per 1–3 dienas nuo užsakymo patvirtinimo, o dažnai ir tą pačią dieną. Viso proceso metu palaikome glaudų ryšį su klientu.',
      image: '/images/3f.png'
    }
  ];

  const services = [
    {
      title: 'Perkraustymo paslaugos Vilniuje',
      description: 'Sostinėje – didelis tempas, o laikas itin brangus. „Mes Jau Čia" komanda padeda gyventojams ir įmonėms Vilniuje ramiai persikraustyti į naujus namus, biurą ar sandėlį. Sumažiname rūpesčius, užtikriname, kad kiekvienas daiktas būtų saugiai pervežtas, o klientas galėtų mėgautis lengvu ir maloniu persikraustymu.',
      image: '/images/3f.png'
    },
    {
      title: 'Tarptautiniai perkraustymai',
      description: 'Persikelti į kitą šalį gali būti sudėtinga: skiriasi teisinė bazė, muitinės taisyklės, atstumai didesni, o logistika – sudėtingesnė. Mes užtikrinsime, kad jūsų daiktai sėkmingai pasiektų tikslą bet kurioje Europos šalyje.',
      image: '/images/3f.png'
    },
    {
      title: 'Tarpmiestiniai perkraustymai',
      description: 'Keičiant gyvenamąją vietą tarp skirtingų miestų, svarbu, kad viskas vyktų sklandžiai ir be nesklandumų. Mes pasirūpinsime, kad daiktai būtų tinkamai supakuoti, baldai išmontuoti ir vėl surinkti.',
      image: '/images/3f.png'
    },
    {
      title: 'Biuro-ofiso perkraustymo paslaugos',
      description: 'Persikraustant biurui, svarbu užtikrinti, kad darbas būtų kuo mažiau trikdomas. Siūlome profesionalų ofiso turto pakavimą, dokumentų sistemingą pervežimą, baldų išmontavimą bei sumontavimą.',
      image: '/images/3f.png'
    },
    {
      title: 'Sandėlio perkraustymas',
      description: 'Sandėlio perkraustymas reikalauja kruopštaus planavimo ir ypatingo dėmesio inventoriaus tvarkymui. Pasirūpinsime, kad kiekvienas sandėlio vienetas būtų tinkamai identifikuotas ir saugiai pervežtas.',
      image: '/images/3f.png'
    },
    {
      title: 'Namo perkraustymas',
      description: 'Nauji namai – naujas gyvenimo etapas. Mes padėsime šį žingsnį žengti be streso: kruopščiai supakuosime daiktus, atsargiai išmontuosime bei pervešime baldus, pasirūpinsime trapių daiktų apsauga.',
      image: '/images/3f.png'
    },
    {
      title: 'Buto perkraustymas',
      description: 'Buto perkraustymas reikalauja ypatingos logistikos dėl siaurų laiptinių ar liftų. Mūsų komanda pasiūlys optimalų sprendimą, kad persikraustymas į naują butą būtų be nereikalingo streso.',
      image: '/images/3f.png'
    }
  ];

  return (
    <main>
      {/* First Section */}
      <section className="relative min-h-screen w-full p-4">
        <div className="relative h-[calc(100vh-2rem)] w-full rounded-3xl border-2 border-red-100 overflow-hidden">
          <Image
            src="/images/3f.png"
            alt="Moving Services Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />

          <div className="absolute inset-0 flex items-center">
            <div className="ml-16">
              <div className="bg-white rounded-3xl p-12 shadow-lg w-[670px] min-h-[700px] relative">
                <div className="px-24">
                  <h1>
                    <span className="inline-block bg-gradient-to-r from-red-600 to-red-800 text-transparent bg-clip-text text-6xl font-bold leading-tight">
                      Perkraustymo
                    </span>
                    <span className="block text-6xl mt-2 leading-tight">
                      paslaugos
                    </span>
                  </h1>
                </div>

                <div className="bg-gray-200/95 rounded-3xl absolute bottom-2 left-2 right-2">
                  <div className="px-24 py-10">
                    <p className="text-gray-700 text-lg mb-8">
                      Perkraustymo paslaugos – daugiau nei daiktų pervežimas iš taško A į tašką B.
                      „Mes Jau Čia" komanda siekia užtikrinti, kad visas jūsų perkraustymo procesas
                      taptų lengvesnis, saugesnis ir malonesnis.
                    </p>

                    <button className="px-10 py-3 rounded-full border-2 border-red-500 text-red-600 
                      hover:bg-red-50 transition-all duration-300
                      shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]
                      text-lg">
                      Kainininkas
                    </button>

                    <hr className="my-8 border-gray-300" />

                    <p className="text-xs text-gray-500">
                      Mūsų patirtis viršija 9000 sėkmingų užsakymų, o moderni įranga, profesionali
                      komanda ir patikrinti darbo metodai užtikrina, kad viskas vyktų sklandžiai.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="relative min-h-screen w-full p-4">
        <div className="relative h-[calc(100vh-2rem)] w-full rounded-3xl border-2 border-red-100 overflow-hidden">
          <div className="absolute inset-0 bg-dots"></div>
          <div className="relative h-full">
            <div className="max-w-7xl mx-auto px-12 py-16">
              <h2 className="mb-16 px-24">
                <span className="block text-4xl">Mūsų požiūris į</span>
                <span className="block text-4xl text-red-600 font-bold mt-2">perkraustymo paslaugas</span>
              </h2>

              <div className="grid grid-cols-3 gap-8">
                {cards.map((card, index) => (
                  <div key={index} className="relative h-[400px] rounded-3xl overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className={`object-cover transition-all duration-500 ${
                        expandedCard === index ? 'blur-sm' : ''
                      }`}
                    />
                    
                    <div className={`absolute inset-0 bg-black/30 transition-all duration-500 ${
                      expandedCard === index ? 'opacity-70' : 'opacity-40'
                    }`} />

                    <div 
                      className={`absolute inset-x-0 bottom-0 bg-gray-200/90 transition-all duration-500 cursor-pointer rounded-3xl ${
                        expandedCard === index ? 'h-[85%]' : 'h-[120px]'
                      }`}
                      onClick={() => handleCardClick(index)}
                    >
                      <div className="flex flex-col items-center p-6">
                        <span className="text-xl font-medium text-center">{card.title}</span>
                        <svg
                          className={`w-6 h-6 transform transition-transform duration-300 mt-4 ${
                            expandedCard === index ? 'rotate-180 absolute bottom-6' : 'rotate-0'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      <div className={`px-6 transition-opacity duration-300 ${
                        expandedCard === index ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <p className="text-gray-700">{card.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Section */}
      <section className="relative min-h-screen w-full p-4">
        <div className="relative h-[calc(100vh-2rem)] w-full rounded-3xl border-2 border-red-100 overflow-hidden">
          <div className="relative h-full">
            <div className="max-w-7xl mx-auto px-12 py-16">
              <div className="flex gap-12">
                <div className="w-1/2">
                  <h2 className="mb-6">
                    <span className="text-red-600 text-4xl font-bold block">Perkraustymo</span>
                    <span className="text-4xl block">paslaugų rūšys</span>
                  </h2>
                  
                  <p className="text-gray-700 mb-12">
                    Mūsų perkraustymo paslaugos apima platų spektrą sprendimų, pritaikomų prie 
                    įvairiausių situacijų. Kiekviena iš žemiau išvardytų paslaugų turi savo specifiką, o 
                    mes esame pasiruošę optimizuoti procesą, kad jis atitiktų jūsų unikalius poreikius.
                  </p>

                  <div className="flex flex-col space-y-2">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedService(index)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                          selectedService === index ? 'bg-gray-100' : 'hover:bg-gray-50'
                        }`}
                      >
                        {service.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-1/2">
                  {selectedService !== null && (
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                      <div className="h-[300px] relative">
                        <Image
                          src={services[selectedService].image}
                          alt={services[selectedService].title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-8">
                        <p className="text-gray-700 mb-6">
                          {services[selectedService].description}
                        </p>
                        <button className="text-red-600 hover:text-red-700 font-medium">
                          Sužinokite daugiau
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovingServicesPage;
