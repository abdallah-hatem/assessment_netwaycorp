import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../redux/features/tasks/tasksSlice';

const EditTaskForm = ({ task, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(editTask({
        id: task.id,
        title: title.trim(),
        priority
      }));
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Edit task"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditTaskForm; 