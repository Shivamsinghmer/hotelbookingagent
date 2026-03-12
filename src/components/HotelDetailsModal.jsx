'use client';
import React, { useState, useEffect } from 'react';
import { HiXMark, HiStar } from 'react-icons/hi2';
import { FiInfo, FiImage, FiMessageSquare, FiList, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';

// Sub-components
import SuccessOverlay from './hotel-details/SuccessOverlay';
import RoomOptions from './hotel-details/RoomOptions';
import TabNavigation from './hotel-details/TabNavigation';
import PhotoGallery from './hotel-details/PhotoGallery';
import AboutSection from './hotel-details/AboutSection';
import FacilitiesList from './hotel-details/FacilitiesList';
import PoliciesSection from './hotel-details/PoliciesSection';
import ReviewSection from './hotel-details/ReviewSection';

export default function HotelDetailsModal({ isOpen, onClose, hotelId, arrivalDate, departureDate }) {
  const [activeTab, setActiveTab] = useState('photos');
  const [data, setData] = useState({
    details: null,
    photos: [],
    reviews: [],
    facilities: [],
    policies: [],
    description: '',
    rooms: []
  });
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (isOpen && hotelId) {
      setBookingSuccess(false);
      fetchAllData();
    }
  }, [isOpen, hotelId]);

  const handleReserve = (room) => {
    setSelectedRoom(room);
    setBookingSuccess(true);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const params = { hotel_id: hotelId };
      const availParams = { 
        hotel_id: hotelId, 
        type: 'availability',
        arrival_date: arrivalDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        departure_date: departureDate || new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0],
        adults: '1',
        room_qty: '1'
      };

      const results = await Promise.allSettled([
        axios.get('/api/hotelData', { params: { ...params, type: 'details' } }),
        axios.get('/api/hotelData', { params: { ...params, type: 'photos' } }),
        axios.get('/api/hotelData', { params: { ...params, type: 'description' } }),
        axios.get('/api/hotelData', { params: { ...params, type: 'reviews' } }),
        axios.get('/api/hotelData', { params: { ...params, type: 'facilities' } }),
        axios.get('/api/hotelData', { params: { ...params, type: 'policies' } }),
        axios.get('/api/hotelData', { params: availParams }),
      ]);

      const [details, photos, description, reviews, facilities, policies, rooms] = results.map(r => r.status === 'fulfilled' ? r.value : null);

      const ensureArray = (val) => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        if (typeof val === 'object') {
          const keys = ['data', 'list', 'result', 'facilities', 'policies', 'block'];
          for (const key of keys) {
            if (Array.isArray(val[key])) return val[key];
          }
          return Object.entries(val).map(([key, value]) => ({
            _key: key,
            ...(typeof value === 'object' ? value : { value })
          }));
        }
        return [];
      };

      setData({
        details: details?.data?.data || details?.data,
        photos: ensureArray(photos?.data?.data || photos?.data).map(p => ({
          url: p.url_max || p.url_square60 || p.url_640x480 || p.url || (typeof p === 'string' ? p : '')
        })),
        description: description?.data?.data?.[0]?.description || description?.data?.data?.description || description?.data?.[0]?.description || description?.data?.description || details?.data?.data?.description || details?.data?.description || '',
        reviews: ensureArray(reviews?.data?.data?.result || reviews?.data?.result || reviews?.data?.data || reviews?.data),
        facilities: ensureArray(facilities?.data?.data || facilities?.data || facilities?.data?.facilities || facilities?.data?.hotel_facilities).map(f => {
          const name = f.facility_name || f.name || f.facility_type_name || f.value || f.text || (typeof f === 'string' ? f : '');
          return { name: name !== 'Available' ? name : (f._key || name) };
        }),
        policies: ensureArray(policies?.data?.data || policies?.data || policies?.data?.policies || policies?.data?.property_policies).map(p => {
          let content = p.content || p.value || p.text || '';
          if (content && typeof content === 'object') {
            content = content.translated_content || content.value || content.text || Object.values(content).find(v => typeof v === 'string') || JSON.stringify(content);
          }
          let type = p.type || p.policy_type || p._key || 'Policy';
          type = type.replace('POLICY_', '').replace(/_/g, ' ');
          return { type: type, content: content || '' };
        }),
        rooms: ensureArray(rooms?.data?.data?.block || rooms?.data?.block || rooms?.data?.data || rooms?.data)
      });
    } catch (err) {
      console.error("Critical error in modal data fetch", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'photos', icon: FiImage, label: 'Photos' },
    { id: 'info', icon: FiInfo, label: 'About' },
    { id: 'rooms', icon: FiList, label: 'Rooms' },
    { id: 'facilities', icon: FiList, label: 'Facilities' },
    { id: 'policies', icon: FiAlertCircle, label: 'Policies' },
    { id: 'reviews', icon: FiMessageSquare, label: 'Reviews' },
  ];

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-[100dvh] sm:h-[90vh] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300 relative font-body">
        
        {bookingSuccess && (
          <SuccessOverlay 
            hotelName={data.details?.name} 
            roomName={selectedRoom?.room_name || 'Standard Room'} 
            onClose={onClose} 
          />
        )}

        <div className="relative h-16 md:h-20 px-4 md:px-8 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-blue-600 text-white p-2 md:p-2.5 rounded-xl md:rounded-2xl shadow-lg shadow-blue-600/20">
              <HiStar size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm md:text-xl font-extrabold text-gray-900 leading-none font-heading truncate">{data.details?.name || 'Property Details'}</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 hidden xs:block">Property & availability</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all border-none cursor-pointer">
            <HiXMark size={24} className="md:w-7 md:h-7" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-4 border-blue-600 border-t-transparent"></div>
              <p className="text-gray-400 text-sm font-bold animate-pulse">Gathering info...</p>
            </div>
          ) : (
            <div className="p-4 md:p-8">
              <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="min-h-[300px] md:min-h-[400px]">
                {activeTab === 'photos' && <PhotoGallery photos={data.photos} />}
                {activeTab === 'info' && <AboutSection description={data.description} checkinFrom={data.details?.checkin_from} checkoutTo={data.details?.checkout_to} />}
                {activeTab === 'rooms' && <RoomOptions rooms={data.rooms} onReserve={handleReserve} />}
                {activeTab === 'facilities' && <FacilitiesList facilities={data.facilities} />}
                {activeTab === 'policies' && <PoliciesSection policies={data.policies} />}
                {activeTab === 'reviews' && <ReviewSection reviews={data.reviews} />}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 h-20 md:h-24 border-t border-gray-100 flex items-center justify-between px-6 md:px-8 flex-shrink-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2">
            <FiAlertCircle className="text-amber-500" />
            <span className="text-[10px] md:text-xs font-bold text-gray-500 underline decoration-dotted">Review Policies</span>
          </div>
          <button 
            onClick={() => handleReserve(data.rooms[0] || { room_name: 'Standard Room' })}
            className="bg-blue-600 hover:bg-black text-white px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-[11px] md:text-sm font-black transition-all active:scale-95 shadow-xl shadow-blue-600/20"
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
}
