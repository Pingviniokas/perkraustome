import { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import axios from 'axios';

const API_KEY = 'AIzaSyChkFTgIcFPXXIXNJyRVkKsgQz6uqbYZEk';

const DistanceCalculator = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [distance, setDistance] = useState('');

  const calculateDistance = async () => {
    try {
      const fromResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fromAddress)}&key=${API_KEY}`);
      const toResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(toAddress)}&key=${API_KEY}`);

      const fromLocation = fromResponse.data.results[0].geometry.location;
      const toLocation = toResponse.data.results[0].geometry.location;

      const distanceResponse = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${fromLocation.lat},${fromLocation.lng}&destinations=${toLocation.lat},${toLocation.lng}&key=${API_KEY}`);

      const distanceText = distanceResponse.data.rows[0].elements[0].distance.text;
      setDistance(distanceText);
    } catch (error) {
      console.error('Error calculating distance:', error);
      setDistance('Error calculating distance');
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative group">
        <MapPin className="absolute left-4 top-3.5 text-red-600 w-5 h-5 transition-transform group-hover:scale-110" />
        <input
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

      {distance && (
        <p className="text-center text-lg font-semibold">
          Distance: {distance}
        </p>
      )}
    </div>
  );
};

export default DistanceCalculator;
