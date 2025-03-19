import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './Context/TaskContext.jsx';
import Sidebar from './components/SideBar.jsx';
import Dashboard from './pages/DashBoard.jsx';
import Games from './pages/Games.jsx';
import Rewards from './pages/Rewards.jsx';
import Missions from './pages/Mission.jsx';
import Quests from './pages/Quests.jsx';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <TaskProvider>
      <Router>
        <div className="app-container">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/games" element={<Games />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/missions" element={<Missions />} />
              <Route path="/quests" element={<Quests />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;