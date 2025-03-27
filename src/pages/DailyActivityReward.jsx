import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './DailyActivityRewards.css'; // Custom CSS for animations and notebook styles

const DailyActivityReward = ({ points = 0, setPoints = () => {} }) => {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [purchasedAnimals, setPurchasedAnimals] = useState([]);
  const [equippedAnimal, setEquippedAnimal] = useState(null);
  const [previewAnimal, setPreviewAnimal] = useState(null); // New state for preview

  useEffect(() => {
    const calculateLevel = () => {
      let newLevel = 1;
      let pointsRequired = 50;
      while (points >= pointsRequired) {
        newLevel++;
        pointsRequired = newLevel * 50;
      }
      return newLevel - 1;
    };

    const newLevel = calculateLevel();
    if (newLevel > level) {
      setLevel(newLevel);
      setShowLevelUp(true);
    }
  }, [points, level]);

  const rewardsStore = [
    { name: 'Teddy Bear', points: 20 },
    { name: 'Cat', points: 50 },
    { name: 'Dolphin', points: 100 },
    { name: 'Rabbit', points: 200 },
    { name: 'Elephant', points: 300 },
    { name: 'Panda', points: 400 },
    { name: 'Turtle', points: 500 },
    { name: 'Owl', points: 600 },
    { name: 'Fox', points: 700 },
    { name: 'Deer', points: 800 },
    { name: 'Butterfly', points: 900 },
    { name: 'Hedgehog', points: 1000 },
  ];

  const handleBuyAnimal = (animal) => {
    if (points >= animal.points && !purchasedAnimals.includes(animal.name)) {
      setPoints(points - animal.points);
      setPurchasedAnimals([...purchasedAnimals, animal.name]);
    }
  };

  const handleEquipAnimal = (animalName) => {
    setEquippedAnimal(animalName);
  };

  const handlePreviewAnimal = (animalName) => {
    setPreviewAnimal(animalName); // Show preview on click
  };

  const animalSVGs = {
    'Teddy Bear': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><circle cx="20" cy="20" r="10" /><circle cx="12" cy="12" r="4" /><circle cx="28" cy="12" r="4" /><circle cx="20" cy="30" r="8" /></svg>,
    'Cat': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><circle cx="20" cy="15" r="8" /><path d="M12 10 L16 5 M28 10 L24 5" /><path d="M20 23 Q15 30 20 35 Q25 30 20 23" /></svg>,
    'Dolphin': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><path d="M10 20 Q20 15 30 20 Q35 25 30 30 Q20 35 10 30 Q5 25 10 20" /><path d="M30 20 L35 15" /><path d="M5 20 Q8 18 10 20" /></svg>,
    'Rabbit': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><circle cx="20" cy="20" r="8" /><path d="M12 10 L10 5 M28 10 L30 5" /><circle cx="20" cy="30" r="6" /></svg>,
    'Elephant': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><circle cx="20" cy="20" r="10" /><path d="M20 10 Q25 5 30 10" /><path d="M10 15 L5 10 M30 15 L35 10" /></svg>,
    'Panda': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><circle cx="20" cy="20" r="10" /><circle cx="14" cy="16" r="3" /><circle cx="26" cy="16" r="3" /><circle cx="20" cy="30" r="8" /></svg>,
    'Turtle': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><circle cx="20" cy="20" r="12" /><circle cx="10" cy="10" r="4" /><path d="M30 10 L35 5 M30 30 L35 35 M10 30 L5 35" /></svg>,
    'Owl': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><circle cx="20" cy="15" r="8" /><circle cx="16" cy="13" r="2" /><circle cx="24" cy="13" r="2" /><path d="M20 23 Q15 30 20 35 Q25 30 20 23" /></svg>,
    'Fox': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><circle cx="20" cy="15" r="6" /><path d="M14 10 L10 5 M26 10 L30 5" /><path d="M20 21 Q15 30 20 35 Q25 30 20 21" /><path d="M25 30 L30 35" /></svg>,
    'Deer': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><circle cx="20" cy="20" r="8" /><circle cx="15" cy="10" r="4" /><path d="M13 5 L10 0 M17 5 L20 0" /><path d="M25 25 L30 30 M25 15 L30 10" /></svg>,
    'Butterfly': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><path d="M20 20 Q15 10 10 20 Q15 30 20 20" /><path d="M20 20 Q25 10 30 20 Q25 30 20 20" /><path d="M20 20 L20 30" /><path d="M20 10 L15 5 M20 10 L25 5" /></svg>,
    'Hedgehog': <svg className="w-20 h-20 stroke-[#333333] fill-none stroke-2" viewBox="0 0 40 40"><circle cx="20" cy="20" r="10" /><path d="M10 10 L5 5 M30 10 L35 5 M10 30 L5 35 M30 30 L35 35" /><circle cx="15" cy="15" r="3" /></svg>,
  };

  const animalOutlines = useMemo(() => {
    if (!equippedAnimal) return [];
    return Array.from({ length: 10 }, (_, i) => (
      <div
        key={i}
        className="absolute w-10 h-10 z-10 animate-float"
        style={{ top: `${10 + i * 10}%`, left: `${10 + i * 10}%`, animationDelay: `${i * 0.5}s` }}
      >
        {React.cloneElement(animalSVGs[equippedAnimal], { className: 'w-10 h-10 stroke-white fill-none stroke-2 opacity-50' })}
      </div>
    ));
  }, [equippedAnimal]);

  const progressWidth = `${(points % 50) / 50 * 100}%`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white relative overflow-hidden font-sans">
      {/* Starry background */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-70"
          style={{ top: `${10 + i * 10}%`, left: `${15 + i * 65}%` }}
        />
      ))}
      {animalOutlines}

      {/* Level-up Modal */}
      {showLevelUp && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50" onClick={() => setShowLevelUp(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-blue-500 to-blue-700 p-8 rounded-2xl shadow-2xl z-50 animate-pop-in">
            <h2 className="text-2xl font-bold text-white mb-4">Congratulations!</h2>
            <p className="text-lg text-white mb-6">You’ve reached Level {level}!</p>
            <button
              onClick={() => setShowLevelUp(false)}
              className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300"
            >
              Continue
            </button>
          </div>
        </>
      )}

      {/* Preview Modal */}
      {previewAnimal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50" onClick={() => setPreviewAnimal(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="relative w-72 h-[350px] mx-auto transition-opacity duration-300 animate-pop-in">
              <div className="notebook relative w-full h-full bg-[#F5E8C7] border-2 border-black rounded-lg shadow-lg p-4 flex flex-col justify-between">
                {/* Spiral */}
                <div className="absolute top-2 -left-[10px] h-[calc(100%-16px)] flex flex-col justify-between">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="w-5 h-2 border border-black rounded-full bg-[#F5E8C7]" />
                  ))}
                </div>

                {/* Animal Preview */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <h4 className="text-xl font-semibold mb-4 text-[#333333] font-caveat">
                    Preview: {previewAnimal}
                  </h4>
                  <div className="w-40 h-40">{animalSVGs[previewAnimal]}</div>
                </div>

                {/* Pencil */}
                <div className="absolute bottom-2 right-2 w-12 h-[6px] bg-yellow-400 border border-black rounded-sm -rotate-45">
                  <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-r-[6px] border-r-gray-500" />
                  <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-pink-400 border border-black rounded-[1px]" />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setPreviewAnimal(null)}
                  className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 mt-2 self-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 mb-6"
        >
          Back to Dashboard
        </button>

        <div className="bg-indigo-800 bg-opacity-80 backdrop-blur-md p-4 rounded-xl shadow-lg mb-6">
          <h3 className="text-xl font-semibold text-center">Points: {points}</h3>
        </div>

        <div className="bg-indigo-800 bg-opacity-80 backdrop-blur-md p-4 rounded-xl shadow-lg mb-6">
          <h3 className="text-xl font-semibold text-center mb-2">Level {level}</h3>
          <div className="w-full bg-indigo-900 rounded-full h-5 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: progressWidth }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-2 text-center">{points % 50}/{50} to next level</p>
        </div>

        {/* Rewards Store */}
        <div className="bg-indigo-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Rewards Store</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {rewardsStore.map((reward) => (
              <div
                key={reward.name}
                className="bg-indigo-900 p-4 rounded-lg flex flex-col items-center justify-between hover:scale-105 hover:shadow-xl transition-all duration-300 min-h-[200px] cursor-pointer"
                onClick={() => handlePreviewAnimal(reward.name)} // Preview on click
              >
                <div className="w-20 h-20 mb-2">{animalSVGs[reward.name]}</div>
                <span className="text-center mb-2 text-sm">{reward.name} ({reward.points} pts)</span>
                {purchasedAnimals.includes(reward.name) ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering preview again
                      handleEquipAnimal(reward.name);
                    }}
                    className={`w-full py-2 rounded-lg text-white font-medium ${
                      equippedAnimal === reward.name ? 'bg-green-600' : 'bg-green-500'
                    } hover:bg-green-700 transition-colors duration-200`}
                  >
                    {equippedAnimal === reward.name ? 'Equipped' : 'Equip'}
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering preview again
                      handleBuyAnimal(reward);
                    }}
                    className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    disabled={points < reward.points}
                  >
                    Buy
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyActivityReward;