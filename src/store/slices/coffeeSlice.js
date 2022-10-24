import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numOfCoffee: 35,
};

const coffeeSlice = createSlice({
  name: 'coffee',
  initialState,
  reducers: {
    // 銷售
    coffeeOrdered: (state, action) => {
      state.numOfCoffee = state.numOfCoffee - action.payload.qty;
      // console.log('coffee', action, state.numOfCoffee)
    },
    // 補貨
    coffeeRestocked: (state, action) => {
      state.numOfCoffee = state.numOfCoffee + action.payload.qty;
    }
  },
});

export default coffeeSlice.reducer;

export const coffeeActions = coffeeSlice.actions;
