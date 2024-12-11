"use client";

import { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowRight, Car, Truck } from 'lucide-react';
import axios from 'axios';

const vehicleTypes = [
  { name: 'Lengvasis Automobilis', icon: <Car />, hourlyRate: 20, kmRate: 0.8, minOrder: 35, allowLoaders: false },
  { name: 'Mikroautobusas iki 3.5t', icon: <Truck />, hourlyRate: 20, kmRate: 1, minOrder: 70, allowLoaders: true },
  { name: 'Mikroautobusas su liftu', icon: <Truck />, hourlyRate: 22, kmRate: 1, minOrder: 70, allowLoaders: true },
  { name: 'Fiskaras - manipuliatorius', icon: <Truck />, hourlyRate: 50, kmRate: 1.25, minOrder: 140, allowLoaders: false },
  { name: 'Sunkvezimis', icon: <Truck />, hourlyRate: 30, kmRate: 1.7, minOrder: 60, allowLoaders: true },
];

const LOADER_RATE = 18;

const DistanceCalculator = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [result, setResult] = useState('');
  const [isInVilnius, setIsInVilnius] = useState(true);
  const [loaders, setLoaders] = useState('Nereikia');
  const [hours, setHours] = useState('');
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const autocompleteFrom = new window.google.maps.places.Autocomplete(fromInputRef.current);
      const autocompleteTo = new window.google.maps.places.Autocomplete(toInputRef.current);
      
      autocompleteFrom.addListener('place_changed', () => {
        const place = autocompleteFrom.getPlace();
        setFromAddress(place.formatted_address || '');
        checkDistance();
      });

      autocompleteTo.addListener('place_changed', () => {
        const place = autocompleteTo.getPlace();
        setToAddress(place.formatted_address || '');
        checkDistance();
      });
    }
  }, []);

  const checkDistance = async () => {
    if (fromAddress && toAddress) {
      try {
        const response = await axios.post('/api/distance', {
          fromAddress,
          toAddress,
        });
        setIsInVilnius(response.data.isInVilnius);
      } catch (error) {
        console.error('Error checking distance:', error);
      }
    }
  };

  const calculatePrice = (distance: number, isInVilnius: boolean, vehicleType: string) => {
    const vehicle = vehicleTypes.find(v => v.name === vehicleType);
    if (!vehicle) return 'Invalid vehicle type';

    const hourlyRate = vehicle.hourlyRate;
    const kmRate = vehicle.kmRate;
    const minOrder = vehicle.minOrder;
    const hoursNum = parseInt(hours) || 0;
    const loadersNum = parseInt(loaders.split(' ')[0]) || 0;
    const loadersCost = loadersNum * LOADER_RATE * hoursNum;

    let price;
    if (isInVilnius) {
      price = Math.max(hourlyRate * hoursNum + loadersCost, minOrder);
      return `${price} EUR (hourly rate: ${hourlyRate} EUR/h, ${hoursNum} hours, ${loadersNum} loaders)`;
    } else {
      if (vehicleType === 'Mikroautobusas iki 3.5t' || vehicleType === 'Mikroautobusas su liftu') {
        price = Math.max(distance * kmRate + hourlyRate * hoursNum + loadersCost, minOrder);
        return `${price.toFixed(2)} EUR (${distance} km at ${kmRate} EUR/km + ${hoursNum} hours at ${hourlyRate} EUR/h, ${loadersNum} loaders)`;
      } else {
        price = Math.max(distance * kmRate, minOrder);
        return `${price.toFixed(2)} EUR (${distance} km at ${kmRate} EUR/km)`;
      }
    }
  };

  const calculateDistance = async () => {
    if (!selectedVehicle) {
      setResult('Please select a vehicle type first');
      return;
    }

    try {
      const response = await axios.post('/api/distance', {
        fromAddress,
        toAddress,
      });

      const { distance, isInVilnius } = response.data;
      const price = calculatePrice(parseFloat(distance), isInVilnius, selectedVehicle);
      const locationStatus = isInVilnius ? "Inside Vilnius" : "Outside Vilnius";
      setResult(`Distance: ${distance} km (${locationStatus})\nEstimated Price: ${price}`);
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

      <div className="flex space-x-4">
        <div className="w-1/2">
          <select
            value={loaders}
            onChange={(e) => setLoaders(e.target.value)}
            className={`w-full p-3 rounded-xl border border-gray-200 ${
              !selectedVehicle || !vehicleTypes.find(v => v.name === selectedVehicle)?.allowLoaders
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : ''
            }`}
            disabled={!selectedVehicle || !vehicleTypes.find(v => v.name === selectedVehicle)?.allowLoaders}
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
            className={`w-full p-3 rounded-xl border border-gray-200 ${
              !isInVilnius && selectedVehicle !== 'Mikroautobusas iki 3.5t' && selectedVehicle !== 'Mikroautobusas su liftu'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : ''
            }`}
            disabled={!isInVilnius && selectedVehicle !== 'Mikroautobusas iki 3.5t' && selectedVehicle !== 'Mikroautobusas su liftu'}
          />
        </div>
      </div>

      <button
        onClick={calculateDistance}
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

export default DistanceCalculator;
