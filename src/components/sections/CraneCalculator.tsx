"use client";

import { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';


const HOURLY_RATE = 50;
const MIN_ORDER = 140;

const CraneCalculator = () => {
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('');
  const [result, setResult] = useState('');
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

  const calculatePrice = () => {
    if (!address || !hours) {
      setResult('Please fill in all fields');
      return;
    }

    const hoursNum = parseFloat(hours);
    const price = Math.max(hoursNum * HOURLY_RATE, MIN_ORDER);

    setResult(`Estimated Price: ${price} EUR\n(${hoursNum} hours at ${HOURLY_RATE} EUR/h)\nMinimum order: ${MIN_ORDER} EUR`);
  };

  return (
    <div className="space-y-6">
      <div className="relative group">
        <MapPin className="absolute left-4 top-3.5 text-red-600 w-5 h-5 transition-transform group-hover:scale-110" />
        <input
          ref={addressInputRef}
          type="text"
          placeholder="Įveskite adresą"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all hover:border-red-600"
        />
      </div>

      <input
        type="number"
        placeholder="Laikas valandomis"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-200"
      />

      <button
        onClick={calculatePrice}
        className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white p-4 rounded-xl hover:from-red-700 hover:to-red-600 transition-all transform group flex items-center justify-center gap-2"
      >
        Skaičiuoti kainą
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      {result && (
        <p className="text-center text-lg font-semibold whitespace-pre-line">
          {result}
        </p>
      )}
    </div>
  );
};

export default CraneCalculator;