import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  profile: {
    id: 'randomid1',
    firstNameEN: 'Jane',
    lastNameEN: 'Jones',
    firstNameTH: 'เจน',
    lastNameTH: 'โจนส์',
    sex: 'F',
    profilePicture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/20230905_Haerin_%28NewJeans%29.jpg/909px-20230905_Haerin_%28NewJeans%29.jpg?20230905163647',
  },
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
});

export const {} = userProfileSlice.actions;
export const selectUserProfileReducer = state => state.userProfile;

export default userProfileSlice.reducer;
