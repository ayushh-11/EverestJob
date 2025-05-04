/** 
import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";
import userReducer from "./userSlice";
import companyReducer from "./companySlice"

export const store = configureStore({
  reducer: {
    job : jobReducer,
    user : userReducer,
    company : companyReducer
  },
});

export default store;
**/

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";
import userReducer from "./userSlice";
import companyReducer from "./companySlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  job: jobReducer,
  user: userReducer,
  company: companyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required by redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;

