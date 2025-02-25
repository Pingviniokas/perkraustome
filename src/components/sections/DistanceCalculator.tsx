"use client";

import { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowRight, Car, Truck, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import DatePicker from '../shared/DatePicker';

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
  const [isFlipped, setIsFlipped] = useState(false);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [rateMultiplier, setRateMultiplier] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const autocompleteOptions = {
        language: 'lt',
        componentRestrictions: { country: 'lt' }
      };

      const autocompleteFrom = new window.google.maps.places.Autocomplete(
        fromInputRef.current,
        autocompleteOptions
      );

      const autocompleteTo = new window.google.maps.places.Autocomplete(
        toInputRef.current,
        autocompleteOptions
      );

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

  const handleDateChange = (date: Date, isHoliday: boolean, isWeekend: boolean) => {
    setSelectedDate(date);
    setRateMultiplier(isHoliday || isWeekend ? 1.5 : 1);
  };

  const calculatePrice = (distance: number, isInVilnius: boolean, vehicleType: string) => {
    const vehicle = vehicleTypes.find(v => v.name === vehicleType);
    if (!vehicle) return 'Invalid vehicle type';

    const adjustedHourlyRate = vehicle.hourlyRate * rateMultiplier;
    const adjustedKmRate = vehicle.kmRate * rateMultiplier;
    const minOrder = vehicle.minOrder;
    const hoursNum = parseInt(hours) || 0;
    const loadersNum = parseInt(loaders.split(' ')[0]) || 0;
    const adjustedLoaderRate = LOADER_RATE * rateMultiplier;
    const loadersCost = loadersNum * adjustedLoaderRate * hoursNum;

    let price;
    if (isInVilnius) {
      price = Math.max(adjustedHourlyRate * hoursNum + loadersCost, minOrder);
      return `${price} EUR (hourly rate: ${adjustedHourlyRate} EUR/h, ${hoursNum} hours, ${loadersNum} loaders)`;
    } else {
      if (vehicleType === 'Mikroautobusas iki 3.5t' || vehicleType === 'Mikroautobusas su liftu') {
        price = Math.max(distance * adjustedKmRate + adjustedHourlyRate * hoursNum + loadersCost, minOrder);
        return `${price.toFixed(2)} EUR (${distance} km at ${adjustedKmRate} EUR/km + ${hoursNum} hours at ${adjustedHourlyRate} EUR/h, ${loadersNum} loaders)`;
      } else {
        price = Math.max(distance * adjustedKmRate, minOrder);
        return `${price.toFixed(2)} EUR (${distance} km at ${adjustedKmRate} EUR/km)`;
      }
    }
  };

  const handleCalculate = async () => {
    if (!selectedVehicle || !fromAddress || !toAddress || !selectedDate) {
      setResult('Please select a vehicle type and fill all required fields');
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
      setIsFlipped(true);
    } catch (error) {
      console.error('Error calculating distance:', error);
      setResult('Error calculating distance');
    }
  };

  const resetCalculator = () => {
    setIsFlipped(false);
    setSelectedVehicle('');
    setFromAddress('');
    setToAddress('');
    setResult('');
    setLoaders('Nereikia');
    setHours('');
  };

  return (
    <div className={`flip-card w-full h-[350px] ${isFlipped ? 'flipped' : ''}`}>
      <div className="flip-card-inner relative w-full h-full">
        {/* Front Side */}
        <div className="flip-card-front absolute w-full h-full bg-white rounded-xl p-4">
          <div className="space-y-3">
            {/* Vehicle Selection */}
            <div className="grid grid-cols-5 gap-2">
              {vehicleTypes.map((vehicle, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVehicle(vehicle.name)}
                  className={`group relative flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${selectedVehicle === vehicle.name
                      ? 'bg-red-50 ring-1 ring-red-500 shadow-sm'
                      : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                >
                  <div className={`text-xl mb-1 transition-colors ${selectedVehicle === vehicle.name ? 'text-red-600' : 'text-gray-600 group-hover:text-red-500'
                    }`}>
                    {vehicle.icon}
                  </div>
                  <div className="text-[10px] text-center font-medium leading-tight">
                    {vehicle.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Address Inputs */}
            <div className="space-y-2">
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
                <input
                  ref={fromInputRef}
                  type="text"
                  placeholder="Įveskite pakrovimo adresą"
                  value={fromAddress}
                  onChange={(e) => setFromAddress(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
                <input
                  ref={toInputRef}
                  type="text"
                  placeholder="Įveskite pristatymo adresą"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Options Section */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="loaders" className="sr-only">Krovikai</label>
                <select
                  id="loaders"
                  value={loaders}
                  onChange={(e) => setLoaders(e.target.value)}
                  className={`w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white/50 transition-all ${
                    !selectedVehicle || !vehicleTypes.find(v => v.name === selectedVehicle)?.allowLoaders
                      ? 'opacity-50 cursor-not-allowed'
                      : 'focus:ring-2 focus:ring-red-500 focus:border-transparent'
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

              <div>
                <label htmlFor="hours" className="sr-only">Laikas valandomis</label>
                <input
                  id="hours"
                  type="number"
                  placeholder="Laikas valandomis"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className={`w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white/50 transition-all ${
                    !isInVilnius && selectedVehicle !== 'Mikroautobusas iki 3.5t' && selectedVehicle !== 'Mikroautobusas su liftu'
                      ? 'opacity-50 cursor-not-allowed'
                      : 'focus:ring-2 focus:ring-red-500 focus:border-transparent'
                  }`}
                  disabled={!isInVilnius && selectedVehicle !== 'Mikroautobusas iki 3.5t' && selectedVehicle !== 'Mikroautobusas su liftu'}
                />
              </div>
            </div>

            {/* Date Picker */}
            <DatePicker 
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />

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
                  {vehicleTypes.find(v => v.name === selectedVehicle)?.icon}
                </div>
                <div className="font-medium text-sm text-gray-900">{selectedVehicle}</div>
              </div>
            </div>

            {/* Route Info */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="text-red-500 w-4 h-4 mt-1" />
                <div>
                  <div className="text-xs text-gray-500">Iš</div>
                  <div className="text-sm font-medium text-gray-900">{fromAddress}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="text-red-500 w-4 h-4 mt-1" />
                <div>
                  <div className="text-xs text-gray-500">Į</div>
                  <div className="text-sm font-medium text-gray-900">{toAddress}</div>
                </div>
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

export default DistanceCalculator;