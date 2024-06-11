// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import { setUser } from "../slices/AuthSlice";
// import apiurl from "../../util";
// import { useNavigate } from "react-router-dom";

// // Middleware to check for userId change
// export const userIdMiddleware = (store) => (next) => (action) => {
//   const prevState = store.getState();
//   const returnValue = next(action);
//   const newState = store.getState();

//   //     // Retrieve JWT token from cookie
//   const authToken = Cookies.get("authToken");
  
//   // Check if authToken is available
//   if (!authToken) {
//       return returnValue;
//     }
//     //   console.log("it ran");
//     //   console.log(prevState);
//     //   console.log(returnValue);
//       console.log(newState);

//   const decodedUserData = jwtDecode(authToken);
//   const { id, number } = decodedUserData;
//   // console.log(decodedUserData);
//   // Check if userId changed
//   if (id && prevState.auth.userId !== id) {
//     store.dispatch(setUser({ userId: id, userData: decodedUserData })); // Dispatch action to update userId in Redux state
//     getUserData(id, store); // Call your function passing userId
//   } // Call your function passing userId

//   return returnValue;
// };

// // Function to be called when userId is set
// async function getUserData(userId, store) {
//   try {
//     const response = await apiurl.get(`/auth/getUser/${userId}`);
//     store.dispatch(setUser({ userData: { ...response?.data?.user } }));
//   } catch (err) {
//     console.log(err);
//   }
// }
