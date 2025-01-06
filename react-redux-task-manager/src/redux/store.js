import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../redux/features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export const dispatch = store.dispatch;
