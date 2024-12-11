"use client";

import { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import axios from 'axios';

const DistanceCalculator = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [result, setResult] = useState('');
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const autocompleteFrom = new window.google.maps.places.Autocomplete(fromInputRef.current as HTMLInputElement);
      const autocompleteTo = new window.google.maps.places.Autocomplete(toInputRef.current as HTMLInputElement);
      
      autocompleteFrom.addListener('place_changed', () => {
        const place = autocompleteFrom.getPlace();
        setFromAddress(place.formatted_address || '');
      });

      autocompleteTo.addListener('place_changed', () => {
        const place = autocompleteTo.getPlace();
        setToAddress(place.formatted_address || '');
      });
    }
  }, []);

  const calculateDistance = async () => {
    try {
      const response = await axios.post('/api/distance', {
        fromAddress,
        toAddress,
      });

      const { distance, isInVilnius } = response.data;
      const locationStatus = isInVilnius ? "Inside Vilnius - Price calculated hourly" : "Outside Vilnius - Price calculated by the distance";
      setResult(`Distance: ${distance} (${locationStatus})`);
    } catch (error) {
      console.error('Error calculating distance:', error);
      setResult('Error calculating distance');
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative group">
        <MapPin className="absolute left-4 top-3.5 text-red-600 w-5 h-5 transition-transform group-hover:scale-110" />
        <input
          ref={fromInputRef}
          type="text"
          placeholder="Moving From"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all hover:border-red-600"
        />
      </div>

      <div className="relative group">
        <MapPin className="absolute left-4 top-3.5 text-red-600 w-5 h-5 transition-transform group-hover:scale-110" />
        <input
          ref={toInputRef}
          type="text"
          placeholder="Moving To"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all hover:border-red-600"
        />
      </div>

      <button
        onClick={calculateDistance}
        className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white p-4 rounded-xl hover:from-red-700 hover:to-red-600 transition-all transform group flex items-center justify-center gap-2"
      >
        Calculate Distance
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      {result && (
        <p className="text-center text-lg font-semibold">
          {result}
        </p>
      )}
    </div>
  );
};

export default DistanceCalculator;
