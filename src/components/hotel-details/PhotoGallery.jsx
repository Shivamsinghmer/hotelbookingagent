'use client';
import React from 'react';
import { FiImage } from 'react-icons/fi';

export default function PhotoGallery({ photos }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {photos.map((photo, i) => (
        <div key={i} className="aspect-square rounded-3xl overflow-hidden group bg-gray-100">
          {photo.url ? (
            <img 
              src={photo.url} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              alt="Hotel" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <FiImage size={24} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
