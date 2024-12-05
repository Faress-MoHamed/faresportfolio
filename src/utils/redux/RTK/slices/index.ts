import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./CounterReducer";
import ProjectReducer from "./ProjectReducer";

const rootReducer = combineReducers({
	counter: counterReducer,
	project: ProjectReducer,
});

export default rootReducer;
