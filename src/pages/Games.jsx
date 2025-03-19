import React, { useState } from 'react';
import './Games.css';
import MiniGameModal from '../components/MiniGamemodal.jsx';

const Games = () => {
  const [showGame, setShowGame] = useState(null);

  return (
    <div className="games-page">
      <h1 className="page-title">Game Island</h1>
      <div className="game-grid">
        <button
          className="game-button"
          onClick={() => setShowGame('balloons')}
        >
          Balloon Blast
        </button>
        <button
          className="game-button"
          onClick={() => setShowGame('doodle')}
        >
          Doodle Quest
        </button>
      </div>
      {showGame && <MiniGameModal gameType={showGame} onClose={() => setShowGame(null)} />}
    </div>
  );
};

export default Games;