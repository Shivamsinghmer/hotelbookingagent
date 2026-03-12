'use client';
import React from 'react';

export default function TabNavigation({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex bg-gray-50 p-1.5 md:p-2 rounded-xl md:rounded-2xl mb-6 md:mb-8 overflow-x-auto no-scrollbar max-w-full">
      <div className="flex min-w-full sm:min-w-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl text-[11px] md:text-sm font-bold transition-all whitespace-nowrap border-none cursor-pointer ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <tab.icon size={16} className="md:w-[18px] md:h-[18px]" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
