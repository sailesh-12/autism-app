import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import DashBoard from './pages/DashBoard.jsx';
import DailyActivityReward from './pages/DailyActivityReward.jsx';
import SpeechEnhancer from './pages/SpeechEnhancer.jsx';
import CommunityForum from './pages/CommunityForum.jsx';
import Chatbot from './pages/ChatBot.jsx';
import ToDoTasks from './pages/ToDoTasks.jsx';
import PomodoroTimer from './pages/Pomodorotimer.jsx';
import HydrationTracker from './pages/Hydration.jsx';
import MoodSounds from './pages/MoodSounds.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [points, setPoints] = useState(0);
  const [points1, setPoints1] = useState(0);
  const addPoints = (amount) => setPoints((prev) => prev + amount);
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('handleLogin called, setting isAuthenticated to true');
    setIsAuthenticated(true);
    navigate('/dashboard'); // Navigate to dashboard only on login
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route 
          path="/signup" 
          element={!isAuthenticated ? <SignUp onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <DashBoard /> : <Navigate to="/signup" />} 
        />
        <Route 
          path="/daily-activity-reward" 
          element={isAuthenticated ? <DailyActivityReward points={points} setPoints={setPoints} />: <Navigate to="/signup" />} 
        />
        <Route 
          path="/speech-enhancer" 
          element={isAuthenticated ? <SpeechEnhancer /> : <Navigate to="/signup" />} 
        />
        <Route 
          path="/community-forum" 
          element={isAuthenticated ? <CommunityForum /> : <Navigate to="/signup" />} 
        />
        <Route 
          path="/chatbot" 
          element={isAuthenticated ? <Chatbot /> : <Navigate to="/signup" />} 
        />
        <Route 
          path="/to-do-tasks" 
          element={isAuthenticated ? <ToDoTasks addPoints={addPoints} /> : <Navigate to="/signup" />} 
        />
        <Route 
          path="/pomodoro-timer" 
          element={isAuthenticated ? <PomodoroTimer /> : <Navigate to="/signup" />} 
        />
        <Route 
          path="/hydration-tracker" 
          element={isAuthenticated ? <HydrationTracker /> : <Navigate to="/signup" />} 
        />
        <Route 
          path="/mood-sounds" 
          element={isAuthenticated ? <MoodSounds /> : <Navigate to="/signup" />} 
        />
      </Routes>
    </div>
  );
}

export default App;