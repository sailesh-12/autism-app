import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashBoard.jsx';
import Games from './pages/Games.jsx';
import Rewards from './pages/Rewards.jsx';
import Missions from './pages/Mission.jsx';
import Quests from './pages/Quests.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/games" element={<Games />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;