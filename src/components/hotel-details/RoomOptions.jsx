'use client';
import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

export default function RoomOptions({ rooms, onReserve }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-gray-900 font-heading">Room Options</h3>
        <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold uppercase tracking-wider">
          {rooms.length > 0 ? 'Live Availability' : 'Property Room List'}
        </div>
      </div>
      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {rooms.slice(0, 10).map((room, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-[32px] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-blue-50/30 transition-colors">
              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-gray-900">{room.room_name || room.name || 'Standard Room'}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{room.room_type || room.type || 'Hotel Stay'}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Price for Stay</span>
                  <span className="text-xl font-black text-blue-600">
                    {room.min_total_price ? `$${Math.round(room.min_total_price)}` : 
                     room.price ? `$${Math.round(room.price)}` : 'Check Price'}
                  </span>
                </div>
                <button 
                  onClick={() => onReserve(room)}
                  className="bg-black text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg shadow-black/10 active:scale-95 transition-all"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-50 rounded-[40px] border border-gray-100">
          <FiAlertCircle size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-bold mb-2">No live availability for these specific dates.</p>
          <p className="text-xs text-gray-400 font-medium">Try clicking the 'Check Availability' button below or changing your dates.</p>
        </div>
      )}
    </div>
  );
}
