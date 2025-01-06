import { combineReducers } from "@reduxjs/toolkit";

import generalReducer from "./general.store";

const rootReducer = combineReducers({
  general: generalReducer,
});

export default rootReducer;
