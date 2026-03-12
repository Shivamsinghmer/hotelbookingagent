'use client';
import React from 'react';
import { FiInfo } from 'react-icons/fi';

export default function AboutSection({ description, checkinFrom, checkoutTo }) {
  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
        <FiInfo className="text-blue-500" />
        About the Property
      </h3>
      <div className="space-y-4 md:space-y-6">
        <p className="text-gray-600 leading-relaxed font-medium whitespace-pre-line bg-blue-50/50 p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-blue-100 font-body text-sm md:text-base">
          {description || "No detailed description available."}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 text-center sm:text-left">
            <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Check-in</span>
            <span className="text-sm font-bold text-gray-900">{checkinFrom || '14:00'}</span>
          </div>
          <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 text-center sm:text-left">
            <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Check-out</span>
            <span className="text-sm font-bold text-gray-900">{checkoutTo || '11:00'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
