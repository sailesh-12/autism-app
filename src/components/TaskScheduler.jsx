import React, { useState } from 'react';
import './TaskScheduler.css';
import { FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TaskScheduler = ({ onSave }) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (title) {
      onSave({ title, frequency: 'daily' });
      setTitle(''); // Clear input after saving
    }
  };

  return (
    <motion.div
      className="mission-creator"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Mission!"
        className="mission-input"
      />
      <motion.button
        onClick={handleSave}
        className="add-button"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1, backgroundColor: '#1976d2' }}
      >
        <FaPlus /> Add
      </motion.button>
    </motion.div>
  );
};

export default TaskScheduler;