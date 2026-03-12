'use client';
import React, { useState, useRef, useEffect } from 'react';
import { HiSparkles, HiXMark } from 'react-icons/hi2';
import { FiSend, FiMic, FiUser } from 'react-icons/fi';
import axios from 'axios';

export default function ChatPanel({ isOpen, onClose, initialMessage, onTriggerSearch }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const initialized = useRef(false);

  // Initialize welcome message only once
  useEffect(() => {
    if (isOpen && !initialized.current) {
      initialized.current = true;
      const welcome = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: "Hello! 👋 I'm your AI booking assistant. I can help you find the perfect hotel stay and plan your trip. What hotel or destination are you looking for today?",
        time: new Date(),
      };
      setMessages([welcome]);

      if (initialMessage) {
        handleSendMessage(initialMessage, [welcome]);
      }
    }
  }, [isOpen, initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (text, currentMessages = messages) => {
    if (!text.trim()) return;
    
    const userMsg = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      text: text,
      time: new Date(),
    };
    
    const updatedMessages = [...currentMessages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('/api/chat', {
        messages: updatedMessages.map(m => ({
          role: m.role === 'ai' ? 'assistant' : 'user',
          content: m.text
        }))
      });

      const aiText = response.data.text;
      
      // Parse for structured data signal
      const jsonMatch = aiText.match(/FINAL_BOOKING_DATA:\s*({.*})/);
      const cleanAiText = aiText.replace(/FINAL_BOOKING_DATA:\s*({.*})/, '').trim();

      const aiMsg = {
        id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: 'ai',
        text: cleanAiText,
        time: new Date(),
      };

      setMessages(prev => [...prev, aiMsg]);

      // If AI provided the final data, trigger the search
      if (jsonMatch) {
        try {
          const bookingData = JSON.parse(jsonMatch[1]);
          setTimeout(() => {
            if (onTriggerSearch) {
              onTriggerSearch({
                destination: bookingData.destination,
                checkin: bookingData.checkin,
                checkout: bookingData.checkout,
                guests: `${bookingData.guests} Guest, ${bookingData.rooms} Room`
              });
            }
            onClose();
          }, 1500);
        } catch (e) {
          console.error('Failed to parse booking JSON', e);
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'ai',
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        time: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const onSend = () => {
    handleSendMessage(input);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300" 
      onClick={onClose}
    >
      <div 
        className="bg-white w-full sm:max-w-[440px] h-[100dvh] sm:h-[650px] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-4 md:px-5 py-3 md:py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
              <HiSparkles size={18} />
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-bold text-gray-900 m-0 leading-tight">AI Booking Agent</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] md:text-[11px] font-medium text-gray-400">Active now</span>
              </div>
            </div>
          </div>
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all border-none cursor-pointer" 
            onClick={onClose}
          >
            <HiXMark size={20} />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'ai' 
                    ? 'bg-violet-100 text-violet-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {msg.role === 'ai' ? <HiSparkles size={16} /> : <FiUser size={16} />}
                </div>
                <div className="space-y-1">
                  <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100'
                  }`}>
                    <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                  </div>
                  <span className={`text-[10px] font-medium text-gray-400 block px-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-[85%] gap-2 flex-row">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center bg-violet-100 text-violet-600">
                  <HiSparkles size={16} />
                </div>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-5 pt-2 flex-shrink-0">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-2 flex items-center gap-2 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-200">

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-400 py-2.5"
              id="chat-input-field"
            />
            <button 
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all border-none cursor-pointer ${
                input.trim() 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              onClick={onSend}
              disabled={!input.trim()}
              id="send-msg-btn"
            >
              <FiSend size={18} />
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-3 font-medium">Powered by StayEase Intelligence</p>
        </div>
      </div>
    </div>
  );
}

function formatMessage(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}
