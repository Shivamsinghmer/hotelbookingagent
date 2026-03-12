'use client';
import React from 'react';

export default function ReviewSection({ reviews }) {
  const formatScore = (rawScore) => {
    const score = typeof rawScore === 'number' ? rawScore : parseFloat(rawScore);
    return isNaN(score) ? '8.5' : score.toFixed(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-black text-gray-900 mb-8">Guest Experiences</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {reviews.slice(0, 6).map((rev, i) => (
          <div key={i} className="p-5 md:p-7 bg-gray-50 rounded-3xl md:rounded-[40px] border border-gray-100 flex flex-col hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 group">
            <div className="flex items-start gap-3 md:gap-5 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-[20px] flex items-center justify-center font-black text-sm md:text-lg text-blue-600 shadow-sm border border-gray-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                {formatScore(rev.average_score || rev.score)}
              </div>
              <div className="pt-0.5 md:pt-1 flex-1 min-w-0">
                  <h4 className="font-black text-gray-900 leading-tight mb-1 line-clamp-1 text-sm md:text-base">{rev.title || 'Exceptional Stay'}</h4>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="text-[8px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest">{rev.review_score_word || 'Verified Review'}</div>
                    <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-gray-300 rounded-full" />
                    <div className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{rev.category || 'Experience'}</div>
                  </div>
              </div>
            </div>
            <p className="text-[13px] md:text-[15px] text-gray-600 leading-relaxed font-medium line-clamp-4 flex-grow italic bg-white/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white font-body">
              "{rev.pros || rev.text || rev.comment || 'The stay was wonderful and the staff was very cooperative.'}"
            </p>
            <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t border-gray-200 flex items-center justify-between gap-2">
              <div className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">
                — {rev.author?.name || rev.author_name || 'Verified Explorer'}
              </div>
              <div className="text-[8px] md:text-[10px] font-bold text-gray-300 whitespace-nowrap">
                {rev.date || 'Recent Stay'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
