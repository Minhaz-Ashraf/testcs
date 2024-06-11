
import { createSlice } from '@reduxjs/toolkit';


export const formDataSlice = createSlice({
  name: 'formData',
  initialState: {
    createdFor: null,
    gender: '',
  },
  reducers: {
    setCreatedFor: (state, action) => {
      state.createdFor = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
  },
});

export const { setCreatedFor, setGender } = formDataSlice.actions;

export const selectCreatedFor = (state) => state.formData.createdFor;
export const selectGender = (state) => state.formData.gender;

export default formDataSlice.reducer;


