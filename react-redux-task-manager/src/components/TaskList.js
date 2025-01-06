import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toggleTask, deleteTask } from "../redux/features/tasks/tasksSlice";
import EditTaskForm from "./EditTaskForm";
import { dispatch } from "../redux/store";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const [editingId, setEditingId] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "ALL") return true;
    return task.priority === filter.toLowerCase();
  });

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
          {editingId === task.id ? (
            <EditTaskForm task={task} onCancel={() => setEditingId(null)} />
          ) : (
            <>
              {/* Checkbox for task completion */}
              <input type="checkbox" checked={task.completed} onChange={() => dispatch(toggleTask(task.id))} />
              {/* Task title */}
              <span className={`priority-${task.priority}`}>{task.title}</span>
              {/* Task actions */}
              <div className="task-actions">
                <button onClick={() => setEditingId(task.id)}>Edit</button>
                <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
