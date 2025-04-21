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
