import { configureStore } from "@reduxjs/toolkit";
// import { userIdMiddleware } from './service/middleware';
import stepperReducer from "./slices/Regslice";
import authReducer from "./slices/AuthSlice";
import popupReducer from "./slices/PopupSlice";
import redDotReducer from "./slices/notificationslice";
import formDataReducer from "./slices/formSlice";
import selectAllReducer from "./slices/selectAllSlice,jsx";
import userReducer from "./slices/Admin"

export const store = configureStore({
  reducer: {
    stepper: stepperReducer,
    auth: authReducer,
    formData: formDataReducer,
    popup: popupReducer,
    redDot : redDotReducer,
    selectAll: selectAllReducer,
    user: userReducer
  },
  // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), userIdMiddleware],
});
