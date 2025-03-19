import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Brush Teeth', completed: false },
    { id: '2', title: 'Get Dressed', completed: false },
    { id: '3', title: 'Eat Breakfast', completed: false },
  ]);
  const [points, setPoints] = useState(20);

  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks([...tasks, taskWithId]);
  };

  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, points, addPoints }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};