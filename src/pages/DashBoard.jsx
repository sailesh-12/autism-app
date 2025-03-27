
import './Dashboard.css'
import React, { useState, useEffect } from 'react';
import { Bell, Menu } from 'lucide-react';
import Sidebar from '../components/SideBar.jsx';
import { useNavigate } from 'react-router-dom';

export default function DashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const navigate = useNavigate();

  const quotes = [
    "You are stronger than you think—every day is a new chance to shine!",
    "Embrace your uniqueness; it’s your superpower!",
    "Progress, not perfection—small steps lead to big victories.",
    "The only limit is the one you set for yourself—break free!",
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000); // 5 seconds
    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-200">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-white bg-opacity-80 backdrop-blur-md shadow-lg sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-indigo-900 p-2 rounded-full hover:bg-indigo-100 hover:scale-110 transition-transform duration-200 md:hidden"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-extrabold text-indigo-900 ml-3 tracking-tight animate-pulse-slow">
                My Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-indigo-900 relative p-2 rounded-full hover:bg-indigo-100 hover:scale-110 transition-transform duration-200">
                <Bell size={22} />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  3
                </span>
              </button>
              <div className="flex items-center bg-indigo-100 bg-opacity-70 backdrop-blur-sm px-3 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm animate-spin-slow">
                  JS
                </div>
                <span className="ml-2 font-medium text-indigo-900">Jamie</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto p-6">
          <h2 className="text-4xl font-bold text-indigo-900 mb-8 animate-fadeIn tracking-wide drop-shadow-lg">
            Welcome to NeuroHelp!
          </h2>

          {/* Quote Section */}
          <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl shadow-2xl p-8 mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
            <p
              key={currentQuote} // Key ensures re-render for animation
              className="text-2xl font-medium text-white text-center animate-quoteFade"
            >
              {quotes[currentQuote]}
            </p>
          </div>

          {/* About Section */}
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl p-8 animate-slideUp transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4 drop-shadow-md">
              About NeuroHelp
            </h3>
            <p className="text-gray-700 leading-relaxed">
              NeuroHelp is your supportive companion designed to empower individuals on the autism spectrum. With tools and features tailored to your needs, we’re here to help you thrive every day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}