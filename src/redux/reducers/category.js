import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categoryReducer",
  initialState: {
    categoryData: [],
  },
  reducers: {
    categoryReducer: (state, action) => {
      // console.log("payloadddd",action.payload)
      state.categoryData = action.payload;
    },
  },
});

export const { categoryReducer } = categorySlice.actions;
export default categorySlice;
