import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company : null,
  auth : null
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
      state.auth = "company";
    },
    logoutUser: state => {
        state.company = null;
        state.auth = null;
    }
  },
});

export const { setCompany, logoutUser } = companySlice.actions;
export default companySlice.reducer;
