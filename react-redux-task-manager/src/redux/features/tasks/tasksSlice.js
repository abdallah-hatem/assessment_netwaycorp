import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromStorage = () => {
  try {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

const initialState = {
  tasks: loadTasksFromStorage(),
  filter: 'ALL'
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const { id, title, priority } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.title = title;
        task.priority = priority;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { addTask, toggleTask, deleteTask, editTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer; 