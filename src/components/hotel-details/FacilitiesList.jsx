'use client';
import React from 'react';
import { HiCheckCircle } from 'react-icons/hi2';

export default function FacilitiesList({ facilities }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-black text-gray-900 mb-8">What this property offers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12">
        {facilities.map((fac, i) => (
          <div key={i} className="flex items-center gap-3 py-1 text-gray-600 group">
            <HiCheckCircle size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm">{fac.name || "Available"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
