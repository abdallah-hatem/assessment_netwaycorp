import React, { useState } from "react";
import { addTask } from "../redux/features/tasks/tasksSlice";
import { dispatch } from "../redux/store";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(
        addTask({
          id: Date.now(),
          title: title.trim(),
          priority,
          completed: false,
        })
      );
      setTitle("");
    }
  };

  const options = ["low", "medium", "high"];

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Input for task title */}
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a new task" />
      {/* Dropdown for priority */}
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
      {/* Add Task button */}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
