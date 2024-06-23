import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Consent from "./Consent";
import apiurl from "../../util";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setAuthTokenCookie } from "../../Stores/slices/AuthSlice";
import { setCreatedFor, setGender } from "../../Stores/slices/formSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);
  const { number } = useParams();
  const [signup, setSignup] = useState({
    createdFor: null,
    name: "",
    phone: number || "",
    gender: "",
  });

  const [showConsent, setShowConsent] = useState(false);
  const navigate = useNavigate();

  const [valid, setValid] = useState(true);
  const [countryCode, setCountryCode] = useState("us"); // Default country code

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data && data.country_code) {
          setCountryCode(data.country_code.toLowerCase());
        }
      } catch (error) {
        console.error("Error fetching geolocation data:", error);
      }
    };

    fetchGeolocation();
  }, []);
  const handleSignup = async () => {
    try {
      const response = await apiurl.post("/auth/signup", { ...signup });
      const { savedUser, token } = response.data;
      // console.log({ savedUser, token });
      dispatch(setUser({ userData: { ...savedUser } }));
      dispatch(setAuthTokenCookie(token));
      navigate("/registration-form/1");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (value) => {
    setSignup((prevValue) => ({
      ...prevValue,
      phone: ` ${value}`,
    }));
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phone) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phone);
  };

  const relationshipOptions = [
    { id: 1, name: "myself" },
    { id: 2, name: "myson" },
    { id: 3, name: "mydaughter" },
    { id: 4, name: "mybrother" },
    { id: 5, name: "mysister" },
    { id: 6, name: "myfriend" },
    { id: 7, name: "myrelative" },
  ];

  const handleGenderChange = (selectedGender) => {
    if (signup.createdFor === 1) {
      setSignup({ ...signup, gender: selectedGender });
      dispatch(setGender("My"));
    } else if (![6, 7].includes(signup.createdFor)) {
      setSignup({ ...signup, gender: selectedGender });
      dispatch(setGender(selectedGender));
    } else {
      let gender;
      if (selectedGender === "M") {
        gender = "His";
      } else {
        gender = "Her";
      }
      setSignup({ ...signup, gender: selectedGender });
      dispatch(setGender(gender));
    }
  };
  // Handle dropdown change for relationship
  const handleRelationshipChange = (selectedRelationship) => {
    setSignup({ ...signup, createdFor: selectedRelationship });

    if (![1].includes(selectedRelationship)) {
      setShowConsent(true);
    }

    if ([2, 3, 4, 5].includes(selectedRelationship)) {
      handleGenderUpdate(selectedRelationship);
    }
    let gender = "";
    if ([2, 4].includes(selectedRelationship)) {
      gender = "His"; // Male
    } else if ([3, 5].includes(selectedRelationship)) {
      gender = "Her"; // Female
    } else if ([1].includes(selectedRelationship)) {
      gender = "My"; // Myself
    }

    // Dispatch actions to update createdFor and gender in Redux store

    dispatch(setCreatedFor(selectedRelationship));
    dispatch(setGender(gender));
  };
  const handleGenderUpdate = (createdFor) => {
    // Map createdFor values to corresponding gender values
    const genderMapping = {
      2: "M",
      3: "F",
      4: "M",
      5: "F",
    };
    // Set gender based on the mapping, or default to 'M' if not found
    const gender = genderMapping[createdFor];

    // Update the gender in the state
    setSignup((prevValue) => ({ ...prevValue, gender }));
  };

  // Determine whether the radio buttons should be disabled
  const isRadioDisabled = () => {
    const { createdFor } = signup;
    // Check if radio buttons should be disabled
    return ![1, 6, 7].includes(createdFor);
  };

  const callBackName = (firstName, lastName) => {
    setSignup((prevValue) => ({
      ...prevValue,
      name: ` ${firstName} ${lastName}`,
    }));
  };
  // console.log(signup.phone);

  return (
    <>
      <div
        className={`rounded-md bg-white p-5 ${
          showConsent ? "hidden" : "block"
        }`}
      >
        <div className="text-center bg-[#FCFCFC] md:px-9 px-5 py-12 rounded-xl shadow md:mx-80 sm:mx-9 ">
          <h2 className="text-2xl text-[#262626] font-semibold mb-4">
            Sign up
          </h2>
          <form>
            <span className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-[#262626] font-DMsans text-start mb-2"
              >
                Profile Is Created For *
              </label>
              <select
                onChange={(e) =>
                  handleRelationshipChange(Number(e.target.value))
                }
                className="w-full h-[3rem] px-3 rounded-md bg-[#F0F0F0] capitalize"
              >
                <option value={null} className="font-light">
                  Select Relationship
                </option>
                {relationshipOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name === "myself"
                      ? "My Self"
                      : option.name === "myson"
                      ? "My Son"
                      : option.name === "mydaughter"
                      ? "My Daughter"
                      : option.name === "mybrother"
                      ? "My Brother"
                      : option.name === "mysister"
                      ? "My Sister"
                      : option.name === "myfriend"
                      ? "My Friend"
                      : "My Relative"}
                  </option>
                ))}
              </select>

              <span className=" mb-2">
                <div>
                  <label className="text-sm font-semibold text-[#262626] font-DMsans flex text-start mb-2 mt-5">
                    Bride/Groom - Gender *
                  </label>
                  <span className="flex flex-col justify-start items-start mx-5 mt-3 mb-3">
                    <span className="flex flex-row items-center mb-2">
                      <input
                        className="p-2 bg-[#F0F0F0] mt-1  h-[5vh] "
                        type="radio"
                        name="gender"
                        checked={signup.gender === "M"}
                        onChange={() => handleGenderChange("M")}
                        disabled={isRadioDisabled()}
                      />
                      <label htmlFor="male" className="px-3 font-DMsans">
                        Male
                      </label>
                    </span>
                    <span className="flex flex-row items-center">
                      <input
                        className="p-2 bg-[#F0F0F0] mt-1  h-[5vh]"
                        type="radio"
                        name="gender"
                        checked={signup.gender === "F"}
                        onChange={() => handleGenderChange("F")}
                        disabled={isRadioDisabled()}
                      />
                      <label htmlFor="female" className="px-3 font-DMsans">
                        Female
                      </label>
                    </span>
                  </span>
                </div>
              </span>

              <label
                htmlFor="username"
                className="block text-sm font-semibold text-[#262626] font-DMsans text-start mb-2 mt-2"
              >
                Contact Number
              </label>
              <label>
                <PhoneInput
                  className="mt-3 mb-9 "
                  containerStyle={{ width: "100%" }}
                  buttonStyle={{ width: "0%", backgroundColor: "transparent" }}
                  inputStyle={{
                    width: "100%",
                    height: "3rem",
                    backgroundColor: "#F0F0F0",
                  }}
                  // country={countryCode}
                  value={signup.phone}
                  onChange={handleChange}
                
                  inputProps={{
                    required: true,
                    readOnly: admin === "adminAction" ? false : true,
                  }}
                />
              </label>
              {!valid && (
                <p className="text-start text-[12px] text-red-600">
                  Please enter a valid phone number*
                </p>
              )}
            </span>
            <span>
              <span
                onClick={handleSignup}
                className="w-full bg-[#A92525] block text-white py-3 cursor-pointer rounded-lg"
              >
                Continue
              </span>
              {/* <span onClick={handleSignup} className="w-full bg-[#A92525] block text-white py-3 cursor-pointer rounded-lg">
                  Signup
                </span> */}
            </span>

            <span className="flex items-center mt-7 mb-7">
              <span className="flex-grow bg bg-gray-300 h-0.5"></span>
              <span className="flex-grow-0 mx-5 text dark:text-white">or</span>
              <span className="flex-grow bg bg-gray-300 h-0.5"></span>
            </span>
            <p className="text-[13px] text-[#A0A0A0] text-center mb-2">
              Already have an account?
            </p>
            <Link to="/login">
              {" "}
              <span className="mb-4 w-full block border-[1px] border-[#A92525] text-[#A92525] py-3 rounded-lg font-DMsans cursor-pointer mt-5">
                Login
              </span>
            </Link>
          </form>
        </div>
      </div>{" "}
      <span>
        {showConsent && (
          <Consent
            setShowConsent={setShowConsent}
            callBackName={callBackName}
            selectedOption={relationshipOptions.find(
              (option) => option.id === signup.createdFor
            )}
          />
        )}
      </span>
    </>
  );
};

export default Signup;
