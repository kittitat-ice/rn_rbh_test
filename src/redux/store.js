import {configureStore, combineReducers} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import taskSlice from './slices/taskSlice';
import userProfileSlice from './slices/userProfileSlice';
import authSlice from './slices/authSlice';
import utilSlice from './slices/utilSlice';

const combinedReducer = combineReducers({
  task: taskSlice,
  userProfile: userProfileSlice,
  auth: authSlice,
  util: utilSlice,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
