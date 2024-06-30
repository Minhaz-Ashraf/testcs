// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: 'new', 
  userAddedbyAdminId: "", 
  userEditedbyAdminId:"",
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
    setUserEditedbyAdminId(state, action) {
      state.userEditedbyAdminId = action.payload;
    },
   
  },
});

// Export the actions
export const { setAdmin, setUserAddedbyAdminId, setUserEditedbyAdminId } = adminSlice.actions;

// Export the reducer
export default adminSlice.reducer;
