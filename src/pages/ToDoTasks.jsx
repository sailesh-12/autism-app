import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ToDoTasks.css'; // Custom CSS for notebook-specific styles

const ToDoTasks = ({ addPoints = () => {} }) => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('');
  const [numNotes, setNumNotes] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  useEffect(() => {
    const storedTasks = localStorage.getItem('allTasks');
    if (storedTasks) {
      setAllTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
  }, [allTasks]);

  const handleDayChange = (e) => setSelectedDay(e.target.value);

  const handleNumNotesChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNumNotes(value);
    setTasks(Array(value).fill(''));
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = value;
    setTasks(updatedTasks);
  };

  const handleSubmit = () => {
    if (!selectedDay || numNotes <= 0 || tasks.some((task) => !task.trim())) {
      alert('Please select a day, specify the number of notes, and fill in all tasks.');
      return;
    }
    const newTasks = tasks.map((text) => ({ text, completed: false }));
    setAllTasks([...allTasks, { day: selectedDay, tasks: newTasks }]);
    setSelectedDay('');
    setNumNotes(0);
    setTasks([]);
  };

  const handleCompleteTask = (setIndex, taskIndex) => {
    const updatedAllTasks = [...allTasks];
    updatedAllTasks[setIndex].tasks[taskIndex].completed = true;
    setAllTasks(updatedAllTasks);

    const notebook = updatedAllTasks[setIndex];
    const totalTasks = notebook.tasks.length;
    const completedTasks = notebook.tasks.filter((task) => task.completed).length;

    if (completedTasks === totalTasks) {
      addPoints(30);
    } else {
      const partialPoints = Math.floor((completedTasks / totalTasks) * 30);
      addPoints(partialPoints - Math.floor(((completedTasks - 1) / totalTasks) * 30));
    }
  };

  const handleResetNotebook = (setIndex) => {
    const updatedAllTasks = [...allTasks];
    updatedAllTasks[setIndex].tasks = updatedAllTasks[setIndex].tasks.map((task) => ({
      ...task,
      completed: false,
    }));
    setAllTasks(updatedAllTasks);
    addPoints(-30); // Optional: Remove if you don’t want point deduction
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
      {/* Starry background */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-70"
          style={{ top: `${10 + i * 10}%`, left: `${15 + i * 65}%` }}
        />
      ))}

      <div className="max-w-5xl mx-auto p-6">
        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 mb-6"
        >
          Back to Dashboard
        </button>

        {/* Task Form */}
        <div className="bg-indigo-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg mb-6">
          <h3 className="text-2xl font-semibold mb-4">Add To-Do Tasks</h3>
          <div className="flex gap-4 mb-4">
            <select
              value={selectedDay}
              onChange={handleDayChange}
              className="px-4 py-2 bg-indigo-900 border border-indigo-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27white%27 viewBox=%270 0 24 24%27 width=%2716%27 height=%2716%27%3E%3Cpath d=%27M7 10l5 5 5-5H7z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_10px_center] w-48"
            >
              <option value="">Select Day</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day} className="text-gray-300 bg-indigo-900">
                  {day}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={numNotes}
              onChange={handleNumNotesChange}
              placeholder="Number of tasks"
              min="0"
              className="px-4 py-2 bg-indigo-900 border border-indigo-700 rounded-lg text-white w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {numNotes > 0 && (
            <div>
              {Array.from({ length: numNotes }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  value={tasks[index] || ''}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  placeholder={`Task ${index + 1}`}
                  className="w-full px-4 py-2 bg-indigo-900 border border-indigo-700 rounded-lg text-white mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          )}
        </div>

        {/* Notebooks */}
        <div className="flex flex-wrap gap-6 justify-center">
          {allTasks.map((taskSet, setIndex) => {
            const allCompleted = taskSet.tasks.every((task) => task.completed);
            return (
              <div
                key={setIndex}
                className={`relative w-72 h-[350px] mx-auto my-4 transition-opacity duration-300 ${
                  allCompleted ? 'opacity-50' : 'opacity-100'
                }`}
              >
                <div className="notebook relative w-full h-full bg-[#F5E8C7] border-2 border-black rounded-lg shadow-lg p-4 flex flex-col justify-between">
                  {/* Spiral */}
                  <div className="absolute top-2 left-[-10px] h-[calc(100%-16px)] flex flex-col justify-between">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-2 border border-black rounded-full bg-[#F5E8C7]"
                      />
                    ))}
                  </div>

                  {/* Task List */}
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-xl font-semibold mb-4 text-[#333333]">
                      {taskSet.day}'s Tasks
                    </h4>
                    <ul className="list-none p-0 m-0 font-caveat text-[22px] text-[#333333] max-h-[calc(100%-40px)] overflow-y-auto">
                      {taskSet.tasks.map((task, taskIndex) => (
                        <li
                          key={taskIndex}
                          className={`mb-3 flex justify-between items-center ${
                            task.completed ? 'opacity-80 text-[#888888]' : 'text-[#333333]'
                          }`}
                        >
                          <span>{`${taskIndex + 1}. ${task.text}`}</span>
                          {!task.completed && (
                            <button
                              onClick={() => handleCompleteTask(setIndex, taskIndex)}
                              className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full hover:from-green-600 hover:to-green-800 transition-all duration-200 flex items-center gap-1"
                            >
                              <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-xs">
                                ✓
                              </span>
                              DONE
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pencil */}
                  <div className="absolute bottom-2 right-2 w-12 h-1.5 bg-yellow-400 border border-black rounded-sm transform -rotate-45">
                    <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-2 border-t-transparent border-b-2 border-b-transparent border-r-2 border-r-gray-500" />
                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-pink-400 border border-black rounded-sm" />
                  </div>

                  {/* Reset Button */}
                  {allCompleted && (
                    <button
                      onClick={() => handleResetNotebook(setIndex)}
                      className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 mt-2 self-center"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDoTasks;
