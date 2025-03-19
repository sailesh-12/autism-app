import React from 'react';
import './RewardStore.css';
import { FaGift } from 'react-icons/fa';
import { motion } from 'framer-motion';

const RewardStore = ({ points, rewards, onRedeem }) => (
  <div className="reward-store">
    <h2 className="store-title">
      <FaGift /> Prize Shop ({points} Stars)
    </h2>
    {rewards.map(reward => (
      <motion.div
        key={reward.id}
        className="reward-item"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <span className="reward-name">{reward.name} - {reward.cost} Stars</span>
        <button
          onClick={() => onRedeem(reward.id)}
          disabled={points < reward.cost}
          className={points < reward.cost ? 'disabled-button' : 'redeem-button'}
        >
          Grab It!
        </button>
      </motion.div>
    ))}
  </div>
);

export default RewardStore;