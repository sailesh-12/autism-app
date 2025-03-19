import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './MiniGameModal.css';
import { FaTimes, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Stage, Layer, Circle } from 'react-konva'; // For Doodle Quest
import { useTasks } from '../context/TaskContext'; // Optional for points

Modal.setAppElement('#root');

// Balloon Component for Balloon Blast
const Balloon = ({ x, y, onPop }) => (
  <motion.div
    className="balloon"
    style={{ left: x, top: y }}
    initial={{ y: '100vh' }}
    animate={{ y: -100 }}
    transition={{ duration: 5, ease: 'linear' }}
    onClick={onPop}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    🎈
  </motion.div>
);

const MiniGameModal = ({ gameType, onClose }) => {
  const { setTasks } = useTasks(); // Optional: to update points globally
  const [gamePoints, setGamePoints] = useState(0);
  const [balloons, setBalloons] = useState([]);
  const [lines, setLines] = useState([]); // For Doodle Quest

  // Balloon Blast Logic
  useEffect(() => {
    if (gameType === 'balloons') {
      const addBalloon = () => {
        const x = Math.random() * 300; // Random x within modal width
        setBalloons(prev => [...prev, { id: Date.now(), x }]);
      };
      const interval = setInterval(addBalloon, 2000); // New balloon every 2s
      return () => clearInterval(interval);
    }
  }, [gameType]);

  const handleBalloonPop = (id) => {
    setBalloons(balloons.filter(b => b.id !== id));
    setGamePoints(prev => prev + 5); // 5 stars per pop
  };

  // Doodle Quest Logic
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    const newLine = { points: [...lastLine.points, pos.x, pos.y] };
    setLines([...lines.slice(0, -1), newLine]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (lines.length > 0 && gamePoints === 0) {
      setGamePoints(20); // Award 20 stars for completing a drawing
    }
  };

  const handleClose = () => {
    if (gamePoints > 0) {
      // Optionally update global points (uncomment if using TaskContext)
      // setTasks(prev => ({ ...prev, points: (prev.points || 0) + gamePoints }));
    }
    onClose();
  };

  return (
    <Modal isOpen={true} onRequestClose={handleClose} className="game-modal" overlayClassName="game-overlay">
      <motion.div
        className="game-content"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <h3 className="game-title">
          {gameType === 'balloons' ? 'Balloon Blast!' : 'Doodle Quest!'}
        </h3>
        <div className="game-zone">
          {gameType === 'balloons' ? (
            <>
              <div className="balloon-area">
                {balloons.map(balloon => (
                  <Balloon
                    key={balloon.id}
                    x={balloon.x}
                    y={0}
                    onPop={() => handleBalloonPop(balloon.id)}
                  />
                ))}
              </div>
              <p className="game-score">
                <FaStar /> {gamePoints} Stars
              </p>
            </>
          ) : (
            <>
              <Stage
                width={350}
                height={300}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="doodle-canvas"
              >
                <Layer>
                  {lines.map((line, i) => (
                    <Circle
                      key={i}
                      x={line.points[line.points.length - 2]}
                      y={line.points[line.points.length - 1]}
                      radius={5}
                      fill="#ff5722"
                    />
                  ))}
                </Layer>
              </Stage>
              <p className="game-score">
                <FaStar /> {gamePoints} Stars (Draw to earn 20!)
              </p>
            </>
          )}
        </div>
        <motion.button
          onClick={handleClose}
          className="exit-button"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <FaTimes /> Exit
        </motion.button>
      </motion.div>
    </Modal>
  );
};

export default MiniGameModal;