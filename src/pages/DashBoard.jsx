
import './Dashboard.css'
import React, { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import Sidebar from '../components/SideBar.jsx';
import { useNavigate } from 'react-router-dom';

export default function DashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex bg-indigo-50">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar} 
                className="text-blue-900 p-1 rounded-full hover:bg-blue-100 md:hidden"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-blue-900 ml-3">My Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-blue-900 relative p-2 rounded-full hover:bg-blue-100">
                <Bell size={22} />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center bg-blue-100 px-3 py-2 rounded-full">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  JS
                </div>
                <span className="ml-2 font-medium text-blue-900">Jamie</span>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto p-6">
          <h2 className="text-3xl font-semibold text-indigo-900 mb-6 animate-fadeIn">
            Welcome to AutiPal!
          </h2>
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg p-8 mb-6 animate-slideUp text-center">
            <p className="text-2xl font-medium text-white">
              "You are stronger than you think—every day is a new chance to shine!"
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-indigo-800 mb-4">About AutiPal</h3>
            <p className="text-gray-700">
              AutiPal is your supportive companion designed to empower individuals on the autism spectrum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}