'use client';
import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-16 px-4 sm:px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-12 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4 md:space-y-6 max-w-sm flex flex-col items-center md:items-start">
            <a href="/" className="flex items-center gap-2 no-underline group">
              <span className="text-xl md:text-2xl transition-transform group-hover:scale-110 duration-300">🏨</span>
              <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">StayEase</span>
            </a>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium">
              Your personal AI scout for the world's most exceptional hotel stays. We find the luxury, comfort, and value you deserve.
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-8 md:gap-12">
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4">Inquiries</h4>
              <p className="text-xs md:text-sm font-bold text-gray-900 opacity-80 hover:opacity-100 cursor-pointer transition-opacity">bookings@stayease.com</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4">Location</h4>
              <p className="text-xs md:text-sm font-bold text-gray-900 opacity-80">Global Support HK</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
