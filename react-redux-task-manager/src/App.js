import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>
        <TaskForm />
        <TaskFilter />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
