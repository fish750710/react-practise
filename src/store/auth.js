import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShow: false,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isShow = true;
    },
    logout(state) {
      state.isShow = false;
    }
  }
})

export default authSlice.reducer;

export const authActions = authSlice.actions;