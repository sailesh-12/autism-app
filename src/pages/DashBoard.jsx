import React, { useState } from 'react';
import './Dashboard.css';
import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaGem, FaMap } from 'react-icons/fa';
import { useTasks } from '../Context/TaskContext';

// Simple base64 placeholder image (a small blue circle)
const fallbackAvatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAABlBMVEAAAAD///+l2Z/dAAAAAnRSTlMAAHaTzTgAAAA9SURBVHja7cEBDQAAAMKg9090DQYgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGQAAGjP9lFAAAAAElFTkSuQmCC';

const AvatarDisplay = ({ avatarImage, level }) => (
  <motion.div
    className="avatar-container"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
  >
    <img 
      src={avatarImage} 
      alt="Hero" 
      className="avatar" 
      onError={(e) => (e.target.src = fallbackAvatar)} // Fallback if image fails
    />
    <motion.div
      className="level-orb"
      whileHover={{ scale: 1.1, rotate: 10 }}
    >
      <FaStar className="star-icon" />
      <span>Level {level}</span>
    </motion.div>
  </motion.div>
);

const TaskList = ({ tasks, onComplete }) => (
  <div className="mission-board">
    {tasks.map(task => (
      <motion.div
        key={task.id}
        className="mission-card"
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <span className="mission-text">{task.title}</span>
        {!task.completed ? (
          <motion.button
            onClick={() => onComplete(task.id)}
            className="complete-button"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, backgroundColor: '#ffca28' }}
          >
            <FaCheckCircle /> Finish!
          </motion.button>
        ) : (
          <motion.span
            className="completed-stamp"
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Done!
          </motion.span>
        )}
      </motion.div>
    ))}
  </div>
);

const ProgressBar = ({ currentPoints, maxPoints }) => {
  const progress = (currentPoints / maxPoints) * 100;
  return (
    <div className="treasure-meter">
      <p className="meter-text">
        <FaStar /> {currentPoints}/{maxPoints} Treasure Stars
      </p>
      <div className="meter-bar">
        <motion.div
          className="meter-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};

const RewardTeaser = ({ nextReward }) => (
  <motion.div
    className="loot-preview"
    whileHover={{ scale: 1.05, rotate: 2 }}
    transition={{ type: 'spring', stiffness: 250 }}
  >
    <FaGem className="chest-icon" />
    <p className="loot-text">Next Loot: {nextReward.name}</p>
    <p className="loot-points">{nextReward.pointsNeeded} stars away!</p>
  </motion.div>
);

const MotivationMessage = () => {
  const cheers = ["You’re a quest master!", "Adventure awaits you!", "You’re unstoppable!"];
  const randomCheer = cheers[Math.floor(Math.random() * cheers.length)];
  return (
    <motion.div
      className="quest-cheer"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <span>{randomCheer}</span>
    </motion.div>
  );
};

const HabitTracker = ({ habitData }) => (
  <motion.div
    className="streak-panel"
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 200 }}
  >
    <FaMap className="map-icon" />
    <p className="streak-text">Quest Streak: {habitData.length} Days</p>
  </motion.div>
);

const Dashboard = () => {
  const [level, setLevel] = useState(1);
  const { tasks, setTasks, points, addPoints } = useTasks();
  const [habitData] = useState([new Date(), new Date(Date.now() - 86400000)]);

  const handleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: true } : task
    ));
    addPoints(10);
    if (points + 10 >= 50) setLevel(level + 1);
  };

  const nextReward = { name: 'Magic Puzzle', pointsNeeded: 50 - points };

  return (
    <div className="dashboard">
      <div className="dashboard-hud">
        <AvatarDisplay avatarImage="https://picsum.photos/120" level={level} /> {/* Alternative placeholder */}
        <MotivationMessage />
        <ProgressBar currentPoints={points} maxPoints={50} />
        <RewardTeaser nextReward={nextReward} />
        <TaskList tasks={tasks} onComplete={handleComplete} />
        <HabitTracker habitData={habitData} />
      </div>
    </div>
  );
};

export default Dashboard;