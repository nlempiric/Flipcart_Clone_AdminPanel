import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productReducer",
  initialState: {
    productData: [],
  },
  reducers: {
    productReducer: (state, action) => {
      console.log("payloadddd",action.payload)
      state.productData = action.payload;
    },
  },
});

export const { productReducer } = productSlice.actions;
export default productSlice;
