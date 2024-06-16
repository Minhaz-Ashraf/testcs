import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import image from "../../DummyData/image";
import {
  setUser,
  setAuthTokenCookie,
  userDataStore,
} from "../../Stores/slices/AuthSlice";
import apiurl from "../../util";
import { jwtDecode } from "jwt-decode";
import { logo } from "../../assets";

const isAuthTokenValid = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.log("noToken");
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    const expiryTime = decodedToken.exp;
    const timeDifference = expiryTime - currentTime;

    // Convert timestamps to readable date format
    const currentDate = new Date(currentTime * 1000);
    const expiryDate = new Date(expiryTime * 1000);

    console.log("Current Date:", currentDate);
    console.log("Expiry Date:", expiryDate);
    console.log("Time Difference (seconds):", timeDifference);

    if (timeDifference <= 0) {
      console.log("expiredToken");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

const VerifyOtpLessNum = ({ onOtplessUser }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.type = "text/javascript";
    script.src = "https://otpless.com/v2/auth.js";
    script.setAttribute("data-appid", "USR70XG286B5M4HTKS3E");

    script.onload = () =>{
    window.otpless = (otplessUser) => {
      // console.log(otplessUser);
      onOtplessUser(otplessUser); // Call the callback function with otplessUser data
    };
};

document.body.appendChild(script);
    
    return () => {
      const scriptElement = document.getElementById("otpless-sdk");
      if (scriptElement) {
        document.body.removeChild(scriptElement);
    }
    };
  }, [onOtplessUser]);

  return (
    <>
     <span>
       
      </span>

      <div className="absolute pt-9 md:block sm:hidden hidden md:mt-20">
        <Marquee
          autoFill
          speed={100}
          loop={0}
          gradientWidth={500}
          className="w-full bg-red-0 inset-0 opacity-70 mb-[4rem] px-16 py-9"
        >
          <div className="flex justify-around items-center gap-[2rem]">
            {image.map((data) => (
              <img
                key={data.link} 
                src={data.link}
                alt="img"
                className="w-[20rem] h-[20rem] object-cover rounded-xl ml-9 zoom cursor-pointer"
              />
            ))}
          </div>
        </Marquee>
      </div>
      <div className=" md:absolute md:w-[35%] md:px-9 sm:px-9 px-5 py-6 md:mx-[33%] sm:mx-52 mx-6 mt-9 md:mt-6 my-2 rounded-xl  items-center font-DMsans">
      <div id="otpless-login-page"></div>
      </div>
    </>
  );
};


