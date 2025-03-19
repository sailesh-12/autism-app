import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { FaHome, FaGamepad, FaGem, FaTasks, FaMap, FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <motion.div
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      initial={{ x: isOpen ? 0 : -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="sidebar-header">
        <button className="toggle-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
        {isOpen && <h2>Adventure Hub</h2>}
      </div>
      {isOpen && (
        <nav className="sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <FaHome className="nav-icon" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/games"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <FaGamepad className="nav-icon" />
            <span>Games</span>
          </NavLink>
          <NavLink
            to="/rewards"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <FaGem className="nav-icon" />
            <span>Rewards</span>
          </NavLink>
          <NavLink
            to="/missions"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <FaTasks className="nav-icon" />
            <span>Missions</span>
          </NavLink>
          <NavLink
            to="/quests"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <FaMap className="nav-icon" />
            <span>Quests</span>
          </NavLink>
        </nav>
      )}
    </motion.div>
  );
};

export default Sidebar;