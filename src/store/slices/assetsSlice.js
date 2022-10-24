import { createSlice } from '@reduxjs/toolkit';

import { cakeActions } from './cakeSlice';
import { coffeeActions } from './coffeeSlice';

const initialState = {
  money: 1000,
}
const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 入帳 
    // 依賴 cakeActions.cakeOrdered 更新資料
    builder.addCase(cakeActions.cakeOrdered, (state, action) => {
      // console.log('action', action)
      state.money = state.money + action.payload.money;
    })
    // 扣款
    builder.addCase(cakeActions.cakeRestocked, (state, action) => {
      state.money = state.money - action.payload.money;
    })
    builder.addCase(coffeeActions.coffeeOrdered, (state, action) => {
      state.money = state.money + action.payload.money;
    })
    builder.addCase(coffeeActions.coffeeRestocked, (state, action) => {
      state.money = state.money - action.payload.money;
    })
  }
})

export default assetsSlice.reducer;

export const assetsActions = assetsSlice.actions;