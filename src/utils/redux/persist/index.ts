import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../RTK/slices";

const PersistConfig = {
	key: "root",
	storage,
};

export const persistedReducer = persistReducer(PersistConfig, rootReducer);

