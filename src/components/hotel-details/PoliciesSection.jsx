'use client';
import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

export default function PoliciesSection({ policies }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 max-w-3xl">
      <h3 className="text-2xl font-black text-gray-900 mb-8">Hotel Policies</h3>
      <div className="grid grid-cols-1 gap-4">
        {policies.length > 0 ? policies.map((policy, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">{policy.type || 'Terms'}</h4>
            <p className="text-sm text-gray-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: policy.content }} />
          </div>
        )) : (
          <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 text-center">
            <FiAlertCircle size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">Standard hotel policies apply. Please contact the front desk for details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
