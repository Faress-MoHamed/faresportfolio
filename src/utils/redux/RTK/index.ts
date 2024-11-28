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
import { persistedReducer } from "../persist";
import { sagaMiddleware } from "../saga";
import { getAllPosts } from "../saga/actions/sagas";

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(sagaMiddleware), // Add saga middleware here
});
sagaMiddleware.run(getAllPosts);
export const persistor = persistStore(store);
