import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currRouteName: '',
  prevRouteName: '',
};

export const utilSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    setCurrRoutename: (state, action) => {
      return {
        ...state,
        prevRouteName: state.currRouteName,
        currRouteName: action.payload,
      };
    },
  },
});

export const {setCurrRoutename} = utilSlice.actions;
export const selectUtilReducer = state => state.util;

export default utilSlice.reducer;
