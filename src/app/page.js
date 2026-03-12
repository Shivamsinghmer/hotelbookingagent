'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HotelResults from '@/components/HotelResults';
import ChatPanel from '@/components/ChatPanel';
import Footer from '@/components/Footer';
import HotelDetailsModal from '@/components/HotelDetailsModal';
import axios from 'axios';

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMsg, setInitialMsg] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [searchContext, setSearchContext] = useState(null);

  const handleOpenChat = (msg) => {
    setInitialMsg(msg || '');
    setChatOpen(true);
  };

  const handleSearch = async (searchData) => {
    setLoading(true);
    setHotels([]); 
    setSearchContext(searchData);
    
    setTimeout(() => {
      const el = document.getElementById('results');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const response = await axios.get('/api/hotelBooking', {
        params: {
          destination: searchData.destination,
          checkinDate: searchData.checkin,
          checkoutDate: searchData.checkout,
          adults: searchData.guests?.split(' ')[0] || '1',
          rooms: searchData.guests?.split(' ')[2] || '1'
        }
      });
      
      if (response.data?.data?.hotels) {
        setHotels(response.data.data.hotels);
      } else if (response.data?.result) {
        setHotels(response.data.result);
      } else {
        setHotels([]);
      }
    } catch (error) {
      console.error('Search failed:', error);
      const errorMsg = error.response?.data?.details?.message || error.message;
      if (errorMsg.includes('not subscribed')) {
        alert('API Subscription Error: Please subscribe to the Booking.com API on RapidAPI.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHotel = (id) => {
    setSelectedHotelId(id);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection onOpenChat={handleOpenChat} onSearch={handleSearch} />
      
      {(loading || hotels.length > 0) && (
        <HotelResults 
          hotels={hotels} 
          loading={loading} 
          onSelect={handleSelectHotel} 
        />
      )}
      
      <Footer />
      
      {/* Dynamic Overlays */}
      <HotelDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        hotelId={selectedHotelId}
        arrivalDate={searchContext?.checkin}
        departureDate={searchContext?.checkout}
      />

      <ChatPanel 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
        initialMessage={initialMsg}
        onTriggerSearch={handleSearch}
      />
    </main>
  );
}