import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setAuthTokenCookie } from "../../Stores/slices/AuthSlice";
import apiurl from "../../util";
import { logo } from "../../assets";

const LoginPopup = ({ onClose, onSendOtp, onSignupClick }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const expiryTime = params.get("expiryTime");
  const [loginCode, setLoginCode] = useState(code);

  useEffect(() => {
    if (code) {
      const handleLogin = async () => {
        try {
          // Make the API call to sign in
          const response = await apiurl.post("/auth/signin", {
            code: loginCode,
            expiryTime,
          });
          const { existingUser, token, message } = response.data;
          console.log(existingUser, token, message);
          // Dispatch actions to set user data and JWT token in Redux state

          dispatch(setUser({ userData: { ...existingUser } }));
          dispatch(setAuthTokenCookie(token)); // Assuming the API response includes a token
          setMessage(message);
         
          if(existingUser.accessType === "0" || existingUser.accessType === "1"){
            navigate("/admin/dashboard");//whichever admin route
          }
          else if (
            existingUser.registrationPage === "6" &&
            existingUser.registrationPhase === "notapproved"
          ) {
            navigate("/waiting"); //navigate to that popup
          } else if (
            existingUser.registrationPage !== "" &&
            existingUser.registrationPhase === "registering"
          ) {
            navigate(`/registration-form/${existingUser.registrationPage}`);
          } else {
            navigate("/user-dashboard");
          }
        } catch (error) {
          // Handle errors, such as displaying an error message
          console.error("Login failed:", error);
          // You can dispatch an action to handle login failure if needed
        }
      };
      handleLogin();
    }
  }, [location, code, loginCode]);

  return (
    <>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center flex-col min-h-screen">
          <div className="fixed inset-0 bg-black opacity-45"></div>
          {/* <div>
            {message
              ? "You already have a approved account"
              : "Not a User Signup First"}
          </div>
          <div
            className="mb-4 background text-white py-3 rounded-lg font-DMsans cursor-pointer"
            // onClick={handleLogin}
          >
            {message || "Not a User"}
          </div> */}
          <img src={logo} alt="" />
          <p className="text-center font-montserrat font-semibold text-primary text-[25px]">
            Connecting Soulmate Welcomes you...{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;