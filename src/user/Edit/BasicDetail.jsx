import React, { useEffect, useState } from "react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { FiEdit } from "react-icons/fi";
import { getFormData, getUser } from "../../Stores/service/Genricfunc";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { logout, setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import LocationSelect, {
  RadioInput,
  TextInput,
} from "../../components/CustomInput";
import {
  getCitiesByState,
  getCountries,
  getLabel,
  getStatesByCountry,

} from "../../common/commonFunction";
import { selectGender } from "../../Stores/slices/formSlice";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import apiurl from "../../util";
import { SlCalender } from "react-icons/sl";
const BasicDetail = ({ showProfile, userID, profileData, isUserData, setIsUserData }) => {
  const { userId } = useSelector(userDataStore);
  const [basicDetailsData, setBsicDetailsData] = useState([]);
  const [basicData, setBasicData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState([]);
  const dispatch = useDispatch();
  const gender = useSelector(selectGender);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [updatedData, setUpdateData] = useState([]);

  console.log(isUserData, " data");
  const [selectedCity, setSelectedCity] = useState(null);
  const [detailBasic, setDetailBasic] = useState({
    fname: "",
    mname: "",
    lname: "",
    dateOfBirth: "",
    age: 0,
    timeOfBirth: "",
    placeOfBirthCountry: "",
    placeOfBirthState: "",
    placeOfBirthCity: "",
    post: "",
    manglik: "",
    horoscope: "",
  });

  const handleSelectChange = (event, values, field) => {
    if (values === "Open to all") {
      if (field === "country") {
        setDetailBasic((prevValues) => ({
          ...prevValues,
          placeOfBirthCountry: country.map((option) => option.countryId),
          placeOfBirthState: "",
          placeOfBirthCity: "",
        }));
        setState([]);
        setCity([]);
      } else if (field === "state") {
        setDetailBasic((prevValues) => ({
          ...prevValues,
          placeOfBirthState: "",
          placeOfBirthCity: "",
        }));
        setCity([]);
      }
    } else {
      setDetailBasic((prevValues) => ({
        ...prevValues,
        [field]: values,
      }));
      if (field === "country") {
        setDetailBasic((prevValues) => ({
          ...prevValues,
          placeOfBirthCountry: values,
          placeOfBirthState: "",
          placeOfBirthCity: "",
        }));
        getStatesByCountry(values).then((states) => {
          setState(
            states.map((item) => ({
              stateName: item.state_name,
              stateId: item.state_id,
            }))
          );
        });
        // .catch((error) => console.error("Error fetching states:", error));
      } else if (field === "state") {
        setDetailBasic((prevValues) => ({
          ...prevValues,
          placeOfBirthState: values,
          placeOfBirthCity: "",
        }));
        getCitiesByState(detailBasic.placeOfBirthCountry, values).then(
          (cities) => {
            setCity(
              cities.map((item) => ({
                cityName: item.city_name,
                cityId: item.city_id,
              }))
            );
          }
        );
        // .catch((error) => console.error("Error fetching cities:", error));
      } else if (field === "city") {
        // Add this condition
        setDetailBasic((prevValues) => ({
          ...prevValues,
          placeOfBirthCity: values, // Set placeOfBirthCity to values
        }));
      }
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDateYearsAgo = (yearsAgo) => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - yearsAgo);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDate();
  const date21YearsAgo = getDateYearsAgo(21);
  const handleinput = (e) => {
    const { value, name, type } = e.target;

    let isValid = true;

    if (type === "text") {
      // Only allow alphabets for text inputs
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        isValid = false;
      
      }
    } else if (type === "email") {
      // Basic email validation
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        isValid = false;
      
      }
    } else if (type === "number") {
      // Basic number validation (optional, HTML5 input type="number" already handles this)
      const regex = /^\d+$/;
      if (!regex.test(value)) {
        isValid = false;
    
      }
    } else if (type === "date") {
      // Basic date validation (optional, HTML5 input type="date" already handles this)
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(value)) {
        isValid = false;
      
      }
    } else if (type === "time") {
      // Basic time validation (optional, HTML5 input type="time" already handles this)
      const regex = /^\d{2}:\d{2}$/;
      if (!regex.test(value)) {
        isValid = false;
      
      }
    }

    if (isValid) {
      setDetailBasic((log) => ({
        ...log,
        [name]: value,
      }));
    }
  };

  // const handleTime = (time) => {

  //   const istTime = new Date(time.$d.getTime());

  //   const timeOptions = {
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: true, 
  //   };

    
  //   setDetailBasic((prevValues) => ({
  //     ...prevValues,
  //     timeOfBirth: istTime.toLocaleString("en-US", timeOptions),
  //   }));
  // };


  const handleTime = (time) => {
    // Ensure time.$d exists to avoid errors
    if (!time || !time.$d) return;
  
    // Create a Date object from the provided time
    const date = new Date(time.$d);
  
    // Extract the hour and minute, and determine AM/PM
    let hours = date.getHours();  // This gets the hours from the date object
    const minutes = date.getMinutes();  // This gets the minutes from the date object
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    // Pad minutes with leading zero if necessary
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
    // Construct the formatted time string
    const timeString = hours + ':' + minutesStr + ' ' + ampm;
  
    // Update state with the formatted time string
    setDetailBasic((prevValues) => ({
      ...prevValues,
      timeOfBirth: timeString,
    }));
  };
  

  const [formErrors, setFormErrors] = useState({
    fname: "",
    lname: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirthCountry: "",

    manglik: "",
    horoscope: "",
  });
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Function to handle blur
  const handleBlurInput = () => {
    setIsFocused(false);
  };

  const validateForm = () => {
    const errors = {};
    let hasErrors = false;

    // Check each required field
    if (!detailBasic.fname) {
      errors.fname = "First name is required";
      hasErrors = true;
    }
    if (!detailBasic.lname) {
      errors.lname = "Last name is required";
      hasErrors = true;
    }
    if (!detailBasic.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
      hasErrors = true;
    } else {
      // Check if date of birth indicates the user is at least 21 years old
      const today = dayjs();
      const dob = dayjs(detailBasic.dateOfBirth);
      const age = today.diff(dob, "year");
      if (age < 21) {
        errors.dateOfBirth = "You must be at least 21 years old";
        toast.error("You must be at least 21 years old");
        hasErrors = true;
      }
    }
    if (!detailBasic.timeOfBirth) {
      errors.timeOfBirth = "Time of birth is required";
      hasErrors = true;
    }
    if (!detailBasic.manglik) {
      errors.manglik = "Manglik is required";
      hasErrors = true;
    }

    if (!detailBasic.horoscope) {
      errors.horoscope = "horoscope is required";
      hasErrors = true;
    }

    // Add validation for other required fields if any

    setFormErrors(errors); // Update the form errors state
    return !hasErrors; // Return true if there are no errors
  };
  const handleSubmitForm1 = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      setIsOpen((prev) => prev);
      return;
    }   
    // if (!validateForm()) {
    //   // console.log("Form validation failed.");
    //   toast.error("Please fill in all required fields.");
    //   return;
    // }
    try {
      const response = await apiurl.post(`/user-data/${userId}?page=1`, {
        basicDetails: { ...detailBasic },
      });
      toast.success(response.data.message);
      fetchData();
      setIsUserData(true);
      // dispatch(setUser({ userData: { ...response.data.user } }));
      setIsOpen((prev) => !prev);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting form");
      // console.error("Error submitting form:", error);
      return;
    }
  };

  const handleNext = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");

      return;
    }
    await handleSubmitForm1();
    navigate(`/registration-form/${parseInt(page) + 1}`);
    window.scrollTo(0, 0);
  };

  const customErrorMessages = {
    fname: "First name",
    lname: "Last name",
    dateOfBirth: "Date of birth",
    timeOfBirth: "Time of birth",
    placeOfBirthCountry: "Country",
    manglik: "Manglik status",
    horoscope: "Horoscope matching",
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;
    const errors = { ...formErrors };

    // Validate the input field when it loses focus
    if (!value.trim()) {
      errors[name] = `${customErrorMessages[name]} is required !`;
    } else {
      errors[name] = ""; // Clear the error message if the field is not empty
    }

    setFormErrors(errors);
  };

  useEffect(() => {
    getCountries().then((countries) => {
      countries = countries.map((item) => ({
        countryName: item.country_name,
        countryId: item.country_id,
        countryCode: item.country_code,
      }));
      setCountry(countries);
    });
    // .catch((error) => console.error("Error fetching countries:", error));
  }, []);
 
  const timeFormat = (ampm) =>
    ampm ? dayjs(`1/1/1 ${ampm}`).format("HH:mm") : null;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!Array.isArray(basicDetails)) console.log({ basicDetails });
  //     {
  //       const userDatas = await apiurl.get(`/getUser/${basicDetails.userID}`);
  //       setResponse(userDatas.data);
  //       setDetailBasic(basicDetails.basicDetails);

  //       if (basicDetails.basicDetails.name) {
  //         const [fname, mname, lname] =
  //           basicDetails.basicDetails.name.split(" ");
  //         const timeOfBirths = basicDetails.basicDetails.timeOfBirth;
  //         console.log(DateTime() + "T" + timeFormat(timeOfBirths));
  //         console.log(basicDetails.basicDetails);
  //         setDetailBasic((prevValues) => ({
  //           ...prevValues,
  //           fname: fname || "",
  //           mname: mname == "undefined" ? "" : mname,
  //           lname: lname || "",
  //           timeOfBirth: dayjs(DateTime() + "T" + timeFormat(timeOfBirths)),
  //           placeOfBirthCountry: basicDetails.basicDetails.placeOfBirthCountry,
  //           placeOfBirthState: basicDetails.basicDetails.placeOfBirthState,
  //           placeOfBirthCity: basicDetails.basicDetails.placeOfBirthCity,
  //         }));
  //       }

  //       if (basicDetails.basicDetails.placeOfBirthCountry) {
  //         const countryId = basicDetails.basicDetails.placeOfBirthCountry;
  //         const states = await getStatesByCountry(countryId);
  //         const mappedStates = states.map((item) => ({
  //           stateName: item.state_name,
  //           stateId: item.state_id,
  //         }));
  //         setState(mappedStates);

  //         if (basicDetails.basicDetails.placeOfBirthState) {
  //           const stateId = basicDetails.basicDetails.placeOfBirthState;
  //           const cities = await getCitiesByState(countryId, stateId);
  //           const mappedCities = cities.map((item) => ({
  //             cityName: item.city_name,
  //             cityId: item.city_id,
  //           }));
  //           setCity(mappedCities);
  //         }
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);
  // console.log();
  // useEffect(() => {
  //   getUser();
  // }, []);
  console.log(profileData, "mak");
  const fetchData = async () => {
    const userData = profileData[0]?.basicDetails;
    // setBasicData(userData);
     console.log(userData, "makp");
    console.log(userData, "mak");
    if (userData) {
      const data = userData;
      // console.log(data,"lpl")
      const nameParts = (data.name || "").split(" ");
      const fname = nameParts[0] || "";
      const lname =
        nameParts.length > 2
          ? nameParts.slice(-1).join(" ")
          : nameParts[1] || "";
      const mname =
        nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";
      const timeOfBirths = data.timeOfBirth;
      setDetailBasic({
        fname,
        mname: mname || "",
        lname,
        dateOfBirth: data?.dateOfBirth || "",
        timeOfBirth: data?.timeOfBirth || "",
        manglik: data?.manglik || "",
        horoscope: data?.horoscope || "",
        placeOfBirthCountry: data?.placeOfBirthCountry,
        placeOfBirthState: data?.placeOfBirthState,
        placeOfBirthCity: data?.placeOfBirthCity,
      });

      setBsicDetailsData(data);
    }

    if (userData[0]?.placeOfBirthCountry) {
      const countryId = userData[0]?.placeOfBirthCountry;
      const states = await getStatesByCountry(countryId);
      const mappedStates = states.map((item) => ({
        stateName: item.state_name,
        stateId: item.state_id,
      }));
      setState(mappedStates);

      if (userData[0]?.placeOfBirthState) {
        const stateId = userData[0]?.placeOfBirthState;
        const cities = await getCitiesByState(countryId, stateId);
        const mappedCities = cities.map((item) => ({
          cityName: item.city_name,
          cityId: item.city_id,
        }));
        setCity(mappedCities);
      }
    }
  };

  useEffect(() => {
    fetchData();
    if (showProfile) {
      setIsOpen(false);
    }
    console.log("detailbasic")
  }, [ showProfile]);
  // console.log(basicDetailsData?.timeOfBirth, "pppp")
  // useEffect(() => {
  //   if (userData) {
  // const formData = userData?.basicDetails;
  // const selfDetails = userData?.selfDetails;
  // const personalData = userData?.additionalDetails; // Fixed typo: perosnalData -> personalData
  // const educationData = userData?.careerDetails;
  // const additionalDetails = userData?.familyDetails;

  // const newBasicDetailsData = [
  //   formData,
  // personalData, // Updated variable name
  // educationData,
  // additionalDetails,
  // selfDetails,
  // ];

  // setBsicDetailsData(newBasicDetailsData); // Fixed typo: setBsicDetailsData -> setBasicDetailsData

  //  console.log(newBasicDetailsData)

  // if (basicDetailsData?.[0]?.name) {
  //   const [fname, mname, lname] =
  //     basicDetailsData?.[0].name?.split(" ");

  //   setDetailBasic((prevValues) => ({
  //     ...prevValues,
  //     fname: fname || "",
  //     mname: mname == "undefined" ? "" : mname,
  //     lname: lname || "",

  //   }));
  // }

  // if (formData?.countrybtype) {
  //   const selected = country.find((c) => c.countryId === formData?.placeOfBirthCountry );
  //   setSelectedCountry(selected?.countryId);

  //   // console.log("stselct", selected);
  // }
  // console.log("mak2", formData?.statebtype);
  // if(formData?.statebtype){
  //   const selectState = state.find((c) => c.stateId ===  formData?.placeOfBirthState);
  //   setSelectedState(selectState)
  //  console.log("makm", state)
  // }
  // if(formData?.citybtype){
  //   const selectCity = city.find((option) =>option.cityId === formData?.placeOfBirthCity)
  //   setSelectedCity(selectCity)
  // }
  // }
  // }, [userData]);

  console.log("mak3", selectedCity);

  const manglikData = ["yes", "no", "partial", "notsure"];

  const formatOption = (option) => {
    if (option === "notsure") {
      return "Not Sure";
    }
    return option.charAt(0).toUpperCase() + option.slice(1);
  };

  const capitalizedManglikData = manglikData.map(formatOption);
  {
    basicData?.user?.createdFor === "myself" ? "My" : "na";
  }

  const horoscopeData = ["Required", "Not Required", "Not Important"];

  const handleTimeConvert = (time) => {
    // Convert UTC time to IST
    const utcDate = new Date(time);

    // Define options for formatting the time
    const options = {
      timeZone: "Asia/Kolkata", // Set time zone to Indian Standard Time
      hour12: true, // Enable AM/PM format
      hour: "2-digit", // Display hour (with leading zero)
      minute: "2-digit", // Display minute (with leading zero)
    };

    // Convert UTC time to IST time string
    const istTimeString = utcDate.toLocaleTimeString("en-IN", options);

    return istTimeString; // Return the formatted IST time string
  };
  // console.log({ detailBasic, userData })
  console.log("select", basicData?.user);
  return (
    <>
      <div className="shadow rounded-xl   py-3  mt-9 my-5 w-full ">
        <span className="flex justify-between items-center text-primary px-10 py-2 ">
          <p className="  font-medium  text-[20px]">Basic Details</p>
          <span
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-[20px] cursor-pointer flex items-center font-DMsans"
          >
            {!showProfile && (
              <>
                {!isOpen ? (
                  <>
                    <FiEdit />
                    <span className=" px-3 text-[14px]">Edit</span>{" "}
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </span>
        </span>
        <hr className="mx-9" />
        <span className="flex md:flex-row flex-col sm:flex-row  items-baseline justify-between md:pe-52 sm:pe-20 font-DMsans px-10 text-start pb-8 overflow-hidden">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium"> Profile Created For</p>
            <p className="font-light capitalize">
              {/* {console.log({ response })} */}
              {profileData[0]?.createdBy[0]?.createdFor || "NA"}
            </p>

            <p className=" pt-4 font-medium"> Name</p>
            <p className=" font-light">
              {/* {detailBasic?.name != undefined ? detailBasic?.fname : ""}{" "}
              {detailBasic?.mname !== undefined ? detailBasic?.mname : ""}{" "}
              {detailBasic?.lname !== undefined ? detailBasic?.lname : ""} */}
              {basicDetailsData?.name?.replace("undefined", "") || "NA"}
            </p>

            <p className=" pt-4 font-medium"> Gender</p>
            <p className=" font-light">
              {basicDetailsData?.gender === "M" ? " Male" : "Female" || "NA"}
            </p>

            <p className=" pt-4 font-medium">Birth Date</p>
            <p className=" font-light">{basicDetailsData?.dateOfBirth}</p>
          </span>
          <span className="text-[14px] mt-4">
            <p className="  font-medium"> Time of Birth</p>
            <p className=" font-light">
              {basicDetailsData?.timeOfBirth || "NA"}
            </p>

            <p className=" pt-4 font-medium"> Age</p>
            <p className=" font-light">{basicDetailsData?.age || "NA"}yrs</p>

            <p className=" pt-4 font-medium"> Place of Birth</p>
            <p className=" font-light ">
              {basicDetailsData?.citybtype || "NA"},
              {basicDetailsData?.statebtype || "NA"},
              {basicDetailsData?.countrybtype || "NA"}
            </p>

            <p className=" pt-4 font-medium">Manglik Status</p>
            <p className=" font-light capitalize">
              {basicDetailsData?.manglik}
            </p>
          </span>
        </span>

        {isOpen && (
          <>
            <span className="flex md:flex-row sm:flex-row flex-col  items-baseline justify-between gap-9 font-DMsans px-10 text-start pb-8">
              <span className="w-full">
                <TextInput
                  type="text"
                  name="fname"
                  value={detailBasic.fname}
                  onChange={handleinput}
                  onBlur={handleBlur}
                  error={formErrors.fname}
                  placeholder="First Name "
                />

                {/* Middle Name */}
                <div className="flex flex-col mb-5">
            <label className="font-semibold">
             Middle Name{" "}
              <span className="font-normal text-[#414141]">(Optional)</span>
            </label>
            <input
              value={detailBasic.mname}
              onChange={handleinput}
              className={`p-2 bg-[#F0F0F0] mt-1 outline-0 md:h-[55px] w-full border focus:border-[#CC2E2E] rounded-md 
          }`}
              type="text"
              name="mname"
              placeholder="Middle Name"
            />
          </div>
                <TextInput
                  label={gender}
                  type="text"
                  name="lname"
                  value={detailBasic.lname}
                  onChange={handleinput}
                  error={formErrors.lname}
                  placeholder="Last Name "
                />
                <span className="font-semibold mt-6">Place of Birth</span>

                <div className="mt-3">
                  <p className="font-medium font-DMsans my-2">
                    {" "}
                    Country <span className="text-primary">*</span>
                  </p>
                  <Autocomplete
                    onChange={(event, newValue) =>
                      handleSelectChange(
                        event,
                        newValue ? newValue.countryId : "",
                        "country"
                      )
                    }
                    options={country}
                    value={
                      country.find(
                        (option) =>
                          option.countryId === detailBasic.placeOfBirthCountry
                      ) || null
                    }
                    getOptionLabel={(option) => option.countryName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        InputLabelProps={{
                          shrink:
                            !!detailBasic.country || params.inputProps?.value,
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              border: "none",
                            },
                        }}
                      />
                    )}
                  />
                </div>

                <div className="mt-6">
                  <Autocomplete
                    onChange={(event, newValue) =>
                      handleSelectChange(event, newValue.stateId, "state")
                    }
                    options={state}
                    value={
                      state.find(
                        (option) =>
                          option.stateId === detailBasic.placeOfBirthState
                      ) || null
                    }
                    getOptionLabel={(option) => option.stateName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        InputLabelProps={{
                          shrink:
                            !!detailBasic.state || params.inputProps?.value,
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              border: "none",
                            },
                        }}
                      />
                    )}
                  />
                </div>

                <div className="mt-6 mb-5">
                  <Autocomplete
                    onChange={(event, newValue) =>
                      handleSelectChange(event, newValue.cityId, "city")
                    }
                    options={city}
                    value={
                      city.find(
                        (option) =>
                          option.cityId === detailBasic.placeOfBirthCity
                      ) || null
                    }
                    getOptionLabel={(option) => option.cityName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City"
                        InputLabelProps={{
                          shrink:
                            !!detailBasic.city || params.inputProps?.value,
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              border: "none",
                            },
                        }}
                      />
                    )}
                  />
                </div>
              
              </span>

              <span className="w-full">
              
                <div className=" w-full mb-5 relative">
                  <label className="font-semibold">
                    Date of Birth <span className="text-primary">*</span>
                  </label>
                  <span>
                    <input
                      value={detailBasic.dateOfBirth}
                      onChange={handleinput}
                      className={`p-2 bg-[#F0F0F0] relative mt-1 outline-0 md:h-[60px] w-full border focus:border-[#CC2E2E] rounded-md
          }`}
                      type="date"
                      name="dateOfBirth"
                      placeholder="D.O.B"
                      max={date21YearsAgo}
                    />
                    <span className="absolute right-4 md:mt-6 mt-4 cursor-pointer">
                      <SlCalender />
                    </span>
                  </span>
                </div>
                <div className="  justify-between mb-5 ">
                  <label htmlFor="batch" className="font-semibold ">
                    {gender} Time of Birth{" "}
                    <span className="text-primary">*</span>
                  </label>
                  <div className="w-full sm:w-full md:w-[106%] ]">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          className="time w-full "
                          value={detailBasic.timeOfBirth}
                          onChange={(e) => handleTime(e)}
                          onBlur={(e) => handleBlur(e)}
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  {formErrors.timeOfBirth && (
                    <span className="text-red-500 font-DMsans">
                      {formErrors.timeOfBirth}
                    </span>
                  )}
                </div>
                <RadioInput
                  options={manglikData.map((option, index) => ({
                    value: option, // original value for state
                    label: capitalizedManglikData[index], // capitalized label for display
                  }))}
                  field="Manglik Status"
                  selectedValue={detailBasic.manglik}
                  onChange={(value) =>
                    setDetailBasic((prevValues) => ({
                      ...prevValues,
                      manglik: value,
                    }))
                  }
                />
                <RadioInput
                  label={gender}
                  options={horoscopeData.map((option) => ({
                    value: option,
                    label: option,
                  }))}
                  field="Horoscope Matching"
                  selectedValue={detailBasic.horoscope}
                  onChange={(value) =>
                    setDetailBasic((prevValues) => ({
                      ...prevValues,
                      horoscope: value,
                    }))
                  }
                />
              </span>
            </span>

            <div className="flex items-center justify-end gap-5 mx-9 mb-9 font-DMsans">
              <span
                onClick={() => setIsOpen((prev) => !prev)}
                className="border border-primary text-primary px-5 rounded-md py-2 cursor-pointer"
              >
                Cancel
              </span>
              <span
                onClick={() => {
                  handleSubmitForm1();
                  // setIsOpen((prev) => !prev);
                }}
                className="bg-primary text-white px-7 rounded-md py-2 cursor-pointer"
              >
                Save
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BasicDetail;
