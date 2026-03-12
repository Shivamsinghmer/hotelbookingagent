'use client';
import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function AIPromptSection({ onOpenChat }) {
  const [msg, setMsg] = useState('');
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-grow bg-gray-50 rounded-xl md:rounded-2xl p-1 md:p-2 px-4 md:px-6 flex items-center gap-4 border border-transparent focus-within:bg-blue-50/50 focus-within:border-blue-100 transition-all">
          <input 
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onOpenChat(msg)}
            placeholder="Find me a 5-star stay in Dubai..."
            className="flex-grow bg-transparent py-4 md:py-5 outline-none text-gray-800 font-bold text-sm placeholder:text-gray-400 placeholder:font-medium font-body"
          />
        </div>
        <button 
          onClick={() => onOpenChat(msg)}
          className="bg-blue-600 hover:bg-black text-white px-6 md:px-8 py-4 md:py-3 rounded-xl md:rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 active:scale-95 transition-all h-14 md:h-auto"
        >
          <span>Consult AI</span>
          <FiArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
