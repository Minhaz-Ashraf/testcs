// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userType: 'new', 
  userAddedbyAdmin: false, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserType(state, action) {
      state.userType = action.payload;
    },
    setUserAddedbyAdmin(state, action) {
      state.userAddedbyAdmin = action.payload;
    },
    resetUserState(state) {
      state.userType = '';
      state.userAddedbyAdmin = false;
    },
  },
});

// Export the actions
export const { setUserType, setUserAddedbyAdmin, resetUserState } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
