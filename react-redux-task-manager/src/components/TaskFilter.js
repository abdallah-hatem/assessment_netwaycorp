import React from "react";
import { useSelector } from "react-redux";
import { setFilter } from "../redux/features/tasks/tasksSlice";
import { dispatch } from "../redux/store";

const TaskFilter = () => {
  const currentFilter = useSelector((state) => state.tasks.filter);

  const options = ["All", "High", "Medium", "Low"];

  return (
    <div className="task-filter">
      <select value={currentFilter} onChange={(e) => dispatch(setFilter(e.target.value))}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilter;
