import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    packages: [
      {
        amount: 0,
        products: [],
      },
    ],
    amount: 0,
    currency: "TWD",
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.packages.push(action.payload);
      state.amount += action.payload.price * action.payload.quantity;
    },
    resetCart: (state) => {
      state.packages = [];
      state.quantity = 0;
      state.amount = 0;
    },
  },
});

export const { addProduct, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
