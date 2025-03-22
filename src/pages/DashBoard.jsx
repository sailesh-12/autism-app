import React, { useState } from 'react';
import './Dashboard.css';
import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaGem, FaMap } from 'react-icons/fa';
import { useTasks } from '../Context/TaskContext.jsx';

const AvatarDisplay = ({ avatarImage, level }) => (
  <motion.div
    className="avatar-container"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <motion.img
      src={avatarImage}
      alt="Hero"
      className="avatar"
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    />
    <motion.div
      className="level-orb"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
    >
      <FaStar className="star-icon" />
      <span>Level {level}</span>
    </motion.div>
  </motion.div>
);

const TaskList = ({ tasks, onComplete }) => (
  <div className="mission-board">
    {tasks.map((task, index) => (
      <motion.div
        key={task.id}
        className="mission-card"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
        whileHover={{ y: -5 }}
      >
        <span className="mission-text">{task.title}</span>
        {!task.completed ? (
          <motion.button
            onClick={() => onComplete(task.id)}
            className="complete-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FaCheckCircle /> Finish!
          </motion.button>
        ) : (
          <motion.span
            className="completed-stamp"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
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
    <motion.div
      className="treasure-meter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
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
    </motion.div>
  );
};

const RewardTeaser = ({ nextReward }) => (
  <motion.div
    className="loot-preview"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
    whileHover={{ scale: 1.05 }}
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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
    >
      <span>{randomCheer}</span>
    </motion.div>
  );
};

const HabitTracker = ({ habitData }) => (
  <motion.div
    className="streak-panel"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
    whileHover={{ scale: 1.05 }}
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
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="dashboard-hud">
        <AvatarDisplay avatarImage="https://picsum.photos/120" level={level} />
        <MotivationMessage />
        <ProgressBar currentPoints={points} maxPoints={50} />
        <RewardTeaser nextReward={nextReward} />
        <TaskList tasks={tasks} onComplete={handleComplete} />
        <HabitTracker habitData={habitData} />
      </div>
    </motion.div>
  );
};

export default Dashboard;