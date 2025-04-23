import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: null
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addJob: (state, action) => {
      state.jobs = action.payload;
    },
  },
});

export const { addJob } = jobSlice.actions;
export default jobSlice.reducer;
