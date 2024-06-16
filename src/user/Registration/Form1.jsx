import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep,
  selectStepper,
  setFormData,
} from "../../Stores/slices/Regslice";
import apiurl from "../../util";
import { SlCalender } from "react-icons/sl";

import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import {
  getCitiesByState,
  getCountries,
  getStatesByCountry,
  getCountryStateCityName,
  getLabel,
} from "../../common/commonFunction.js";
import LocationSelect, {
  RadioInput,
  TextInput,
} from "../../components/CustomInput.jsx";
import { getFormData } from "../../Stores/service/Genricfunc.jsx";
import { selectGender } from "../../Stores/slices/formSlice.jsx";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";
import { setUserAddedbyAdminId } from "../../Stores/slices/Admin.jsx";
// import { fetchApiData} from "../../Stores/slices/AuthSlice.jsx";

const Form1 = ({ page }) => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);
  const { currentStep, formData } = useSelector(selectStepper);
  const { userData, userId } = useSelector(userDataStore);
  const gender = useSelector(selectGender);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const [formone, setFormone] = useState({
    fname: "",
    mname: "",
    lname: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirthCountry: "",
    placeOfBirthState: "",
    placeOfBirthCity: "",
    post: "",
    manglik: "",
    horoscope: "",
  });

  const navigate = useNavigate();
  const handleSelectChange = (event, values, field) => {
    if (values === "Open to all") {
      if (field === "country") {
        setFormone((prevValues) => ({
          ...prevValues,
          placeOfBirthCountry: country.map((option) => option.countryId),
          placeOfBirthState: "",
          placeOfBirthCity: "",
        }));
        setState([]);
        setCity([]);
      } else if (field === "state") {
        setFormone((prevValues) => ({
          ...prevValues,
          placeOfBirthState: "",
          placeOfBirthCity: "",
        }));
        setCity([]);
      }
    } else {
      setFormone((prevValues) => ({
        ...prevValues,
        [field]: values,
      }));
      if (field === "country") {
        setFormone((prevValues) => ({
          ...prevValues,
          placeOfBirthCountry: values,
          placeOfBirthState: "",
          placeOfBirthCity: "",
        }));
        getStatesByCountry(values)
          .then((states) => {
            setState(
              states.map((item) => ({
                stateName: item.state_name,
                stateId: item.state_id,
              }))
            );
          })
          // .catch((error) => console.error("Error fetching states:", error));
      } else if (field === "state") {
        setFormone((prevValues) => ({
          ...prevValues,
          placeOfBirthState: values,
          placeOfBirthCity: "",
        }));
        getCitiesByState(formone.placeOfBirthCountry, values)
          .then((cities) => {
            setCity(
              cities.map((item) => ({
                cityName: item.city_name,
                cityId: item.city_id,
              }))
            );
          })
          // .catch((error) => console.error("Error fetching cities:", error));
      } else if (field === "city") {
        // Add this condition
        setFormone((prevValues) => ({
          ...prevValues,
          placeOfBirthCity: values, // Set placeOfBirthCity to values
        }));
      }
    }
  };

  useEffect(() => {
    dispatch(setStep(page));
  }, []);

  const getDateYearsAgo = (yearsAgo) => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - yearsAgo);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get the date 21 years ago
  const date21YearsAgo = getDateYearsAgo(21);
    const handleinput = (e) => {
      const { value, name, type } = e.target;
    
      let isValid = true;
      
      if (type === "text") {
        // Only allow alphabets for text inputs
        const regex = /^[A-Za-z\s]*$/;
        if (!regex.test(value)) {
          isValid = false;
          toast.error("Please enter only alphabetic characters");
        }
      } else if (type === "email") {
        // Basic email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
          isValid = false;
          toast.error("Please enter a valid email address");
        }
      } else if (type === "number") {
        // Basic number validation (optional, HTML5 input type="number" already handles this)
        const regex = /^\d+$/;
        if (!regex.test(value)) {
          isValid = false;
          toast.error("Please enter only numeric values");
        }
      } else if (type === "date") {
        // Basic date validation (optional, HTML5 input type="date" already handles this)
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(value)) {
          isValid = false;
          toast.error("Please enter a valid date in YYYY-MM-DD format");
        }
      } else if (type === "time") {
        // Basic time validation (optional, HTML5 input type="time" already handles this)
        const regex = /^\d{2}:\d{2}$/;
        if (!regex.test(value)) {
          isValid = false;
          toast.error("Please enter a valid time in HH:MM format");
        }
      }
    
      if (isValid) {
    
   
    setFormone((log) => ({
      ...log,
      [name]: value,
    }));
  };
    }
  // console.log({ formone });
  const handleTime = (time) => {
    // Convert UTC time to IST
    // console.log(time);
    // const istOffset = 5.5 * 60 * 60 * 1000; // Offset for IST (5 hours 30 minutes)
    const istTime = new Date(time.$d.getTime());

    // Format the time in IST
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Enable AM/PM format
    };

    // Update the state with the time in IST format
    setFormone((prevValues) => ({
      ...prevValues,
      timeOfBirth: istTime.toLocaleString("en-US", timeOptions),
    }));
  };
  // const nextForm = () => {
  //   // Proceed to the next step
  //   if (currentStep === 1) {
  //     dispatch(setStep(currentStep + 1));
  //   } else if (currentStep === 2) {
  //     dispatch(setStep(currentStep + 1));
  //   } else {
  //     // Handle other cases or show an error message
  //   }

  //   window.scrollTo(0, 0);
  // };

  const [formErrors, setFormErrors] = useState({
    fname: "",
    lname: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirthCountry: "",
    placeOfBirthState: "",
    placeOfBirthCity: "",
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
    if (!formone.fname) {
      errors.fname = "First name is required";
      hasErrors = true;
    }
    if (!formone.lname) {
      errors.lname = "Last name is required";
      hasErrors = true;
    }
    if (!formone.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
      hasErrors = true;
    }else {
      // Check if date of birth indicates the user is at least 21 years old
      const today = dayjs();
      const dob = dayjs(formone.dateOfBirth);
      const age = today.diff(dob, "year");
      if (age < 21) {
        errors.dateOfBirth = "You must be at least 21 years old";
        toast.error("You must be at least 21 years old");
        hasErrors = true;
      }
    }
    if (!formone.timeOfBirth) {
      errors.timeOfBirth = "Time of birth is required";
      hasErrors = true;
    }
    if (!formone.placeOfBirthCountry) {
      errors.placeOfBirthCountry = "Country name is required";
      hasErrors = true;
    }
    if (!formone.placeOfBirthState) {
      errors.placeOfBirthState = "State name is required";
      hasErrors = true;
    }
    if (!formone.placeOfBirthCity) {
      errors.placeOfBirthCity = "City name is required";
      hasErrors = true;
    }
    if (!formone.manglik) {
      errors.manglik = "Manglik is required";
      hasErrors = true;
    }

    if (!formone.horoscope) {
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
      return;
    }
    if (!validateForm()) {
      // console.log("Form validation failed.");
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const response = await apiurl.post(`/user-data/${userId}?page=1`, {
        basicDetails: { ...formone },
      });
      console.log(response, "jdh");
      toast.success(response.data.message);
      if(admin === "new"){
        dispatch(setUser({ userData: { ...response.data.user } }));
      }else if( admin === "adminAction" ){
        dispatch(setUserAddedbyAdminId({ userAddedbyAdminId: { ...response?.data?.user?._id } }));
      }
     
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting form");
      // console.error("Error submitting form:", error);
      return
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
    dispatch(setStep(page));
  }, []);

  useEffect(() => {
    getCountries()
      .then((countries) => {
        countries = countries.map((item) => ({
          countryName: item.country_name,
          countryId: item.country_id,
          countryCode: item.country_code,
        }));
        setCountry(countries);
      })
      // .catch((error) => console.error("Error fetching countries:", error));
  }, []);
  function DateTime() {
    let currentDate = new Date();

    // Extract year, month, and day
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
    let day = String(currentDate.getDate()).padStart(2, "0");

    // Format the date
    let formattedDate = `${year}-${month}-${day}`;

    return formattedDate; // Output: e.g., 2022-04-17
  }
  const timeFormat = (ampm) =>
    ampm ? dayjs(`1/1/1 ${ampm}`).format("HH:mm") : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = await getFormData(userId, page);
        setFormone(formData.basicDetails);
        if (formData.basicDetails.name) {
          const [fname, mname, lname] = formData.basicDetails.name.split(" ");
          const timeOfBirths = formData.basicDetails.timeOfBirth;
          // console.log((DateTime() + "T" + timeFormat(timeOfBirths)))
          // console.log(mname);
          setFormone((prevValues) => ({
            ...prevValues,
            fname: fname || "",
            mname: mname == "undefined" ? "" : mname,
            lname: lname || "",
            timeOfBirth: dayjs(DateTime() + "T" + timeFormat(timeOfBirths)),
            placeOfBirthCountry: formData.basicDetails.placeOfBirthCountry,
            placeOfBirthState: formData.basicDetails.placeOfBirthState,
            placeOfBirthCity: formData.basicDetails.placeOfBirthCity,
          }));
        }
        const countries = await getCountries();
        const mappedCountries = countries.map((item) => ({
          countryName: item.country_name,
          countryId: item.country_id,
          countryCode: item.country_code,
        }));
        setCountry(mappedCountries);

        if (formData.basicDetails.placeOfBirthCountry) {
          const countryId = formData.basicDetails.placeOfBirthCountry;
          const states = await getStatesByCountry(countryId);
          const mappedStates = states.map((item) => ({
            stateName: item.state_name,
            stateId: item.state_id,
          }));
          setState(mappedStates);

          if (formData.basicDetails.placeOfBirthState) {
            const stateId = formData.basicDetails.placeOfBirthState;
            const cities = await getCitiesByState(countryId, stateId);
            const mappedCities = cities.map((item) => ({
              cityName: item.city_name,
              cityId: item.city_id,
            }));
            setCity(mappedCities);
          }
        }
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, [userId, page]);
  // console.log(userId);

  const manglikData = ["yes", "no", "partial", "notsure"];

  const formatOption = (option) => {
    if (option === "notsure") {
      return "Not Sure";
    }
    return option.charAt(0).toUpperCase() + option.slice(1);
  };

  const capitalizedManglikData = manglikData.map(formatOption);
  {
    userData?.createdFor === "myself" ? "My" : "na";
  }

  const horoscopeData = ["Required", "Not Required", "Not Important"];

 
  return (
    <>
      <>
        <div className="bg-[#FCFCFC] sm:mx-12 md:mx-0 px-9 py-12 rounded-xl shadow ">
          <TextInput
            label=  {getLabel()}
            type="text"
            name="fname"
            
            value={formone.fname}
            onChange={handleinput}
            onBlur={handleBlur}
            error={formErrors.fname}
            placeholder="First Name "
          />

          {/* Middle Name */}
          {/* <TextInput
            label={gender}
            type="text"
            name="mname"
            value={formone.mname}
            onChange={handleinput}
            placeholder="Middle Name"
          /> */}

          <div className="flex flex-col mb-5">
            <label className="font-semibold">
             {getLabel()} Middle Name{" "}
              <span className="font-normal text-[#414141]">(Optional)</span>
            </label>
            <input
              value={formone.mname}
              onChange={handleinput}
              className={`p-2 bg-[#F0F0F0] mt-1 outline-0 md:h-[55px] w-full border focus:border-[#CC2E2E] rounded-md 
          }`}
              type="text"
              name="mname"
              placeholder="Middle Name"
            />
          </div>

          {/* Last Name */}
          <TextInput
               label=  {getLabel()}
            type="text"
            name="lname"
            value={formone.lname}
            onChange={handleinput}
            onBlur={handleBlur}
            error={formErrors.lname}
            placeholder="Last Name "
          />

          {/* Date of Birth */}

          <div className=" w-full mb-5 relative">
            <label className="font-semibold">
            {getLabel()} Date of Birth <span className="text-primary">*</span>
            </label>
            <span>
            <input
             value={formone.dateOfBirth}
              onChange={handleinput}
              className={`p-2 bg-[#F0F0F0] relative mt-1 outline-0 md:h-[60px] w-full border focus:border-[#CC2E2E] rounded-md
          }`}
              type="date"
              name="dateOfBirth"
              placeholder="D.O.B"
              max={date21YearsAgo}
  
            />
            <span className="absolute right-4 md:mt-6 mt-4 cursor-pointer">
            <SlCalender/>
</span>
            </span>


            <div className="flex flex-col mb-5 mt-6 relative">
            <label className="font-semibold">
            {getLabel()} Time of Birth <span className="text-primary">*</span>
            </label>
            <div className="w-[100%] sm:w-[100%] md:w-[100%]">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    className="time w-full "
                    value={formone.timeOfBirth}
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
          </div>
          </div>
          <div className="mt-6">
            <span className="font-semibold    ">
             {getLabel()} Place of Birth{" "}
            </span>
            <p className="font-medium font-DMsans my-2">
              Country <span className="text-primary">*</span>
            </p>
            <div className="mt-3">
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
                    (option) => option.countryId === formone.placeOfBirthCountry
                  ) || null
                }
                getOptionLabel={(option) => option.countryName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    InputLabelProps={{
                      shrink: !!formone.country || params.inputProps?.value,
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
          </div>

          <div className="mt-6">
            <Autocomplete
              onChange={(event, newValue) =>
                handleSelectChange(event, newValue.stateId, "state")
              }
              options={state}
              value={
                state.find(
                  (option) => option.stateId === formone.placeOfBirthState
                ) || null
              }
              getOptionLabel={(option) => option.stateName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  InputLabelProps={{
                    shrink: !!formone.state || params.inputProps?.value,
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
                  (option) => option.cityId === formone.placeOfBirthCity
                ) || null
              }
              getOptionLabel={(option) => option.cityName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  InputLabelProps={{
                    shrink: !!formone.city || params.inputProps?.value,
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
          <RadioInput
                label=  {getLabel()}
            options={manglikData.map((option, index) => ({
              value: option, // original value for state
              label: capitalizedManglikData[index], // capitalized label for display
            }))}
            field="Manglik Status"
            selectedValue={formone.manglik}
            onChange={(value) =>
              setFormone((prevValues) => ({ ...prevValues, manglik: value }))
            }
          />
          <RadioInput
               label=  {getLabel()}
            options={horoscopeData.map((option) => ({
              value: option,
              label: option,
            }))}
            field="Horoscope Matching"
            selectedValue={formone.horoscope}
            onChange={(value) =>
              setFormone((prevValues) => ({ ...prevValues, horoscope: value }))
            }
          />
          <div className="mt-9 flex justify-center items-center gap-16 px-12">
            <Link
              className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
              onClick={handleSubmitForm1}
            >
              Save
            </Link>
            <Link
              className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
              onClick={handleNext}
            >
              Next
            </Link>
          </div>
        </div>
      </>
    </>
  );
};

export default Form1;
