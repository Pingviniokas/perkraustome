"use client";

import { useState } from 'react';
import DistanceCalculator from './DistanceCalculator';
import DisposalCalculator from './DisposalCalculator';
import CraneCalculator from './CraneCalculator';

type TabsContainerProps = {
  onTabChange: (tab: string) => void;
};

const TabsContainer = ({ onTabChange }: TabsContainerProps) => {
  const [activeTab, setActiveTab] = useState('moving');
  
  const tabs = [
    { id: 'moving', label: 'Pervežimas' },
    { id: 'disposal', label: 'Utilizavimas' },
    { id: 'crane', label: 'Fiskaro nuoma' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-px bg-gray-200 p-0.5 rounded-lg mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              relative py-2 px-2 rounded-md text-xs font-medium
              transition-all duration-300 ease-in-out
              ${activeTab === tab.id
                ? 'bg-white text-red-600 shadow-sm'
                : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <span className="relative z-10">{tab.label}</span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 transition-transform duration-300" />
            )}
          </button>
        ))}
      </div>

      <div className="h-[350px]">
        {activeTab === 'moving' && <DistanceCalculator />}
        {activeTab === 'disposal' && <DisposalCalculator />}
        {activeTab === 'crane' && <CraneCalculator />}
      </div>
    </div>
  );
};

export default TabsContainer;