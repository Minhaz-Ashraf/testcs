import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import CustomSlider from "../../components/CustomSlider";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import { getFormData } from "../../Stores/service/Genricfunc";
import LocationSelect, { RadioInput } from "../../components/CustomInput";
import { selectGender } from "../../Stores/slices/formSlice";
import {
  getCitiesByState,
  getCountries,
  getStatesByCountry,
} from "../../common/commonFunction";
import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";
import apiurl from "../../util";
import { useNavigate } from "react-router-dom";
const PersonalDetail = ({ showProfile, profileData, setAgainCallFlag, againCallFlag, location }) => {
  const [personalDatas, setPersonalDatas] = useState([]);
  const [response, setResponse] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [detailpersonal, setDetailPersonal] = useState({
    height: "",
    weight: "",
    personalAppearance: "",
    currentlyLivingInCountry: "",
    currentlyLivingInState: "",
    currentlyLivingInCity: "",
    relocationInFuture: "",
    diet: "",
    maritalStatus: "",
    smokingPreference: "",
    contact: "", // Integrate phone number into detailpersonal state
    email: "",
    alcohal: "",
    email: "",
  });
  const { userId } = useSelector(userDataStore);
  const dispatch = useDispatch();

  const [valid, setValid] = useState(true);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Function to handle blur
  const handleBlur = () => {
    setIsFocused(false);
  };
  const gender = useSelector(selectGender);
  const nextForm = () => {
    // Validate form data and update stepper state
    if (currentStep === 1) {
      dispatch(setStep(currentStep + 1));
    } else if (currentStep === 2) {
      dispatch(setStep(currentStep + 1));
    } else {
      // Handle other cases or show an error message
    }
    window.scrollTo(0, 0);
  };

  const prevForm = () => {
    dispatch(setStep(currentStep - 1));
  };
  // console.log({ userId });
  const handleinput = (e) => {
    const { value, name } = e.target;
    setDetailPersonal((log) => ({
      ...log,
      [name]: value,
    }));
  };
  //sliderChange
  const handleSliderChange = (name) => (event, newValue) => {
    setDetailPersonal((log) => ({
      ...log,
      [name]: newValue,
    }));
  };
  const handleSelectChange = (event, values, field) => {
    if (values === "Open to all") {
      if (field === "country") {
        setDetailPersonal((prevValues) => ({
          ...prevValues,
          currentlyLivingInCountry: country.map((option) => option.countryId),
          currentlyLivingInState: "",
          currentlyLivingInCity: "",
        }));
        setState([]);
        setCity([]);
      } else if (field === "state") {
        setDetailPersonal((prevValues) => ({
          ...prevValues,
          currentlyLivingInState: "",
          currentlyLivingInCity: "",
        }));
        setCity([]);
      }
    } else {
      setDetailPersonal((prevValues) => ({
        ...prevValues,
        [field]: values,
      }));
      if (field === "country") {
        setDetailPersonal((prevValues) => ({
          ...prevValues,
          currentlyLivingInCountry: values,
          currentlyLivingInState: "",
          currentlyLivingInCity: "",
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
        setDetailPersonal((prevValues) => ({
          ...prevValues,
          currentlyLivingInState: values,
          currentlyLivingInCity: "",
        }));
        getCitiesByState(detailpersonal.placeOfBirthCountry, values).then(
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
        setDetailPersonal((prevValues) => ({
          ...prevValues,
          currentlyLivingInCity: values, // Set placeOfBirthCity to values
        }));
      }
    }
  };
  const { contact } = detailpersonal;

  const relocationInFutureData = ["Yes", "No", "Not Sure"];
  const dietData = [
    "Vegetarian",
    "Non - Vegetarian",
    "Occasionally Non - Vegetarian ",
    "Eggetarian",
    "Vegan",
  ];
  const alcohalData = ["Regular", "Occasional", "Social", "Not at all"];
  const smokingData = ["Regular", "Occasional", "Social", "Not at all"];
  const maritalData = [
    "single",
    "divorcee",
    "awaitingdivorce",
    "widoworwidower",
  ];

  const formatOption = (option) => {
    if (option === "awaitingdivorce") {
      return "Awaiting Divorce";
    }
    if (option === "widoworwidower") {
      return "Widow or Widower";
    }
    return option.charAt(0).toUpperCase() + option.slice(1);
  };

  const CapitalmaritalData = maritalData.map(formatOption);

  const [formErrors, setFormErrors] = useState({
    // height: "",
    // weight: "",

    currentlyLivingInCountry: "",

    relocationInFuture: "",
    diet: "",
    maritalStatus: "",
    smoking: "",
    contact: "",
    email: "",
    alcohol: "",
  });
  const [isFocusedError, setIsFocusedError] = useState(false);
  const handleFocusError = () => {
    setIsFocusedError(true);
  };

  // Function to handle blur
  const handleBlurInputError = () => {
    setIsFocusedError(false);
  };

  const validateForm = () => {
    const errors = {};
    let hasErrors = false;

    if (!detailpersonal.currentlyLivingInCountry) {
      errors.currentlyLivingInCountry = "Country is required";
      hasErrors = true;
    }
    if (!detailpersonal.relocationInFuture) {
      errors.relocationInFuture = "Relocation In Future is required";
      hasErrors = true;
    }
    if (!detailpersonal.diet) {
      errors.diet = "Diet is required";
      hasErrors = true;
    }
    if (!detailpersonal.maritalStatus) {
      errors.maritalStatus = "Marital Status is required";
      hasErrors = true;
    }
    if (!detailpersonal.smoking) {
      errors.smoking = "Smoking is required";
      hasErrors = true;
    }
    if (
      typeof detailpersonal.contact !== "string" ||
      !detailpersonal.contact.trim()
    ) {
      errors.contact = "Contact number is required";
      hasErrors = true;
    }
    if (
      typeof detailpersonal.email !== "string" ||
      !detailpersonal.email.trim()
    ) {
      errors.email = "Email is required";
      hasErrors = true;
    }

    setFormErrors(errors); // Update the form errors state
    return !hasErrors; // Return true if there are no errors
  };

  // Inside handleSubmitForm2 function
  const handleSubmitForm2 = async () => {
    // console.log("Submitting Form 2...");

    // Validate form data
    if (!validateForm()) {
      // console.log("Form validation failed.");
      toast.error("Please fill in all required fields.");
      setIsOpen((prev) => prev);
    
      return;
    }

    try {
      // console.log("Form data validation passed. Submitting data...");

      // Form submission logic
      const response = await apiurl.post(`/user-data/${userId}?page=2`, {
        additionalDetails: { ...detailpersonal },
      });
      setAgainCallFlag(true);
      toast.success(response.data.message);
      // dispatch(setUser({ userData: { ...response.data.user } }));
      setIsOpen((prev) => !prev);
      // console.log("Form submitted successfully:", response.data);
    } catch (error) {
      // console.error("Error submitting form data:", error);
      toast.error("An error occurred while submitting form data.");
    }
  };

  // Before form submission in handleNext function
  // console.log("Form data before submission:", detailpersonal);

  // const handleNext = async () => {
  //   if (!validateForm()) {
  //     toast.error("Please fill in all required fields.");
  //     return;
  //   }
  //   await handleSubmitForm2();
  //   navigate(`/registration-form/${parseInt(page) + 1}`);
  //   window.scrollTo(0, 0);
  // };
  const customErrorMessages = {
    height: "Height",
    weight: "Weight",

    currentlyLivingInCountry: "Country",

    relocationInFuture: "Relocation In Future",
    diet: "Diet",
    maritalStatus: "Marital Status",
    smoking: "Smoking",
    contact: "Contact",
    email: "Email",
    alcohol: "Alcohol",
  };

  const handleBlurError = (e) => {
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

  // console.log(detailpersonal);

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
  // useEffect(() =>
  // {
  //   const fetchData = async () =>
  //   {
  //     console.log({ additionalDetails })

  //     if (additionalDetails)
  //     {
  //       setDetailPersonal(additionalDetails);
  //       if (additionalDetails.currentlyLivingInCountry)
  //       {
  //         const countryId = additionalDetails.currentlyLivingInCountry;
  //         const states = await getStatesByCountry(countryId);
  //         const mappedStates = states.map((item) => ({
  //           stateName: item.state_name,
  //           stateId: item.state_id,
  //         }));
  //         setState(mappedStates);

  //         if (additionalDetails.currentlyLivingInState)
  //         {
  //           const stateId = additionalDetails.currentlyLivingInState;
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


    // console.log(userData);
    const fetchData = async () => {
      const userData = profileData[1];
      // console.log(userData?.user?.basicDetails, "makk");
      if (userData ) {
        const data = profileData[1];
             
        setDetailPersonal({
          height: data.height || "",
          weight: data.weight || "",

          // currentlyLivingInCountry: data.height || '',
          // currentlyLivingInState: data.height || '',
          // currentlyLivingInCity: data.height || '',
          relocationInFuture: data.relocationInFuture || "",
          diet: data.diet || "",
          maritalStatus: data.maritalStatus || "",
          smoking: data.smoking || "",
          contact: data.contact || "", // Integrate phone number into formtwo state
          email: data.email || "",
          alcohol: data.alcohol || "",
          currentlyLivingInCountry: data.currentlyLivingInCountry,
          currentlyLivingInState: data.currentlyLivingInState,
          currentlyLivingInCity: data.currentlyLivingInCity,
        });

        const perosnalData = profileData[1];
        setPersonalDatas([
          // formData,
          // perosnalData,
          perosnalData,
        ]);
      }

      // console.log(personalDatas[0]?.currentlyLivingInCountry);
      if (userData?.currentlyLivingInCountry) {
        const countryId = userData?.currentlyLivingInCountry;
        const states = await getStatesByCountry(countryId);
        const mappedStates = states.map((item) => ({
          stateName: item.state_name,
          stateId: item.state_id,
        }));
        setState(mappedStates);

        if (userData?.currentlyLivingInState) {
          const stateId = userData?.currentlyLivingInState;
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
    if(showProfile){
      setIsOpen(false);
    }
    console.log("personalDetails")
  }, [showProfile, againCallFlag]);


  console.log(personalDatas, "mako");
  return (
    <>
      <div className="shadow rounded-xl py-3 mt-9 my-5  w-full overflow-hidden">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">Personal Details</p>
          <span
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-[20px] cursor-pointer flex items-center font-DMsans"
          >
            {console.log({ showProfile })}
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
        <hr className="mx-9  " />
        <span className="md:flex sm:flex md:flex-row sm:flex-row items-baseline justify-between font-DMsans  px-10 text-start pb-8">
          <div className=" mt-4  text-[17px] mx-10 md:mx-0 sm:mx-0 md:w-1/2 sm:w-1/2">
            <p className="  font-medium "> Height</p>
            <p className=" font-light text-[15px]">
              {personalDatas[0]?.height ? personalDatas[0]?.height + "ft" : "NA"}
            </p>
            <p className="  font-medium pt-4"> Weight</p>
            <p className="font-light text-[15px]">
              {" "}
              {personalDatas[0]?.weight ? personalDatas[0]?.weight : "NA"} Kg
            </p>
            <p className=" pt-4 font-medium"> Presently Settled in Country</p>
            <p className="font-light text-[15px]">
              {" "}
              {personalDatas[0]?.countryatype
                ? personalDatas[0]?.countryatype
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium">Presently Settled in State</p>
            <p className="font-light text-[15px]">
              {/* {console.log({ detailpersonal })} */}
              {personalDatas[0]?.stateatype
                ? personalDatas[0]?.stateatype
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium">Presently Settled in City</p>
            <p className="font-light text-[15px]">
              {" "}
              {personalDatas[0]?.cityatype
                ? personalDatas[0]?.cityatype
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium">Open to Relocate in Future</p>
            <p className="font-light text-[15px]">
              {" "}
              {personalDatas[0]?.relocationInFuture
                ? personalDatas[0]?.relocationInFuture
                : "NA"}{" "}
            </p>
          </div>
          <div className="text-[17px] mt-4 mx-10 md:w-1/2 sm:w-1/2">
            <p className="  font-medium "> Diet</p>
            <p className="font-light text-[15px]">
              {" "}
              {personalDatas[0]?.dietatype
                ? personalDatas[0]?.dietatype
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium">Alcohol Consumption</p>
            <p className="font-light text-[15px]">
              {" "}
              {personalDatas[0]?.alcohol
                ? personalDatas[0]?.alcohol
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium"> Smoking Preference</p>
            <p className="font-light text-[15px]">
              {" "}
              {personalDatas[0]?.smoking
                ? personalDatas[0]?.smoking
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium">Martial Status</p>
            <p className="font-light text-[15px]">
              {" "}
              {personalDatas[0]?.maritalStatus
                ? personalDatas[0]?.maritalStatus
                : "NA"}{" "}
            </p>
            {console.log(location)}
            {/* {location?.includes('interests') && <> */}
            {location.includes('interests') &&  <>  <p className=" pt-4 font-medium">Contact Details</p>
            <p className="font-light text-[15px]">
              {" "}
              {detailpersonal.contact ? detailpersonal.contact : "NA"}
            </p>
            <p className=" pt-4 font-medium">Email Address</p>
            <p className="font-light text-[15px]">
              {" "}
              {detailpersonal.email ? detailpersonal.email : "NA"}
            </p>
          </>  }
            {/* </>} */}
          </div>
        </span>

        {isOpen && (
          <>
            <span className="flex md:flex-row sm:flex-row flex-col  items-baseline justify-between sm:gap-9 md:gap-9 font-DMsans px-10 text-start pb-8">
              <span className="w-full">
                <label className="font-semibold mt-2 ">
                  {" "}
                  Height <span className="text-primary">*</span>
                </label>
                <CustomSlider
                  value={detailpersonal.height}
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  defaultValue={20}
                  className="mb-12"
                  minValue={4.0}
                  maxValue={7.0}
                  step={0.1}
                  onChange={handleSliderChange("height")}
                  onBlur={handleBlurError}
                />

                <label className="font-semibold  ">
                  Weight ( KGs ) <span className="text-primary">*</span>
                </label>
                <CustomSlider
                  value={detailpersonal.weight}
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  defaultValue={20}
                  minValue={35}
                  maxValue={150}
                  className="mb-6"
                  onChange={handleSliderChange("weight")}
                  onBlur={handleBlurError}
                />
                <div className="mt-6">
                  <span className="font-semibold    ">
                    {" "}
                    Presently Setteled in
                  </span>
                  <p className=" font-DMsans my-2 font-medium ">
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
                          (option) =>
                            option.countryId ===
                            detailpersonal?.currentlyLivingInCountry
                        ) || null
                      }
                      getOptionLabel={(option) => option.countryName}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country"
                          InputLabelProps={{
                            shrink:
                              !!detailpersonal.country ||
                              params.inputProps?.value,
                          }}
                          onFocus={handleFocus}
                          onBlur={() => {
                            handleBlur();
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                              {
                                border: "none",
                              },
                              backgroundColor: "#F0F0F0"
                          }}
                        />
                      )}
                    />
                  </div>
                  {/* {formErrors.currentlyLivingInCountry && <span className="text-red-500 font-DMsans">{formErrors.currentlyLivingInCountry}</span>} */}
                </div>

                <div className="mt-6 ">
                  <Autocomplete
                    onChange={(event, newValue) =>
                      handleSelectChange(event, newValue.stateId, "state")
                    }
                    options={state}
                    value={
                      state.find(
                        (option) =>
                          option.stateId ===
                          detailpersonal?.currentlyLivingInState
                      ) || null
                    }
                    getOptionLabel={(option) => option.stateName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        InputLabelProps={{
                          shrink:
                            !!detailpersonal.state || params.inputProps?.value,
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              border: "none",
                            },
                            backgroundColor: "#F0F0F0"
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
                          option.cityId ===
                          detailpersonal?.currentlyLivingInCity
                      ) || null
                    }
                    getOptionLabel={(option) => option.cityName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City"
                        InputLabelProps={{
                          shrink:
                            !!detailpersonal.city || params.inputProps?.value,
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              border: "none",
                            },
                            backgroundColor: "#F0F0F0"
                        }}
                      />
                    )}
                  />
                </div>
                <RadioInput
                  options={relocationInFutureData.map((option, index) => ({
                    value: option,
                    label: option,
                  }))}
                  field="Open/Plan to Relocation in Future"
                  selectedValue={detailpersonal.relocationInFuture}
                  onChange={(value) =>
                    setDetailPersonal((prevState) => ({
                      ...prevState,
                      relocationInFuture: value,
                    }))
                  }
                />

                <RadioInput
                  options={dietData.map((option, index) => ({
                    value: index + 1,
                    label: option,
                  }))}
                  field="Diet Type"
                  selectedValue={detailpersonal.diet}
                  onChange={(value) => {
                    setDetailPersonal((prevState) => ({
                      ...prevState,
                      diet: value,
                    }));
                    // console.log(value);
                  }}
                />
              </span>

              <span className="w-full ">
                <RadioInput
                  options={alcohalData.map((option, index) => ({
                    value: option,
                    label: option,
                  }))}
                  field="Alcohol Consumption Preference"
                  selectedValue={detailpersonal.alcohol}
                  onBlur={handleBlurError}
                  onChange={(value) =>
                    setDetailPersonal((prevState) => ({
                      ...prevState,
                      alcohol: value,
                    }))
                  }
                />
                <div className="md:mt-10 sm:mt-10"> 
                <RadioInput
                  options={smokingData.map((option, index) => ({
                    value: option,
                    label: option,
                  }))}
                  field="Smoking Preference"
                  selectedValue={detailpersonal.smoking}
                  onBlur={handleBlurError}
                  onChange={(value) =>
                    setDetailPersonal((prevState) => ({
                      ...prevState,
                      smoking: value,
                    }))
                  }
                />
                
                </div>

                <RadioInput
                  options={maritalData.map((option, index) => ({
                    value: option,
                    label: CapitalmaritalData[index],
                  }))}
                  field="Marital Status"
                  selectedValue={detailpersonal.maritalStatus}
                  onBlur={handleBlurError}
                  onChange={(value) =>
                    setDetailPersonal((prevState) => ({
                      ...prevState,
                      maritalStatus: value,
                    }))
                  }
                />
            <div className="sm:mt-28 md:mt-20">

                <label
                  htmlFor="username"
                  className="block  font-semibold text-[#262626] font-DMsans text-start mb-2 mt-2"
                >
                  Contact Number <span className="text-primary">*</span>
                </label>
                <label>
                  <PhoneInput
                    className="mt-3 mb-6 "
                    containerStyle={{ width: "110%" }}
                    buttonStyle={{
                      width: "0%",
                      backgroundColor: "transparent",
                    }}
                    inputStyle={{
                      width: "91%",
                      height: "3rem",
                      backgroundColor: "#F0F0F0",
                    }}
                    country={"in"}
                    currentlyLivingInCountry={
                      detailpersonal.currentlyLivingInCountry
                    }
                    value={contact} // Use contact instead of phoneNumber
                    onChange={(value) =>
                      handleinput({ target: { name: "contact", value } })
                    } // Call handleinput with an object simulating an event
                    inputProps={{
                      required: true,
                    }}
                  />
                </label>
                {!valid && (
                  <p className="text-start text-[12px] text-red-600">
                    Please enter a valid phone number*
                  </p>
                )}
</div>
                <div className="flex flex-col mb-2 ">
                  <label htmlFor="name" className="font-semibold mb-1 ">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    value={detailpersonal.email}
                    onChange={(e) => handleinput(e)}
                    className="p-2  bg-[#F0F0F0] mt-1 outline-0 h-[55px] border focus:border-[#CC2E2E]  rounded-md mb-3"
                    type="text"
                    name="email"
                    onBlur={handleBlurError}
                    placeholder="Enter your email"
                    id="name"
                  />
                </div>
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
                  handleSubmitForm2();
                
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

export default PersonalDetail;
