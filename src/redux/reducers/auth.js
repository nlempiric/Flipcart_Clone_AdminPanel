import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loginReducer",
  initialState: {
    isauth: false,
  },
  reducers: {
    loginReducer: (state, action) => {
      state.isauth = action.payload;
    },
  },
});

export const { loginReducer } = loginSlice.actions;
export default loginSlice;
