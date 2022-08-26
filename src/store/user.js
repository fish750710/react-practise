import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getData = createAsyncThunk('user/getData', async (params, thunkAPI) => {
  const url = 'https://api.justplus1.com.tw/api/mapcommon/list';
  const { data } = await axios.get(url);
  console.log('resData2', params, thunkAPI) 
  return data;
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: 0,
    isLoadding: false,
    name: 'hans',
    email: '',
    password: '',
    isLogin: false,
    storeList: [],
    accountUser : {
      acc: '',
      paw: '',
      name: '',
      mobile: ''
    }
  },
  reducers: {
    increment: (state, action) => {
      state.value += action.payload;
    },
    decrement: (state, action) => {
      state.value -= action.payload;
    },
    toggleLodding: (state, action) => {
      state.isLoadding = action.payload;
    },
    login: (state, action) => {
      // console.log('login', state, action)
      state.isLogin = true;
    },
    setStoreList(state, { payload }) {
      state.storeList = payload.ResultData;
    },
    setAccountUser(state, { payload }) {
      state.isLogin = true;
      state.accountUser = {
        acc: payload.mail,
        paw: payload.password
      }
      // console.log('setAccountUser', payload, state.accountUser)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state, action) => {
      state.isLoadding = true;
      // console.log('pending')
    })
    builder.addCase(getData.rejected, (state, action) => {
      console.log('rejected')
      state.isLoadding = false;
    })
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoadding = false;
      // state.storeList = action.payload.ResultData;
      userSlice.caseReducers.setStoreList(state, action);
      // console.log('fulfilled', action)

    })
  },
})

// reducers
export default userSlice.reducer;

// actions
export const { increment, decrement, toggleLodding, login, setAccountUser } = userSlice.actions;

// export const doIncrement = (num = 1) => async dispatch => {
//   return dispatch(increment(num))
// }
