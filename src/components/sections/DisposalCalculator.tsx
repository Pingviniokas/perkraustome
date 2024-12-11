"use client";

import { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowRight, Truck } from 'lucide-react';


const disposalVehicles = [
  { name: 'Mikroautobusas iki 3.5t', icon: <Truck />, hourlyRate: 25, minOrder: 70 },
  { name: 'Sunkvezimis', icon: <Truck />, hourlyRate: 35, minOrder: 100 },
];

const LOADER_RATE = 18;

const DisposalCalculator = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [address, setAddress] = useState('');
  const [result, setResult] = useState('');
  const [loaders, setLoaders] = useState('Nereikia');
  const [hours, setHours] = useState('');
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
    if (!selectedVehicle || !address || !hours) {
      setResult('Please fill in all required fields');
      return;
    }

    const vehicle = disposalVehicles.find(v => v.name === selectedVehicle);
    if (!vehicle) return;

    const hoursNum = parseInt(hours) || 0;
    const loadersNum = parseInt(loaders.split(' ')[0]) || 0;
    const loadersCost = loadersNum * LOADER_RATE * hoursNum;

    const price = Math.max(vehicle.hourlyRate * hoursNum + loadersCost, vehicle.minOrder);

    setResult(`Estimated Price: ${price} EUR\n(${hoursNum} hours at ${vehicle.hourlyRate} EUR/h${loadersNum > 0 ? `, ${loadersNum} loaders at ${LOADER_RATE} EUR/h` : ''})\nMinimum order: ${vehicle.minOrder} EUR`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-around mb-6">
        {disposalVehicles.map((vehicle, index) => (
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
          ref={addressInputRef}
          type="text"
          placeholder="Įveskite adresą"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all hover:border-red-600"
        />
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <select
            value={loaders}
            onChange={(e) => setLoaders(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200"
          >
            <option value="Nereikia">Krovikai: Nereikia</option>
            <option value="1 krovikas">1 krovikas</option>
            <option value="2 krovikai">2 krovikai</option>
            <option value="3 krovikai">3 krovikai</option>
            <option value="4 krovikai">4 krovikai</option>
          </select>
        </div>
        <div className="w-1/2">
          <input
            type="number"
            placeholder="Laikas valandomis"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200"
          />
        </div>
      </div>

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

export default DisposalCalculator;