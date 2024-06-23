// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: 'new', 
  userAddedbyAdminId: "", 
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
    },
    setUserAddedbyAdminId(state, action) {
      state.userAddedbyAdminId = action.payload;
    },
    resetUserState(state) {
      state.userType = '';
      state.userAddedbyAdmin = false;
    },
  },
});

// Export the actions
export const { setAdmin, setUserAddedbyAdminId, resetUserState } = adminSlice.actions;

// Export the reducer
export default adminSlice.reducer;
