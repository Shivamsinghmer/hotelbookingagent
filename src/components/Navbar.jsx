'use client';
import React, { useState } from 'react';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { FiUser, FiGlobe } from 'react-icons/fi';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo Area */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-2 group no-underline">
              <span className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">🏨</span>
              <span className="text-2xl font-black text-white tracking-tighter">StayEase</span>
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/10">
               <FiGlobe size={14} className="text-blue-400" />
               Booking.com
             </div>
             
             {/* Mobile Menu Toggle */}
             <button 
               onClick={() => setMobileOpen(!mobileOpen)}
               className="sm:hidden w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white outline-none active:scale-90 transition-all"
             >
               {mobileOpen ? <HiX size={20} /> : <HiOutlineMenuAlt3 size={20} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`sm:hidden fixed inset-0 z-[100] transition-all duration-500 ${mobileOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setMobileOpen(false)}
        />
        <div className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-500 ease-out transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} p-8 flex flex-col`}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏨</span>
              <span className="text-xl font-black text-gray-900 tracking-tighter">StayEase</span>
            </div>
            <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-gray-900 border-none bg-transparent cursor-pointer">
              <HiX size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <a href="#" className="flex items-center gap-4 text-gray-900 font-black text-lg no-underline hover:text-blue-600 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center"><FiGlobe className="text-blue-500" /></div>
              <span>Explore Stays</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-900 font-black text-lg no-underline hover:text-blue-600 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center"><FiUser className="text-violet-500" /></div>
              <span>My Account</span>
            </a>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-100">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Partner with us</p>
             <p className="text-xs font-bold text-gray-900 opacity-60">Add your property to StayEase</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
