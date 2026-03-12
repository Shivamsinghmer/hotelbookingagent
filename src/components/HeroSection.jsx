'use client';
import React, { useState } from 'react';
import { FiMapPin, FiCalendar, FiUsers, FiSearch, FiMic, FiArrowRight } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { HiSparkles } from 'react-icons/hi2';

import ManualSearchForm from './ManualSearchForm';
import AIPromptSection from './AIPromptSection';

export default function HeroSection({ onOpenChat, onSearch }) {
  const [bookingMode, setBookingMode] = useState('ai');
  
  // Search state
  const [destination, setDestination] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [adults, setAdults] = useState(1);
  const [rooms, setRooms] = useState(1);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ 
        destination, 
        checkin, 
        checkout, 
        guests: `${adults} Adults, ${rooms} Room${rooms > 1 ? 's' : ''}` 
      });
    }
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center pt-24 md:pt-32 pb-12 md:pb-20 px-4 overflow-hidden text-body">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-hotel.png"
          alt="Luxury Resort"
          className="w-full h-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center mb-8 md:mb-12 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight font-heading">
          Where would you like to <span className="text-blue-400">stay</span>?
        </h1>
        <p className="text-sm md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed italic">
          Scouting the world's most exceptional hotels with AI precision.
        </p>
      </div>

      {/* Booking Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-0 sm:px-4">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl md:rounded-[40px] shadow-2xl overflow-hidden border border-white/20 p-2 md:p-3">
          
          {/* Top Selection Row */}
          <div className="flex justify-center p-2 md:p-4">
            <div className="flex items-center bg-gray-100/80 p-1 rounded-xl md:rounded-2xl font-heading w-full md:w-auto">
              <button
                onClick={() => setBookingMode('manual')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${bookingMode === 'manual' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <FiSearch size={14} />
                <span>Manual</span>
              </button>
              <button
                onClick={() => setBookingMode('ai')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-8 py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${bookingMode === 'ai' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <HiSparkles size={16} className={bookingMode === 'ai' ? 'text-white' : 'text-blue-500'} />
                <span>Talk to AI</span>
              </button>
            </div>
          </div>

          {/* Form / AI Content */}
          <div className="p-3 pb-6 md:p-6 md:pb-10">
            {bookingMode === 'manual' ? (
              <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-2">
                <ManualSearchForm 
                  destination={destination} setDestination={setDestination}
                  checkin={checkin} setCheckin={setCheckin}
                  checkout={checkout} setCheckout={setCheckout}
                  adults={adults} setAdults={setAdults}
                  rooms={rooms} setRooms={setRooms}
                />
                <button 
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-black text-white px-8 h-14 md:h-auto rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                >
                  <FiSearch size={24} />
                </button>
              </div>
            ) : (
              <AIPromptSection onOpenChat={onOpenChat} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

