'use client';
import React from 'react';
import { FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';

export default function ManualSearchForm({ 
  destination, setDestination, 
  checkin, setCheckin, 
  checkout, setCheckout, 
  adults, setAdults, 
  rooms, setRooms 
}) {
  return (
    <div className="grid flex-grow gap-2 grid-cols-1 md:grid-cols-12">
      {/* Destination */}
      <div className="bg-gray-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-transparent hover:border-blue-100 transition-all group md:col-span-4">
        <label className="flex items-center gap-2 text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 font-heading">
          <FiMapPin size={10} />
          Place
        </label>
        <input 
          type="text" 
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Search destination..." 
          className="w-full bg-transparent text-sm font-bold text-gray-900 outline-none p-0 placeholder:text-gray-400 font-body" 
        />
      </div>

      {/* Check-in */}
      <div className="bg-gray-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-transparent hover:border-blue-100 transition-all group md:col-span-2">
        <label className="flex items-center gap-2 text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 font-heading">
          <FiCalendar size={10} />
          Check-in
        </label>
        <input 
          type="date" 
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          className="w-full bg-transparent text-sm font-bold text-gray-900 outline-none p-0 font-body" 
        />
      </div>

      {/* Check-out */}
      <div className="bg-gray-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-transparent hover:border-blue-100 transition-all group md:col-span-2">
        <label className="flex items-center gap-2 text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 font-heading">
          <FiCalendar size={10} />
          Check-out
        </label>
        <input 
          type="date" 
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          className="w-full bg-transparent text-sm font-bold text-gray-900 outline-none p-0 font-body" 
        />
      </div>

      {/* Adults */}
      <div className="bg-gray-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-transparent hover:border-blue-100 transition-all group md:col-span-2">
        <label className="flex items-center gap-2 text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 font-heading">
          <FiUsers size={10} />
          Adults
        </label>
        <input 
          type="number" 
          min="1"
          max="10"
          value={adults}
          onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
          className="w-full bg-transparent text-sm font-bold text-gray-900 outline-none p-0 font-body" 
        />
      </div>

      {/* Rooms */}
      <div className="bg-gray-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-transparent hover:border-blue-100 transition-all group md:col-span-2">
        <label className="flex items-center gap-2 text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 font-heading">
          <IoBedOutline size={10} />
          Rooms
        </label>
        <input 
          type="number" 
          min="1"
          max="5"
          value={rooms}
          onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
          className="w-full bg-transparent text-sm font-bold text-gray-900 outline-none p-0 font-body" 
        />
      </div>
    </div>
  );
}
