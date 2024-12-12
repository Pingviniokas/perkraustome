"use client";

import { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowRight, Truck, ArrowLeft } from 'lucide-react';

const HOURLY_RATE = 50;
const MIN_ORDER = 140;

const CraneCalculator = () => {
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('');
  const [result, setResult] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const addressInputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current);
      
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setAddress(place.formatted_address || '');
      });
    }
  }, []);

  const handleCalculate = () => {
    if (!address || !hours) {
      setResult('Prašome užpildyti visus laukus');
      return;
    }

    const hoursNum = parseFloat(hours);
    const price = Math.max(hoursNum * HOURLY_RATE, MIN_ORDER);

    setResult(`Preliminari kaina: ${price} EUR\n\nValandinis įkainis: ${HOURLY_RATE} EUR/val.\nUžsakytos valandos: ${hoursNum} val.\nMinimalus užsakymas: ${MIN_ORDER} EUR`);
    setIsFlipped(true);
  };

  const resetCalculator = () => {
    setIsFlipped(false);
    setAddress('');
    setHours('');
    setResult('');
  };

  return (
    <div className={`flip-card w-full h-[350px] ${isFlipped ? 'flipped' : ''}`}>
      <div className="flip-card-inner relative w-full h-full">
        {/* Front Side */}
        <div className="flip-card-front absolute w-full h-full bg-white rounded-xl p-4">
          <div className="space-y-4">
            {/* Vehicle Display */}
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <div className="text-3xl text-red-600">
                <Truck />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Fiskaras - manipuliatorius
                </div>
                <div className="text-xs text-gray-600">
                  {HOURLY_RATE} EUR/val.
                </div>
              </div>
            </div>

            {/* Address Input */}
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
              <input
                ref={addressInputRef}
                type="text"
                placeholder="Įveskite darbų adresą"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Hours Input */}
            <div>
              <input
                type="number"
                placeholder="Įveskite valandų skaičių"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
              <div className="mt-1 text-xs text-gray-500 px-1">
                Minimalus užsakymas: {MIN_ORDER} EUR
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 text-sm rounded-lg hover:from-red-700 hover:to-red-600 transition-all transform group flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="font-medium">Skaičiuoti kainą</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-card-back absolute w-full h-full bg-white rounded-xl p-4">
          <div className="space-y-3 h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-900">Jūsų užklausa</h3>
            
            {/* Vehicle Info */}
            <div className="p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="text-xl text-red-600">
                  <Truck />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Fiskaras - manipuliatorius</div>
                  <div className="text-xs text-gray-600">{HOURLY_RATE} EUR/val.</div>
                </div>
              </div>
            </div>

            {/* Address Info */}
            <div className="flex items-start gap-2">
              <MapPin className="text-red-500 w-4 h-4 mt-1" />
              <div>
                <div className="text-xs text-gray-500">Darbų vieta</div>
                <div className="text-sm font-medium text-gray-900">{address}</div>
              </div>
            </div>

            {/* Quote Display */}
            <div className="flex-grow bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900 whitespace-pre-line">
                {result}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsFlipped(false)}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 text-sm rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Grįžti atgal</span>
              </button>
              <button
                onClick={resetCalculator}
                className="w-full bg-red-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
              >
                <span className="font-medium">Nauja užklausa</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraneCalculator;