"use client";

import { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowRight, Car, Truck, } from 'lucide-react';
import axios from 'axios';

const vehicleTypes = [
  { name: 'Lengvasis Automobilis', icon: <Car /> },
  { name: 'Mikroautobusas iki 3.5t', icon: <Truck /> },
  { name: 'Mikroautobusas su liftu', icon: <Truck /> },
  { name: 'Fiskaras - manipuliatorius', icon: <Truck /> },
  { name: 'Sunkvezimis', icon: <Truck /> },
];

const DistanceCalculator = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [result, setResult] = useState('');
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const autocompleteFrom = new window.google.maps.places.Autocomplete(fromInputRef.current);
      const autocompleteTo = new window.google.maps.places.Autocomplete(toInputRef.current);
      
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
      <div className="flex justify-between mb-6">
        {vehicleTypes.map((vehicle, index) => (
          <button
            key={index}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              selectedVehicle === vehicle.name ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedVehicle(vehicle.name)}
          >
            <div className="text-2xl mb-1">{vehicle.icon}</div>
            <div className="text-xs text-center">{vehicle.name}</div>
          </button>
        ))}
      </div>

      <div className="relative group">
        <MapPin className="absolute left-4 top-3.5 text-red-600 w-5 h-5 transition-transform group-hover:scale-110" />
        <input
          ref={fromInputRef}
          type="text"
          placeholder="Įveskite pakrovimo adresą"
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
          placeholder="Įveskite pristatymo adresą"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all hover:border-red-600"
        />
      </div>

      <button
        onClick={calculateDistance}
        className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white p-4 rounded-xl hover:from-red-700 hover:to-red-600 transition-all transform group flex items-center justify-center gap-2"
      >
        Skaičiuoti kainą
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