const VerifyNumber = ({ onClose, onSignupClick }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(userDataStore);
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(userData?.createdBy[0]?.phone);
  const [valid, setValid] = useState(true);
  const location = useLocation();
  const action = location.state?.action;
  const navigate = useNavigate();

  const handleChange = (value, country) => {
    setCountryCode(country.dialCode);
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  console.log(isAuthTokenValid());

  const handleVerify = async (user) => {
    try {
      if (!isAuthTokenValid() || userData === null || userData.createdBy[0].phone !== `${countryCode?.replace("+", "")}${phoneNumber?.slice(countryCode?.length)}`) {
        console.log("entered");
        console.log(user);
        if (user) {
          console.log("Using user data for verification:", user);
          let num;
          if (user.mobile && user.mobile.number) {
            num = user?.mobile?.number;
          } else {
            num = user?.identities[0]?.identityValue;
          }

          const response = await apiurl.post("/auth/signin", { num });
          const { existingUser, token, message } = response.data;
          console.log(existingUser, token, message);
          // Dispatch actions to set user data and JWT token in Redux state
          dispatch(setUser({ userData: { ...existingUser } }));
          dispatch(setAuthTokenCookie(token)); 
          // navigate("/link-verification");
          if (existingUser) {
            if(existingUser?.registrationPhase === "deleted"){   //decline
              navigate("/inreview")
            }else if (existingUser.isDeleted === true) {
              navigate("/reapprove");
              
            } else if (existingUser.accessType === "0" || existingUser.accessType === "1") {
              navigate(`/registration-form/1`);
            } else if (existingUser.registrationPhase === "rejected") {
              navigate(`/waiting-or-rejected`);
            } else if (existingUser.registrationPage === "6" && existingUser.registrationPhase === "notapproved") {
              navigate(`/waiting`);
            } else if (existingUser.registrationPage !== "" && existingUser.registrationPhase === "registering") {
              navigate(`/registration-form/${existingUser.registrationPage}`);
            } else {
              navigate("/user-dashboard");
            }
          }else{
            navigate(`/signup/${num}`)
          }
        } 
        return false;
      } else {
        if (userData) {
          if(userData?.registrationPhase === "deleted"){   //decline
                 navigate("/inreview")
          }else if (userData?.isDeleted === true) {
            navigate("/reapprove");
          } else if (userData.accessType === "0" || userData.accessType === "1") {
            navigate(`/admin/dashboard`);
          } else if (userData.registrationPhase === "rejected") {       //review 
            navigate(`/registration-form/1`);
          } else if (userData.registrationPage === "6" && userData.registrationPhase === "notapproved") {
            navigate(`/waiting`);
          } else if (userData.registrationPage !== "" && userData.registrationPhase === "registering") {
            navigate(`/registration-form/${userData.registrationPage}`);
          } else {
            navigate("/user-dashboard");
          }
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  

  const handleOtplessUser = (user) => {
    console.log("Otpless user set:", user);
    handleVerify(user)
  };

  if (!isAuthTokenValid() || (userData && userData.createdBy[0].phone !== `${countryCode?.replace("+", "")}${phoneNumber?.slice(countryCode?.length)}`)) {
    return <VerifyOtpLessNum onOtplessUser={handleOtplessUser}/>;
  }

  return (
    <>
      <div className="fixed inset-0 bg-[#bbbbbb]  opacity-20 md:block sm:hidden hidden "></div>
      <div className="absolute pt-32 md:block sm:hidden hidden sm:mt-52 mt-0 md:mt-0">
        <Marquee
          autoFill
          speed={100}
          loop={0}
          gradientWidth={500}
          className="w-full  bg-red-0 inset-0    opacity-70  mb-[4rem]   px-16 py-9"
        >
          <div className="flex justify-around z-30 items-center  gap-[2rem] ">
            {image.map((data) => (
              <img
                src={data.link}
                alt="img"
                className="w-[20rem]  h-[20rem] object-cover     rounded-xl ml-9  zoom cursor-pointer"
              />
            ))}
          </div>
        </Marquee>
      </div>
      <div className=" mt-36 overflow-hidden sm:mt-[23rem] md:mt-36">
        <div className="flex items-center justify-center  mx-3">
          <div className="relative z-30 shadow bg-white my-9  p-7 rounded-lg max-w-md w-full ">
            <Link
              to="/"
              className="absolute top-0 right-0 p-4 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600  "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
            <div className="text-center">
              <h2 className="text-2xl text-[#262626]  font-bold mb-4 ">
                Verify to {action === "signup" ? "Signup" : "Login"}{" "}
              </h2>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-[#262626] font-DMsans text-start mb-2 "
                  >
                    Phone Number
                  </label>
                  <label>
                    <PhoneInput
                      className="mt-3 mb-9  "
                      containerStyle={{ width: "112%" }}
                      buttonStyle={{ width: "11%" }}
                      inputStyle={{ width: "80%", height: "3rem" }}
                      country={"in"}
                      value={phoneNumber}
                      onChange={(value, country) =>
                        handleChange(value, country)
                      }
                      inputProps={{
                        required: true,
                      }}
                    />
                  </label>
                  {!valid && (
                    <p className="text-start text-[12px] absolute bottom-4 mx-20 md:mx-28 text-red-600">
                      Please enter a valid phone number*
                    </p>
                  )}
                </div>
                <p className="text-center text-[13px] -translate-y-8 text-red-600">
                  Please enter your WhatsApp number*
                </p>

                <div
                  className="mb-4 background z-50 text-white py-3 rounded-lg font-DMsans cursor-pointer"
                  onClick={() => {
                    handleVerify();
                  }}
                >
                  Send Link
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyNumber;

