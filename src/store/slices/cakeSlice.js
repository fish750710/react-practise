import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numOfCake: 20,
};

const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    // 銷售
    cakeOrdered: (state, action) => {
      state.numOfCake = state.numOfCake - action.payload.qty;
    },
    // 補貨
    cakeRestocked: (state, action) => {
      state.numOfCake = state.numOfCake + action.payload.qty;
    }
  },
});

export default cakeSlice.reducer;

// export const {cakeOrdered, cakeRestocked} = cakeSlice.actions;
export const cakeActions = cakeSlice.actions;
