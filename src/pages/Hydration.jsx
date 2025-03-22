import { useState, useEffect } from 'react';
import { Droplet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HydrationTracker() {
  const [hydrationLevel, setHydrationLevel] = useState(0);
  const [alarmInterval, setAlarmInterval] = useState(null);
  const [alarmActive, setAlarmActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId;
    if (alarmActive && alarmInterval) {
      const intervalMs = alarmInterval * 60 * 60 * 1000;
      intervalId = setInterval(() => {
        alert("Time to drink water! Stay hydrated!");
      }, intervalMs);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [alarmActive, alarmInterval]);

  const addWater = () => setHydrationLevel((prev) => Math.min(8, prev + 1));
  const removeWater = () => setHydrationLevel((prev) => Math.max(0, prev - 1));
  const setAlarm = (hours) => {
    setAlarmInterval(hours);
    setAlarmActive(true);
  };
  const stopAlarm = () => {
    setAlarmActive(false);
    setAlarmInterval(null);
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => navigate('/dashboard')} className="text-blue-900 p-1 rounded-full hover:bg-blue-100">
              <span className="text-lg font-bold">← Back</span>
            </button>
            <h1 className="text-2xl font-bold text-blue-900 ml-3">Hydration Tracker</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto p-6 flex-1 flex flex-col items-center justify-center">
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-8 text-white w-full max-w-md">
          <div className="flex items-center mb-6">
            <Droplet size={32} className="text-cyan-200 mr-3" />
            <h2 className="text-2xl font-semibold">Stay Hydrated!</h2>
          </div>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-white mb-2">{hydrationLevel} / 8</div>
            <p className="text-cyan-100">Glasses of water today</p>
          </div>
          <div className="flex justify-center mb-6">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`w-8 h-12 mx-1 rounded-t-lg ${i < hydrationLevel ? 'bg-blue-400' : 'bg-cyan-400'}`}
              ></div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mb-6">
            <button 
              className="px-4 py-2 rounded-lg bg-cyan-400 text-white hover:bg-cyan-300 disabled:opacity-50 font-bold"
              onClick={removeWater}
              disabled={hydrationLevel <= 0}
            >
              -
            </button>
            <button 
              className="px-4 py-2 rounded-lg bg-yellow-500 text-cyan-900 hover:bg-yellow-400 disabled:opacity-50 font-bold"
              onClick={addWater}
              disabled={hydrationLevel >= 8}
            >
              + Drink Water
            </button>
          </div>
          <div className="text-center">
            <p className="text-cyan-100 mb-3">Set a reminder to drink water every:</p>
            <div className="flex justify-center gap-3 mb-4">
              <button 
                className={`px-4 py-2 rounded-lg font-bold ${alarmInterval === 1 && alarmActive ? 'bg-yellow-500 text-cyan-900' : 'bg-cyan-400 text-white'} hover:bg-cyan-300`}
                onClick={() => setAlarm(1)}
                disabled={alarmActive && alarmInterval !== 1}
              >
                1 Hour
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-bold ${alarmInterval === 2 && alarmActive ? 'bg-yellow-500 text-cyan-900' : 'bg-cyan-400 text-white'} hover:bg-cyan-300`}
                onClick={() => setAlarm(2)}
                disabled={alarmActive && alarmInterval !== 2}
              >
                2 Hours
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-bold ${alarmInterval === 3 && alarmActive ? 'bg-yellow-500 text-cyan-900' : 'bg-cyan-400 text-white'} hover:bg-cyan-300`}
                onClick={() => setAlarm(3)}
                disabled={alarmActive && alarmInterval !== 3}
              >
                3 Hours
              </button>
            </div>
            {alarmActive && (
              <div>
                <p className="text-cyan-100 mb-2">Next reminder in: {alarmInterval} hour(s)</p>
                <button 
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-400 font-bold"
                  onClick={stopAlarm}
                >
                  Stop Alarm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}