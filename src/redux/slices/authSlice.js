import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  savedPin: '123456', // need to encrypt or use keychain for security of user
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSavedPin: (state, action) => {
      return {...state, savedPin: action.payload};
    },
    clearSavedPin: state => {
      return {...state, savedPin: ''};
    },
    setIsLogin: (state, action) => {
      return {...state, isLogin: action.payload};
    },
  },
});

export const {setSavedPin, clearSavedPin, setIsLogin} = authSlice.actions;
export const selectAuthReducer = state => state.auth;

export default authSlice.reducer;
