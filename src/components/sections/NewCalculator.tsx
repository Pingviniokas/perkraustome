"use client";

import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import DatePicker from '../shared/DatePicker';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useMapsContext } from '@/context/MapsContext';


type PricingType = 'hourly' | 'fixed';
type VehicleType = 'car' | 'van' | 'lift' | 'crane' | 'truck';
type WorkerCount = 0 | 1 | 2 | 3;

interface CalculatorProps {
  inView: boolean;
  scrollProgress: MotionValue<number>;
  onOpacityChange?: (opacity: number) => void;
}

const NewCalculator = ({ inView, scrollProgress, onOpacityChange }: CalculatorProps) => {
  // Calculator appears after hero content is gone but while video is still visible
  const sectionOpacity = useTransform(
    scrollProgress,
    [0.2, 0.4, 0.6, 0.8],  // Start at 20%, full at 40%, start fade at 60%, gone at 80%
    [0, 1, 1, 0]
  );

  const calculatorScale = useTransform(
    scrollProgress,
    [0.2, 0.4, 0.7, 0.9],
    [0.95, 1, 1, 0.95]
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isHoliday, setIsHoliday] = useState(false);
  const [isWeekend, setIsWeekend] = useState(false);
  const [pricingType, setPricingType] = useState<PricingType>('hourly');
  const [serviceType, setServiceType] = useState<'moving' | 'crane'>('moving');
  const [activeInput, setActiveInput] = useState<'pickup' | 'delivery' | null>(null);
  const [warningMessage, setWarningMessage] = useState('');
  const [showResults, setShowResults] = useState(false);



  // Add state for addresses and coordinates
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [deliveryCoords, setDeliveryCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isVilnius, setIsVilnius] = useState(true);
  const [distance, setDistance] = useState(0);

  // Add new state
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [workerCount, setWorkerCount] = useState<WorkerCount>(0);
  const [price, setPrice] = useState<number | null>(null);
  const [hours, setHours] = useState<number | null>(null);

  // Pricing constants
  const VEHICLE_PRICES = {
    car: { hourly: 25, km: 0.7 },
    van: { hourly: 35, km: 0.8 },
    lift: { hourly: 45, km: 0.9 },
    crane: { hourly: 50, km: 1.0 },
    truck: { hourly: 55, km: 1.1 }
  };

  const WORKER_PRICE = 15; // Per hour per worker
  const MINIMUM_HOURS = 2;
  const WEEKEND_MULTIPLIER = 1.5;
  const HOLIDAY_MULTIPLIER = 1.5;
  const MINIMUM_ORDER_PRICE = 50; // Minimum order price in euros

  // Add vehicle name mapping
  const VEHICLE_NAMES = {
    car: 'Lengvasis Automobilis',
    van: 'Mikroautobusas iki 3.5t',
    lift: 'Mikroautobusas su liftu',
    crane: 'Fiskaras - Manipuliatorius',
    truck: 'Sunkvežimis'
  } as const;

  // Add ref for the calculator section
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Replace mapsLoaded state with useMapsContext
  const { isLoaded } = useMapsContext();

  // Update the usePlacesAutocomplete hooks
  const {
    value: pickupValue,
    suggestions: { data: pickupSuggestions },
    setValue: setPickupValue,
    clearSuggestions: clearPickupSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'lt' }
    },
    debounce: 300,
    cache: 86400,
    initOnMount: isLoaded,
  });

  const {
    value: deliveryValue,
    suggestions: { data: deliverySuggestions },
    setValue: setDeliveryValue,
    clearSuggestions: clearDeliverySuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'lt' }
    },
    debounce: 300,
    cache: 86400,
    initOnMount: isLoaded,
  });

  const handleDateChange = (date: Date, holiday: boolean, weekend: boolean) => {
    setSelectedDate(date);
    setIsHoliday(holiday);
    setIsWeekend(weekend);
  };

  const handleWarningChange = (message: string) => {
    setWarningMessage(message);
  };

  // Add function to check if address is in Vilnius
  const checkIfVilnius = async (placeId: string) => {
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({ placeId });

    if (result.results[0]) {
      const addressComponents = result.results[0].address_components;
      return addressComponents.some(component =>
        component.long_name.toLowerCase() === 'vilnius' &&
        component.types.includes('locality')
      );
    }
    return false;
  };

  // Add function to calculate distance
  const calculateDistance = async (origin: google.maps.LatLng, destination: google.maps.LatLng) => {
    const service = new google.maps.DistanceMatrixService();
    const result = await service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
    });

    if (result.rows[0]?.elements[0]?.distance) {
      return result.rows[0].elements[0].distance.value / 1000; // Convert to km
    }
    return 0;
  };

  // Add handlers for address selection
  const handlePickupSelect = async (placeId: string) => {
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({ placeId });

    if (result.results[0]?.geometry?.location) {
      const lat = result.results[0].geometry.location.lat();
      const lng = result.results[0].geometry.location.lng();
      setPickupCoords({ lat, lng });

      const isPickupVilnius = await checkIfVilnius(placeId);
      setIsVilnius(isPickupVilnius);
    }
    clearPickupSuggestions();
  };

  const handleDeliverySelect = async (placeId: string) => {
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({ placeId });

    if (result.results[0]?.geometry?.location) {
      const lat = result.results[0].geometry.location.lat();
      const lng = result.results[0].geometry.location.lng();
      setDeliveryCoords({ lat, lng });

      const isDeliveryVilnius = await checkIfVilnius(placeId);
      setIsVilnius(prev => prev && isDeliveryVilnius); // Both addresses need to be in Vilnius
    }
    clearDeliverySuggestions();
  };

  // Add useEffect to calculate distance when both coordinates are available
  useEffect(() => {
    if (pickupCoords && deliveryCoords) {
      const origin = new google.maps.LatLng(pickupCoords.lat, pickupCoords.lng);
      const destination = new google.maps.LatLng(deliveryCoords.lat, deliveryCoords.lng);

      calculateDistance(origin, destination).then(dist => {
        setDistance(dist);
      });
    }
  }, [pickupCoords, deliveryCoords]);

  // Calculate price function
  const calculatePrice = () => {
    if (!selectedVehicle || !pickupCoords || !deliveryCoords || !hours) {
      setWarningMessage('Prašome užpildyti visus laukus');
      return;
    }

    let basePrice = 0;
    const vehiclePrice = VEHICLE_PRICES[selectedVehicle];

    if (pricingType === 'hourly') {
      let hourlyRate = vehiclePrice.hourly * hours;

      if (workerCount > 0) {
        hourlyRate += (WORKER_PRICE * workerCount * hours);
      }

      if (isWeekend || isHoliday) {
        hourlyRate *= WEEKEND_MULTIPLIER;
      }

      if (!isVilnius) {
        basePrice = hourlyRate + (distance * vehiclePrice.km);
      } else {
        basePrice = hourlyRate;
      }
    } else {
      basePrice = distance * vehiclePrice.km * 2; // Round trip
    }

    basePrice = Math.max(basePrice, MINIMUM_ORDER_PRICE);
    setPrice(Math.round(basePrice));
    setShowResults(true); // First place showResults is set
    setWarningMessage(''); // Clear any warning messages
  };

  // Update vehicle selection handler
  const handleVehicleSelect = (vehicle: VehicleType) => {
    setSelectedVehicle(vehicle);
  };

  // Update worker change handler
  const handleWorkerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let count: WorkerCount = 0;
    
    switch(value) {
      case 'Krovikai: 1 krovikas':
        count = 1;
        break;
      case 'Krovikai: 2 krovikai':
        count = 2;
        break;
      case 'Krovikai: 3 krovikai':
        count = 3;
        break;
      default:
        count = 0;
    }
    
    setWorkerCount(count);
  };

  // Update the point position based on both active state and content
  const getPointPosition = () => {
    if (activeInput === 'delivery' || deliveryValue) {
      return 'translate-y-[42px]';
    }
    return '';
  };

  // First, create a reusable component for truncated text
  const TruncatedText = ({ text }: { text: string }) => (
    <span className="truncate block max-w-[300px]" title={text}>
      {text}
    </span>
  );

  const fetchHolidays = async (year: number) => {
    try {
      const response = await fetch(`/api/holidays?year=${year}`);
      if (!response.ok) {
        console.warn(`No holidays found for year ${year}, using empty array`);
        return [];
      }
      const data = await response.json();
      return data.holidays || [];
    } catch (error) {
      console.warn(`Error fetching holidays for ${year}:`, error);
      return [];
    }
  };

  // Update the pricing type change handler
  const handlePricingTypeChange = (type: PricingType) => {
    setPricingType(type);
    if (type === 'fixed') {
      setServiceType('moving');
    }
    // Remove any code here that might affect showResults
  };

  // Update the service type change handler - remove any result hiding
  const handleServiceTypeChange = (type: 'moving' | 'crane') => {
    setServiceType(type);
    // Remove any code here that might affect showResults
  };

  // Listen to opacity changes
  useEffect(() => {
    if (onOpacityChange) {
      return sectionOpacity.onChange(onOpacityChange);
    }
  }, [sectionOpacity, onOpacityChange]);

  return (
    <motion.div
      className="w-full min-h-screen grid place-items-center py-32"
      style={{ opacity: sectionOpacity }}
    >
      <div className="container mx-auto px-4 flex gap-8 items-stretch max-w-[1600px]">
        {/* Text Container - 1/3 width - adjusted text sizes and spacing */}
        <div className="hidden md:flex w-1/3 bg-white/80 backdrop-blur-[2px] rounded-[12px] border border-[#BB0003] p-8 flex-col">
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4"> {/* Reduced spacing */}
              <h2 className="text-xl font-bold text-[#BB0003]"> {/* Reduced from text-2xl */}
                Išbandykite visiškai naują perkraustymo patirtį su "Mes Jau Čia"!
              </h2>
              <div className="space-y-3 text-[#232323] text-sm"> {/* Reduced from text-base and spacing */}
                <p>
                  Esame pirmieji Lietuvoje, siūlantys fiksuotą kainą – jokios netikėtos išlaidos ar neaiškūs tarifai. Užpildykite vos keletą laukelių mūsų "išmanioje" skaičiuoklėje (tai truks 3–5 minutes) ir iškart sužinosite galutinę kainą. Patiko pasiūlymas? Vienu mygtuko paspaudimu pateikite užsakymą – visos detalės bus užpildytos automatiškai.
                </p>
                <p>
                  Vis dar mėgstate tradicinį būdą? Siūlome ir valandinį perkraustymo įkainį – čia pat matysite tarifus, pasirinksite reikiamą transportą bei krovikų skaičių. Bet kuriuo atveju, su "Mes Jau Čia" žinosite tikslias išlaidas ir sutaupysite brangų laiką.
                </p>
              </div>
            </div>
            <div className="space-y-3 mt-4"> {/* Reduced spacing */}
              <p className="text-base font-semibold text-[#BB0003]"> {/* Reduced from text-lg */}
                Pasiruošę pradėti kraustymą be streso?
              </p>
              <p className="text-sm text-[#232323]"> {/* Reduced from text-base */}
                Pasirinkite, kas Jums patogiau – fiksuota kaina arba valandinis tarifas – ir pradėkite skaičiuoti jau dabar!
              </p>
            </div>
          </div>
        </div>

        {/* Calculator - 2/3 width */}
        <div className="w-full md:w-2/3">
          <div className="bg-white/80 backdrop-blur-[2px] rounded-[12px] border border-[#BB0003] p-8 relative h-full">
            {/* Calculator Form */}
            <div
              className={clsx(
                "transition-all duration-500 ease-in-out",
                showResults ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
              )}
            >
              {/* Title with Info Icon */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-left">
                  <span className="text-[#BB0003]">KAINOS</span> SKAIČIUOKLĖ
                </h2>
                <div className="relative group">
                  <button className="w-8 h-8 border border-[#BB0003] text-[#BB0003] rounded-lg font-medium hover:bg-red-50 transition-all flex items-center justify-center">
                    i
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 text-[12px] text-gray-600">
                    Apie skaičiuoklę ir kaip ji veikia
                  </div>
                </div>
              </div>

              {/* Calculator content */}
              <div className="space-y-6">
                {/* Pricing Type Selection */}
                <div className="flex gap-2 mb-3">
                  {/* Mobile version - hidden on desktop */}
                  <div className="lg:hidden w-full">
                    <div className="relative h-10 bg-[#DDDDDD] rounded-full p-1 mb-4">
                      <div
                        className={clsx(
                          "absolute inset-y-0.5 w-1/2 bg-[#BB0003] rounded-full shadow-sm transition-transform duration-300 ease-out",
                          pricingType === 'fixed' ? 'translate-x-full' : 'translate-x-0'
                        )}
                      />
                      <div className="relative z-10 grid grid-cols-2 h-full">
                        <button
                          onClick={() => handlePricingTypeChange('hourly')}
                          className={clsx(
                            'text-[13px] font-medium transition-colors duration-300 rounded-full px-4',
                            pricingType === 'hourly' ? 'text-white' : 'text-[#232323]'
                          )}
                        >
                          VALANDINIS ĮKAINIS
                        </button>
                        <button
                          onClick={() => handlePricingTypeChange('fixed')}
                          className={clsx(
                            'text-[13px] font-medium transition-colors duration-300 rounded-full px-4',
                            pricingType === 'fixed' ? 'text-white' : 'text-[#232323]'
                          )}
                        >
                          FIKSUOTA KAINA
                        </button>
                      </div>
                    </div>

                    {/* Service Type Selection - Mobile */}
                    <div className={clsx(
                      "relative h-10 bg-[#DDDDDD] rounded-full p-1",
                      pricingType === 'fixed' ? 'pointer-events-none opacity-50' : ''
                    )}>
                      <div className={clsx(
                        "absolute inset-y-0.5 w-1/2 bg-[#BB0003] rounded-full shadow-sm transition-transform duration-300 ease-out",
                        serviceType === 'crane' ? 'translate-x-full' : 'translate-x-0'
                      )}/>
                      <div className={clsx(
                        "relative z-10 grid h-full",
                        pricingType === 'fixed' ? 'grid-cols-1' : 'grid-cols-2'
                      )}>
                        <button 
                          onClick={() => handleServiceTypeChange('moving')}
                          className={clsx(
                            'text-[13px] font-medium transition-colors duration-300 rounded-full px-4',
                            serviceType === 'moving' ? 'text-white' : 'text-[#232323]'
                          )}
                        >
                          PERKRAUSTYMAS
                        </button>
                        {pricingType === 'hourly' && (
                          <button 
                            onClick={() => handleServiceTypeChange('crane')}
                            className={clsx(
                              'text-[13px] font-medium transition-colors duration-300 rounded-full px-4',
                              serviceType === 'crane' ? 'text-white' : 'text-[#232323]'
                            )}
                          >
                            FISKARO NUOMA
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop version - unchanged */}
                  <div className="hidden lg:flex gap-2 w-full">
                    <button
                      onClick={() => handlePricingTypeChange('hourly')}
                      className={clsx(
                        'flex-1 py-4 px-4 rounded-[8px] font-medium transition-all border',
                        pricingType === 'hourly'
                          ? 'bg-[#BB0003] text-white border-[#BB0003]'
                          : 'bg-[#DDDDDD] text-[#232323] border-[#BB0003] hover:bg-[#DDDDDD]/90'
                      )}
                    >
                      VALANDINIS ĮKAINIS
                    </button>
                    <button
                      onClick={() => handlePricingTypeChange('fixed')}
                      className={clsx(
                        'flex-1 py-4 px-4 rounded-[8px] font-medium transition-all border',
                        pricingType === 'fixed'
                          ? 'bg-[#BB0003] text-white border-[#BB0003]'
                          : 'bg-[#DDDDDD] text-[#232323] border-[#BB0003] hover:bg-[#DDDDDD]/90'
                      )}
                    >
                      FIKSUOTA KAINA
                    </button>
                  </div>
                </div>

                {/* Service Type Selection - Toggle Style with Slide Animation */}
                <div className={clsx(
                  'relative h-12 bg-[#E5E5E5] rounded-lg mb-3 z-0 hidden lg:block',
                  pricingType === 'fixed' && 'opacity-50 pointer-events-none'
                )}>
                  <div className="absolute inset-0 flex">
                    {/* Sliding background */}
                    <div
                      className={clsx(
                        'absolute top-[5px] bottom-[5px] left-[5px] w-full rounded-[6px] bg-white transition-transform duration-300 ease-in-out',
                        pricingType === 'fixed' ? 'translate-x-0' : 'translate-x-0'
                      )}
                    />
                    <button
                      onClick={() => handleServiceTypeChange('moving')}
                      className={clsx(
                        'flex-1 m-[2px] rounded-[6px] font-medium transition-colors duration-300 relative z-10',
                        serviceType === 'moving' ? 'text-[#2a2d35]' : 'text-[#2a2d35]'
                      )}
                      aria-label="Pasirinkti perkraustymo paslaugas"
                    >
                      Perkraustymo paslaugos
                    </button>
                    {pricingType === 'hourly' && (
                      <button
                        onClick={() => handleServiceTypeChange('crane')}
                        className={clsx(
                          'flex-1 m-[2px] rounded-[6px] font-medium transition-colors duration-300 relative z-10',
                          serviceType === 'crane' ? 'text-[#2a2d35]' : 'text-[#2a2d35]'
                        )}
                        aria-label="Pasirinkti fiskaro nuomą"
                      >
                        Fiskaro nuoma
                      </button>
                    )}
                  </div>
                </div>

                {/* Vehicle Selection - Desktop only */}
                {pricingType === 'hourly' && (
                  <div className="hidden lg:grid grid-cols-5 gap-2 mb-3">
                    <button
                      onClick={() => handleVehicleSelect('car')}
                      className={clsx(
                        "bg-white p-3 h-[80px] rounded-[10px] border transition-all flex flex-col items-center",
                        selectedVehicle === 'car'
                          ? 'border-[#BB0003]'
                          : 'border-gray-200 hover:border-red-500'
                      )}
                    >
                      <div className="flex-1 flex items-center justify-center">
                        <img
                          src="/images/icons/car.png"
                          alt="Car"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <span className="text-[10px] text-[#2a2d35]">Lengvasis Automobilis</span>
                    </button>

                    <button
                      onClick={() => handleVehicleSelect('van')}
                      className={clsx(
                        "bg-white p-3 h-[80px] rounded-[10px] border transition-all flex flex-col items-center",
                        selectedVehicle === 'van'
                          ? 'border-[#BB0003]'
                          : 'border-gray-200 hover:border-red-500'
                      )}
                    >
                      <div className="flex-1 flex items-center justify-center">
                        <img
                          src="/images/icons/van.png"
                          alt="Van"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <span className="text-[10px] text-[#2a2d35]">Mikroautobusas iki 3.5t</span>
                    </button>

                    <button
                      onClick={() => handleVehicleSelect('lift')}
                      className={clsx(
                        "bg-white p-3 h-[80px] rounded-[10px] border transition-all flex flex-col items-center",
                        selectedVehicle === 'lift'
                          ? 'border-[#BB0003]'
                          : 'border-gray-200 hover:border-red-500'
                      )}
                    >
                      <div className="flex-1 flex items-center justify-center">
                        <img
                          src="/images/icons/lift.png"
                          alt="Lift"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <span className="text-[10px] text-[#2a2d35]">Su liftu</span>
                    </button>

                    <button
                      onClick={() => handleVehicleSelect('crane')}
                      className={clsx(
                        "bg-white p-3 h-[80px] rounded-[10px] border transition-all flex flex-col items-center",
                        selectedVehicle === 'crane'
                          ? 'border-[#BB0003]'
                          : 'border-gray-200 hover:border-red-500'
                      )}
                    >
                      <div className="flex-1 flex items-center justify-center">
                        <img
                          src="/images/icons/crane.png"
                          alt="Crane"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <span className="text-[10px] text-[#2a2d35]">Fiskaras</span>
                    </button>

                    <button
                      onClick={() => handleVehicleSelect('truck')}
                      className={clsx(
                        "bg-white p-3 h-[80px] rounded-[10px] border transition-all flex flex-col items-center",
                        selectedVehicle === 'truck'
                          ? 'border-[#BB0003]'
                          : 'border-gray-200 hover:border-red-500'
                      )}
                    >
                      <div className="flex-1 flex items-center justify-center">
                        <img
                          src="/images/icons/truck.png"
                          alt="Truck"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <span className="text-[10px] text-[#2a2d35]">Sunkvežimis</span>
                    </button>
                  </div>
                )}

                {/* Address Inputs with Sliding Point */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3">
                    {/* Point and Line Container */}
                    <div className="relative w-1.5 flex justify-center h-[82px]">
                      {/* Vertical Line */}
                      <div className="absolute top-0 h-[82px] w-[1px] bg-[#BABABB]" />
                      {/* Sliding Point */}
                      <div
                        className={clsx(
                          'absolute w-1 h-1 bg-[#BB0003] rounded-full transition-transform duration-300',
                          'top-[19px] left-[1px]',
                          getPointPosition()
                        )}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      {/* Pickup Address Input */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Įveskite pakrovimo adresą"
                          className="w-full h-10 rounded-lg border border-gray-200 bg-white px-6 text-[12px]"
                          value={pickupValue}
                          onChange={(e) => {
                            setPickupValue(e.target.value);
                            if (e.target.value === '') {
                              clearPickupSuggestions();
                            }
                          }}
                          onFocus={() => setActiveInput('pickup')}
                          onBlur={() => setTimeout(() => setActiveInput(null), 200)}
                        />
                        {/* Pickup Suggestions */}
                        {activeInput === 'pickup' && pickupSuggestions.length > 0 && (
                          <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            {pickupSuggestions.map((suggestion) => (
                              <button
                                key={suggestion.place_id}
                                className="w-full px-4 py-2 text-left text-[12px] hover:bg-gray-50"
                                onClick={() => {
                                  setPickupValue(suggestion.description);
                                  handlePickupSelect(suggestion.place_id);
                                }}
                              >
                                {suggestion.description}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Delivery Address Input */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Įveskite pristatymo adresą"
                          className="w-full h-10 rounded-lg border border-gray-200 bg-white px-6 text-[12px]"
                          value={deliveryValue}
                          onChange={(e) => {
                            setDeliveryValue(e.target.value);
                            if (e.target.value === '') {
                              clearDeliverySuggestions();
                            }
                          }}
                          onFocus={() => setActiveInput('delivery')}
                          onBlur={() => setTimeout(() => setActiveInput(null), 200)}
                        />
                        {/* Delivery Suggestions */}
                        {activeInput === 'delivery' && deliverySuggestions.length > 0 && (
                          <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            {deliverySuggestions.map((suggestion) => (
                              <button
                                key={suggestion.place_id}
                                className="w-full px-4 py-2 text-left text-[12px] hover:bg-gray-50"
                                onClick={() => {
                                  setDeliveryValue(suggestion.description);
                                  handleDeliverySelect(suggestion.place_id);
                                }}
                              >
                                {suggestion.description}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                

                  {/* Bottom Row Container - Desktop */}
                  <div className="hidden lg:block">
                    <div className="grid grid-cols-4 gap-2">
                      {/* Workers Selection */}
                      <div className={clsx(
                        'transition-all',
                        pricingType === 'fixed' && 'opacity-50 pointer-events-none'
                      )}>
                        <select
                          value={`Krovikai: ${workerCount === 0 ? 'Nereikia' : `${workerCount} ${workerCount === 1 ? 'krovikas' : 'krovikai'}`}`}
                          onChange={handleWorkerChange}
                          className="w-full h-9 rounded-lg border border-gray-200 bg-white px-3 text-[13px]"
                        >
                          <option>Krovikai: Nereikia</option>
                          <option>Krovikai: 1 krovikas</option>
                          <option>Krovikai: 2 krovikai</option>
                          <option>Krovikai: 3 krovikai</option>
                        </select>
                      </div>

                      {/* Date Picker */}
                      <div className="h-10">
                        <DatePicker
                          selectedDate={selectedDate}
                          onDateChange={handleDateChange}
                          onWarningChange={handleWarningChange}
                          className="text-sm"
                          showWarningInline={false}
                        />
                      </div>

                      {/* Hours Input */}
                      <div className={clsx(
                        'transition-all',
                        pricingType === 'fixed' && 'opacity-50 pointer-events-none'
                      )}>
                        <input
                          type="number"
                          min="1"
                          placeholder="Valandų skaičius"
                          className="w-full h-9 rounded-lg border border-gray-200 bg-white px-3 text-[13px]"
                          value={hours || ''}
                          onChange={(e) => setHours(Number(e.target.value))}
                        />
                      </div>

                      {/* Calculate Button */}
                      <button
                        onClick={calculatePrice}
                        disabled={!selectedVehicle || !pickupCoords || !deliveryCoords}
                        className={clsx(
                          "w-full h-10 rounded-lg font-normal transition-all",
                          (!selectedVehicle || !pickupCoords || !deliveryCoords)
                            ? 'bg-[#333333] text-white cursor-not-allowed opacity-50'
                            : 'bg-[#222222] text-white hover:bg-black'
                        )}
                      >
                        Skaičiuoti kainą
                      </button>
                    </div>

                    {/* Warning Message Container - Desktop */}
                    <div className="min-h-[20px] mt-2">
                      {warningMessage && (
                        <p className="text-red-500 text-xs font-medium">{warningMessage}</p>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-4">
                    {/* Vehicle Selection - Mobile Dropdown */}
                    <div className="mb-6">
                      <label className="block text-[13px] font-medium text-gray-500 mb-2">
                        PASIRINKITE TRANSPORTO TIPĄ
                      </label>
                      <select
                        value={selectedVehicle || ''}
                        onChange={(e) => setSelectedVehicle(e.target.value as VehicleType)}
                        className="w-full h-10 px-3 text-[13px] rounded-lg border border-gray-200 bg-white"
                      >
                        <option value="">Pasirinkite transportą</option>
                        <option value="car">Lengvasis</option>
                        <option value="van">Mikroautobusas</option>
                        <option value="lift">Su liftu</option>
                        <option value="crane">Fiskaras</option>
                        <option value="truck">Sunkvežimis</option>
                      </select>
                    </div>

                    {/* Workers and Hours in one line */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Workers Selection */}
                      <div className={clsx(
                        'transition-all',
                        pricingType === 'fixed' && 'opacity-50 pointer-events-none'
                      )}>
                        <select
                          value={`Krovikai: ${workerCount === 0 ? 'Nereikia' : `${workerCount} ${workerCount === 1 ? 'krovikas' : 'krovikai'}`}`}
                          onChange={handleWorkerChange}
                          className="w-full h-9 rounded-lg border border-gray-200 bg-white px-3 text-[13px]"
                        >
                          <option>Krovikai: Nereikia</option>
                          <option>Krovikai: 1 krovikas</option>
                          <option>Krovikai: 2 krovikai</option>
                          <option>Krovikai: 3 krovikai</option>
                        </select>
                      </div>

                      {/* Hours Input */}
                      <div className={clsx(
                        'transition-all',
                        pricingType === 'fixed' && 'opacity-50 pointer-events-none'
                      )}>
                        <input
                          type="number"
                          min="1"
                          placeholder="Valandų skaičius"
                          className="w-full h-9 rounded-lg border border-gray-200 bg-white px-3 text-[13px]"
                          value={hours || ''}
                          onChange={(e) => setHours(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    {/* Date and Calculate Button in one line */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <DatePicker
                          selectedDate={selectedDate}
                          onDateChange={handleDateChange}
                          className="text-[13px]"
                        />
                      </div>
                      <button
                        onClick={calculatePrice}
                        className="h-9 bg-[#BB0003] text-white text-[13px] font-medium rounded-full 
                        hover:bg-[#a30003] transition-all"
                      >
                        SKAIČIUOTI KAINĄ
                      </button>
                    </div>

                    {/* Warning Message Container - Mobile */}
                    <div className="min-h-[20px] mt-2">
                      {warningMessage && (
                        <p className="text-red-500 text-xs font-medium">{warningMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div
              className={clsx(
                "absolute inset-0 bg-white/80 backdrop-blur-[2px] p-6",
                "transition-all duration-500 ease-in-out",
                showResults ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-105'
              )}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl text-[#232323]">
                    Jūsų užklausa
                  </h2>
                  <button 
                    onClick={() => setShowResults(false)}
                    className="w-8 h-8 bg-white rounded-[8px] flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 12L6 8L10 4" stroke="#CECFD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                <div className="bg-white rounded-lg p-6 border border-[#CECFD4] mb-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paslauga:</span>
                      <span className="font-medium">{serviceType === 'moving' ? 'Perkraustymo paslaugos' : 'Fiskaro nuoma'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transportas:</span>
                      <span className="font-medium">{selectedVehicle ? VEHICLE_NAMES[selectedVehicle] : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Krovikai:</span>
                      <span className="font-medium">{workerCount || 'Nereikia'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Data:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{selectedDate?.toLocaleDateString('lt-LT')}</span>
                        {(isWeekend || isHoliday) && (
                          <span className="text-[#BB0003] text-[10px]">
                            ({isHoliday ? 'Šventinė diena' : 'Savaitgalis'}, 1.5x)
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pakrovimo adresas:</span>
                      <TruncatedText text={pickupValue} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pristatymo adresas:</span>
                      <TruncatedText text={deliveryValue} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Atstumas:</span>
                      <span className="font-medium">{Math.round(distance)} km</span>
                    </div>
                    <div className="flex justify-between text-lg pt-2 border-t">
                      <span className="font-medium">Preliminari kaina:</span>
                      <span className="font-medium text-[#BB0003]">{price}€</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-auto">
                  <p className="text-[12px]">
                    <span className="text-[#BB0003] font-medium">Pastaba:</span> {' '}
                    Kaina skaičiuojama pagal faktinį, išnaudotą valandų skaičių, bet nemažiau, negus 80% nuo užsakytų valandų sumos.
                  </p>
                  <div className="flex justify-end">
                    <button className="px-6 h-10 border border-[#BB0003] text-[#2A2D35] rounded-[12px] font-normal hover:bg-red-50 transition-colors">
                      Pateikti užsakymą
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewCalculator; 