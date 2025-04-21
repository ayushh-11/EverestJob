import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user : null,
  auth : null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.auth = "user";
    },
    logoutUser: state => {
        state.user = null;
        state.auth = null;
    }
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
