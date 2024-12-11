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
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  const tabs = [
    { id: 'moving', label: 'Pervežimas' },
    { id: 'disposal', label: 'Utilizavimas' },
    { id: 'crane', label: 'Fiskaro nuoma' }
  ];

  return (
    <div className="w-full">
      <div className="flex space-x-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              relative px-6 py-2 text-sm font-medium rounded-t-lg 
              transition-all duration-200 ease-in-out
              ${activeTab === tab.id
                ? 'bg-white text-red-600 shadow-md z-10'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
              before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1
              ${activeTab === tab.id ? 'before:bg-red-600' : 'before:bg-transparent'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4">
        {activeTab === 'moving' && <DistanceCalculator />}
        {activeTab === 'disposal' && <DisposalCalculator />}
        {activeTab === 'crane' && <CraneCalculator />}
      </div>
    </div>
  );
};

export default TabsContainer;