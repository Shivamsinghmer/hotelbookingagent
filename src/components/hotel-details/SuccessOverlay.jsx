'use client';
import React from 'react';
import { HiCheckCircle } from 'react-icons/hi2';

export default function SuccessOverlay({ hotelName, roomName, onClose }) {
  return (
    <div className="absolute inset-0 z-[120] bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 scale-110">
        <HiCheckCircle size={60} />
      </div>
      <h2 className="text-4xl font-black text-gray-900 mb-2 font-heading">Booking Confirmed!</h2>
      <p className="text-gray-500 font-medium mb-8 max-w-sm">
        Your stay at <span className="text-blue-600 font-bold">{hotelName}</span> ({roomName}) has been successfully reserved.
      </p>
      <button 
        onClick={onClose}
        className="bg-black text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all"
      >
        Back to Search
      </button>
    </div>
  );
}
