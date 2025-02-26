'use client';

import { createContext, useContext } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const MapsContext = createContext<{ isLoaded: boolean }>({ isLoaded: false });

export function MapsProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  return (
    <MapsContext.Provider value={{ isLoaded }}>
      {children}
    </MapsContext.Provider>
  );
}

export const useMapsContext = () => useContext(MapsContext); 