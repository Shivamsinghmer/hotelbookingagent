'use client';
import React from 'react';
import { FiStar, FiMapPin, FiWifi, FiCheckCircle } from 'react-icons/fi';
import { IoIosBed } from 'react-icons/io';

export default function HotelResults({ hotels, loading, onSelect }) {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-6 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
        <p className="text-gray-500 font-bold animate-pulse">Finding the best hotels for you...</p>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) return null;

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto bg-white" id="results">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
        <div className="space-y-3 md:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
            <FiCheckCircle size={14} className="text-blue-500 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-widest">Available Stays</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Search Results
          </h2>
        </div>
        <p className="text-xs md:text-base text-gray-500 font-medium">Found {hotels.length} properties matching your search</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((item, index) => {
          // The API returns hotels inside a 'property' object
          const hotel = item.property || item;
          const photoUrl = hotel.photoUrls?.[0] || hotel.main_photo_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800';
          const name = hotel.name || hotel.hotel_name;
          const score = hotel.reviewScore || hotel.review_score;
          const price = hotel.priceBreakdown?.grossPrice?.value || hotel.price_breakdown?.gross_amount || 0;
          const currency = hotel.priceBreakdown?.grossPrice?.currency || hotel.price_breakdown?.currency || 'USD';
          
          return (
            <div key={hotel.id || hotel.hotel_id || index} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={photoUrl} 
                  alt={name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-lg">
                  <FiStar size={14} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-black text-gray-900">{score ? score.toFixed(1) : 'N/A'}</span>
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {hotel.propertyClass ? `${hotel.propertyClass} Stars` : 'Hotel'}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {name}
                </h3>
                
                <div className="flex items-center gap-1.5 text-gray-400 mb-4">
                  <FiMapPin size={14} />
                  <span className="text-xs font-bold uppercase tracking-wide truncate">
                    {hotel.wishlistName || hotel.city_name_en || 'City Center'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                    <IoIosBed size={12} />
                    <span>{hotel.reviewCount || 0}+ Reviews</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                    <FiWifi size={12} />
                    <span>Free WiFi</span>
                  </div>
                </div>

                <div className="mt-auto border-t border-gray-100 pt-6 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Price</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-gray-900">
                        {currency} {Math.round(price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                    <button 
                    onClick={() => onSelect && onSelect(hotel.id || hotel.hotel_id)}
                    className="bg-gray-900 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-black transition-all active:scale-95 shadow-lg shadow-gray-200"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
