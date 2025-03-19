import React, { useState } from 'react';
import TaskScheduler from '../components/TaskScheduler';
import { motion } from 'framer-motion';
import { FaTasks } from 'react-icons/fa';
import './Global.css'; // Ensure this matches your existing CSS or update below

const Mission = () => {
  const [missions, setMissions] = useState([]); // State to hold missions

  const handleSave = (newMission) => {
    const missionWithId = {
      ...newMission,
      id: Date.now().toString(), // Unique ID based on timestamp
      completed: false, // Default status
    };
    setMissions([...missions, missionWithId]); // Add new mission to the list
  };

  return (
    <div className="missions-page">
      <h1 className="page-title">
        <FaTasks /> Mission HQ
      </h1>
      <TaskScheduler onSave={handleSave} />
      <div className="mission-list">
        {missions.length === 0 ? (
          <p className="no-missions">No missions yet! Add some adventures!</p>
        ) : (
          missions.map(mission => (
            <motion.div
              key={mission.id}
              className="mission-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span>{mission.title}</span>
              <span className="mission-status" style={{ color: mission.completed ? '#4caf50' : '#f44336' }}>
                {mission.completed ? ' Done!' : ' Pending'}
              </span>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Mission;