import React from 'react';
import RewardStore from '../components/RewardStore';
import './Global.css'
const Rewards = () => {
  const points = 20; // Mock data
  const rewards = [
    { id: '1', name: 'Shiny Hat', cost: 30 },
    { id: '2', name: 'Magic Puzzle', cost: 50 },
  ];

  return (
    <div className="rewards-page">
      <h1 className="page-title">Treasure Vault</h1>
      <RewardStore points={points} rewards={rewards} onRedeem={(id) => console.log(`Redeemed ${id}`)} />
    </div>
  );
};

export default Rewards;