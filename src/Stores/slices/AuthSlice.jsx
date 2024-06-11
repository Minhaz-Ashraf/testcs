import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import apiurl from '../../util';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    userData: null,
    userId: null
  },
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.userData ? action.payload.userData._id : action.payload.userId,
        userData: action.payload.userData,
      };
    },
    setAuthTokenCookie: (state, action) => {
      // document.cookie = `authToken=${action.payload}; path=/`;
      localStorage.setItem('authToken', action.payload)
      
    },
    logout: (state) => {
      localStorage.removeItem('authToken');
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        userId: null
      };
    },
  },
});

export const { setUser, setAuthTokenCookie, logout } = authSlice.actions;
export const userDataStore = (state) => state.auth;

export const decodeCookieAndFetchUserData = () => async (dispatch) => {
  try {
    // Retrieve JWT token from cookie
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      // Decode JWT token to get userId
      // console.log(authToken);
      const decodedUserData = jwtDecode(authToken);
      const userId = decodedUserData.id;
    
      // Fetch user data from the server
      try {
        const response = await apiurl.get(`/auth/getUser/${userId}`);
        const userData = response?.data?.user;
    
        // Dispatch setUser action to store user data in Redux store
        dispatch(setUser({ userId, userData }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      // Handle case where token is empty or undefined
      console.error('Auth token is empty or undefined');
    }
  } catch (error) {
    console.error('Error decoding cookie and fetching user data:', error);
  }
  
};

export default authSlice.reducer;
