import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./CounterReducer";

const rootReducer = combineReducers({
	counter: counterReducer,
});

export default rootReducer;
