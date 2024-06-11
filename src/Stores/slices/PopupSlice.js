import { createSlice } from '@reduxjs/toolkit';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    isOpen: false,
    content: null,
    redDot : false,
  },

    reducers: {
      openPopup: (state, action) => {
        const { cardId } = action.payload;
        state[cardId] = true; 
      },
      closePopup: (state, action) => {
        const { cardId } = action.payload;
        state[cardId] = false; 
      }
    },
  })

export const { openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;