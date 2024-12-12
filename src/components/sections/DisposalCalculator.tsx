"use client";

import { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowRight, Truck, ArrowLeft } from 'lucide-react';

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
    if (!selectedVehicle || !address || !hours) {
      setResult('Prašome užpildyti visus laukus');
      return;
    }

    const vehicle = disposalVehicles.find(v => v.name === selectedVehicle);
    if (!vehicle) return;

    const hoursNum = parseInt(hours) || 0;
    const loadersNum = parseInt(loaders.split(' ')[0]) || 0;
    const loadersCost = loadersNum * LOADER_RATE * hoursNum;

    const price = Math.max(vehicle.hourlyRate * hoursNum + loadersCost, vehicle.minOrder);

    setResult(`Preliminari kaina: ${price} EUR\n(${hoursNum} val. po ${vehicle.hourlyRate} EUR/val.${loadersNum > 0 ? `,\n${loadersNum} krovikai po ${LOADER_RATE} EUR/val.` : ''})\nMinimalus užsakymas: ${vehicle.minOrder} EUR`);
    setIsFlipped(true);
  };

  const resetCalculator = () => {
    setIsFlipped(false);
    setSelectedVehicle('');
    setAddress('');
    setResult('');
    setLoaders('Nereikia');
    setHours('');
  };

  return (
    <div className={`flip-card w-full h-[350px] ${isFlipped ? 'flipped' : ''}`}>
      <div className="flip-card-inner relative w-full h-full">
        {/* Front Side */}
        <div className="flip-card-front absolute w-full h-full bg-white rounded-xl p-4">
          <div className="space-y-4">
            {/* Vehicle Selection */}
            <div className="grid grid-cols-2 gap-3">
              {disposalVehicles.map((vehicle, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVehicle(vehicle.name)}
                  className={`group relative flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                    selectedVehicle === vehicle.name 
                      ? 'bg-red-50 ring-1 ring-red-500 shadow-sm' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`text-2xl mb-1 transition-colors ${
                    selectedVehicle === vehicle.name ? 'text-red-600' : 'text-gray-600 group-hover:text-red-500'
                  }`}>
                    {vehicle.icon}
                  </div>
                  <div className="text-xs text-center font-medium leading-tight">
                    {vehicle.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Address Input */}
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
              <input
                ref={addressInputRef}
                type="text"
                placeholder="Įveskite adresą"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Options Section */}
            <div className="grid grid-cols-2 gap-3">
              <select
                value={loaders}
                onChange={(e) => setLoaders(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              >
                <option value="Nereikia">Krovikai: Nereikia</option>
                <option value="1 krovikas">1 krovikas</option>
                <option value="2 krovikai">2 krovikai</option>
                <option value="3 krovikai">3 krovikai</option>
                <option value="4 krovikai">4 krovikai</option>
              </select>
              <input
                type="number"
                placeholder="Laikas valandomis"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
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
            
            {/* Selected Vehicle Info */}
            <div className="p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="text-xl text-red-600">
                  {disposalVehicles.find(v => v.name === selectedVehicle)?.icon}
                </div>
                <div className="text-sm font-medium text-gray-900">{selectedVehicle}</div>
              </div>
            </div>

            {/* Address Info */}
            <div className="flex items-start gap-2">
              <MapPin className="text-red-500 w-4 h-4 mt-1" />
              <div>
                <div className="text-xs text-gray-500">Adresas</div>
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

export default DisposalCalculator;