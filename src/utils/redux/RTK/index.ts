import { configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { sagaMiddleware } from "../saga";
import { getAllPosts } from "../saga/actions/sagas";
import rootReducer from "./slices";

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(sagaMiddleware), // Add saga middleware here
});
sagaMiddleware.run(getAllPosts);
export const persistor = persistStore(store);
