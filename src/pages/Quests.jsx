import React from 'react';
import { FaMap } from 'react-icons/fa';
import './Global.css'
const Quests = () => {
  const habitData = [new Date(), new Date(Date.now() - 86400000)]; // Mock data

  return (
    <div className="quests-page">
      <h1 className="page-title">Quest Log</h1>
      <div className="quest-details">
        <p className="streak-text">
          <FaMap /> Streak: {habitData.length} Days
        </p>
        <p>Keep going to unlock epic rewards!</p>
      </div>
    </div>
  );
};

export default Quests;