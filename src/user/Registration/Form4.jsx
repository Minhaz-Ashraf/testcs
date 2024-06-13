import { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";

import { useDispatch, useSelector } from "react-redux";
import {
  setStep,
  setFormData,
  selectStepper,
} from "../../Stores/slices/Regslice";
import { Link, useNavigate } from "react-router-dom";
import apiurl from "../../util";
import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import {
  getCitiesByState,
  getCountries,
  getLabel,

  getModifieldLabelforInput,
  getStatesByCountry,
} from "../../common/commonFunction.js";
import LocationSelect, {
  RadioInput,
  TextInput,
} from "../../components/CustomInput.jsx";
import { getFormData } from "../../Stores/service/Genricfunc.jsx";

import { selectGender } from "../../Stores/slices/formSlice.jsx";
import {  toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";


const Form4 = ({ page }) => {
 
  const [formfour, setFormfour] = useState({
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    withFamilyStatus: "",
    country: "",
    state: "",
    city: "",
    religion: "",
    community: "",
    communitytype: "",
    annualIncomeValue: "",
    users: [{ gender: "", option: "" }],
  });

  const [countri, setCountry] = useState([]);
  const [stat, setState] = useState([]);
  const [citi, setCity] = useState([]);
  const [religion, setReligion] = useState([]);
  const [community, setCommunity] = useState([]);
  const gender = useSelector(selectGender);
  const dispatch = useDispatch();
 
  const { currentStep, formData } = useSelector(selectStepper);
  const [isFocused, setIsFocused] = useState(false);
  const { userData, userId } = useSelector(userDataStore);
  const [userState, setUserState] = useState();

  const navigate = useNavigate();


  useEffect(() => {
    setUserState(userData);
  }, [userData]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  // Function to handle blur
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleInputOccupation = (e) => {
    const { value, name, type } = e.target;

    let isValid = true;

    if (type === "text") {
      // Allow alphanumeric characters only
      const regex = /^[A-Za-z0-9\s]*$/;
      if (!regex.test(value)) {
        isValid = false;
      
        e.preventDefault(); // Prevent the default behavior if the input is invalid
      }
    } else if (type === "email") {
      // Basic email validation
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        isValid = false;
  
        e.preventDefault(); // Prevent the default behavior if the input is invalid
      }
    } else if (type === "number") {
      // Basic number validation (optional, HTML5 input type="number" already handles this)
      const regex = /^\d+$/;
      if (!regex.test(value)) {
        isValid = false;
     
        e.preventDefault(); // Prevent the default behavior if the input is invalid
      }
    } else if (type === "date") {
      // Basic date validation (optional, HTML5 input type="date" already handles this)
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(value)) {
        isValid = false;
   
        e.preventDefault(); 
      }
    } else if (type === "time") {

      const regex = /^\d{2}:\d{2}$/;
      if (!regex.test(value)) {
        isValid = false;
       
        e.preventDefault(); 
      }
    }
  
    if (isValid) {

      const parsedValue = name === "community" ? parseInt(value) : value;
    setFormfour((prevForm) => ({
      ...prevForm,
      [name]: parsedValue,
    }));
  };
  }
  const handleInput = (e) => {
    const { value, name, type } = e.target;

    let isValid = true;

    if (type === "text") {
      // Allow alphanumeric characters only
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        isValid = false;
        // toast.error("Alphanumeric value is not valid");
        e.preventDefault(); // Prevent the default behavior if the input is invalid
      }
    } else if (type === "email") {
      // Basic email validation
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        
        isValid = false;
  
        e.preventDefault(); // Prevent the default behavior if the input is invalid
      }
    }  else if (type === "number") {
      // Allow only fifteen-digit numbers
      const regex = /^(0|[1-9]\d{0,14})$/;
      if (!regex.test(value)) {
        isValid = false;
      }
    }
  
    if (isValid) {

    const parsedValue = name === "community" ? parseInt(value) : value;
    setFormfour((prevForm) => ({
      ...prevForm,
      [name]: parsedValue,
    }));
  };
  }
  const handleAddUser = () => {
    if (formfour.users.length < 5) {
      setFormfour((prevForm) => ({
        ...prevForm,
        users: [...prevForm.users, { gender: "", option: "" }],
      }));
    } else {
      toast.info("You cannot add more than 5 sibling names.");
    }
  };

  const handleRemoveUser = (index) => {
    const updatedUsers = [...formfour.users];
    updatedUsers.splice(index, 1);
    setFormfour((prevForm) => ({
      ...prevForm,
      users: updatedUsers,
    }));
  };

  const [formErrors, setFormErrors] = useState({
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    withFamilyStatus: "",
    country: "",

    religion: "",
    community: "",

    annualIncomeValue: "",
  });
  const validateForm = () => {
    const errors = {};
    let hasErrors = false;

    if (!formfour.fatherName) {
      errors.fatherName = "Father's Name is required";
      hasErrors = true;
    }
    if (!formfour.fatherOccupation) {
      errors.fatherOccupation = "Father's Occupation is required";
      hasErrors = true;
    }
    if (!formfour.motherName) {
      errors.motherName = "Mother's Name is required";
      hasErrors = true;
    }
    if (!formfour.motherOccupation) {
      errors.motherOccupation = "Mother's Occupation is required";
      hasErrors = true;
    }
    if (!formfour.withFamilyStatus) {
      errors.withFamilyStatus = "Family Status is required";
      hasErrors = true;
    }
    if (!formfour.country) {
      errors.country = "Country is required";
      hasErrors = true;
    }

    if (!formfour.community) {
      errors.community = "Community is required";
      hasErrors = true;
    }
    if (!formfour.annualIncomeValue) {
      errors.annualIncomeValue = "Annual Income is required";
      hasErrors = true;
    }

    setFormErrors(errors);
    return !hasErrors;
  };

  const handleSubmitForm4 = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await apiurl.post(`/user-data/${userId}?page=4`, {
        familyDetails: { ...formfour },
      });
      toast.success(response.data.message);
      dispatch(setUser({ userData: { ...response.data.user } }));
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
      // console.error("Error submitting form:", error);
    }
  };

  const handleNext = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    await handleSubmitForm4();
    navigate(`/registration-form/${parseInt(page) + 1}`);
    window.scrollTo(0, 0);
  };
  const customErrorMessages = {
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    withFamilyStatus: "",
    country: "",

    religion: "",
    community: "",

    annualIncomeValue: "",
  };
  console.log("check data", userData)
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

  const handleGenderChange = (index, value) => {
    const updatedUsers = [...formfour.users];
    updatedUsers[index].gender = value;
    setFormfour((prevForm) => ({
      ...prevForm,
      users: updatedUsers,
    }));
  };

  const getReligionData = async () => {
    try {
      const response = await apiurl.get("/getMasterData/religion");
      setReligion(
        response.data.map((item) => ({
          religionId: item.religion_id,
          religionName: item.religion_name,
        }))
      );
    } catch (error) {
      // console.error("Error fetching religion data:", error);
      return [];
    }
  };

  const getCommunityData = async () => {
    try {
      const response = await apiurl.get("/getMasterData/community");
      let community = response.data.map((item) => ({
        communityId: item.community_id,
        communityName: item.community_name,
      }));
      setCommunity(community);
    } catch (error) {
      // console.error("Error fetching community data:", error);
      return [];
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedUsers = [...formfour.users];
    updatedUsers[index].option = value;
    setFormfour((prevForm) => ({
      ...prevForm,
      users: updatedUsers,
    }));
  };

  const handleSelectChange = (event, values, field) => {
    // console.log("value hai", values, field);
    // const { field, value } = event.target;
    // console.log(field, event);
    // console.log(values);
    if (values === "Open to all") {
      // If "Open to all" is selected, set the state to include all options
      if (field === "country") {
        setFormfour((prevValues) => ({
          ...prevValues,
          country: country.map((option) => option.countryId),
          state: "",
          city: "",
        }));
        // Optionally, you can also clear the state and city arrays here
        setState([]);
        setCity([]);
      } else if (field === "state") {
        setFormfour((prevValues) => ({
          ...prevValues,
          state: state.map((option) => option.stateId),
          city: "",
        }));
        // Optionally, you can also clear the city array here
        setCity([]);
      }
    } else {
      // If other options are selected, set the state to include those options
      setFormfour((prevValues) => ({
        ...prevValues,
        [field]: values,
      }));
      if (field === "country") {
        setFormfour((prevValues) => ({
          ...prevValues,
          country: values,
          state: "",
          city: "",
        }));
        getStatesByCountry(values)
          .then((states) => {
            states = states.map((item) => ({
              stateName: item.state_name,
              stateId: item.state_id,
            }));
            setState(states);
          })
          // .catch((error) => console.error("Error fetching states:", error));
      } else if (field === "state") {
        setFormfour((prevValues) => ({
          ...prevValues,
          state: values,
          city: "",
        }));
        getCitiesByState(formfour.country, values)
          .then((cities) => {
            cities = cities.map((item) => ({
              cityName: item.city_name,
              cityId: item.city_id,
            }));
            setCity(cities);
          })
          // .catch((error) => console.error("Error fetching cities:", error));
      }
    }
  };
  useEffect(() => {
    dispatch(setStep(page));
  }, []);

  const handleCommunityChange = (event, newValue, fieldName) => {
    if (newValue) {
      // Update community field with the selected community's ID
      setFormfour((prevValues) => ({
        ...prevValues,
        [fieldName]: newValue.communityId,
      }));
    }
  };

  const handleFaimlyincome = (event, newValues, activeThumb) => {
    if (!Array.isArray(newValues)) {
      return;
    }

    const [newValueStart, newValueEnd] = newValues;

    if (activeThumb === 0) {
      setFormfour((prevForm) => ({
        ...prevForm,
        familyAnnualIncome: {
          start: Math.min(
            newValueStart,
            prevForm.familyAnnualIncome.end - minDistance
          ),
          end: prevForm.familyAnnualIncome.end,
        },
      }));
    } else {
      setFormfour((prevForm) => ({
        ...prevForm,
        familyAnnualIncome: {
          start: prevForm.familyAnnualIncome.start,
          end: Math.max(
            newValueEnd,
            prevForm.familyAnnualIncome.start + minDistance
          ),
        },
      }));
    }
  };

  const nextForm = () => {
    // Validate form data and update stepper state
    if (currentStep === 4) {
      dispatch(setStep(currentStep + 1));
    } else if (currentStep === 4) {
      dispatch(setStep(currentStep + 1));
    } else {
      // Handle other cases or show an error message
    }
    window.scrollTo(0, 0);
  };

  const prevForm = () => {
    dispatch(setStep(currentStep - 1));
  };

  useEffect(() => {
    getReligionData();
    getCommunityData();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = await getFormData(userId, page);
        setFormfour(formData.familyDetails);
        // console.log(formData.familyDetails);
        setFormfour((prevValues) => ({
          ...prevValues,
          communitytype: formData.familyDetails.communitytype,
          annualIncomeValue: formData.familyDetails.familyAnnualIncomeStart,
          country: formData.familyDetails.familyLocationCountry,
          state: formData.familyDetails.familyLocationState,
          city: formData.familyDetails.familyLocationCity,
          community: formData.familyDetails.community || "",
          users: formData.familyDetails.users || [{ gender: "", option: "" }],
        }));
        const countries = await getCountries();
        const mappedCountries = countries.map((item) => ({
          countryName: item.country_name,
          countryId: item.country_id,
          countryCode: item.country_code,
        }));

        setCountry(mappedCountries);

        if (formData.familyDetails.familyLocationCountry) {
          const countryId = formData.familyDetails.familyLocationCountry;
          const states = await getStatesByCountry(countryId);
          const mappedStates = states.map((item) => ({
            stateName: item.state_name,
            stateId: item.state_id,
          }));
          setState(mappedStates);

          if (formData.familyDetails.familyLocationState) {
            const stateId = formData.familyDetails.familyLocationState;
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

  return (
    <>
  
  
      <div className="bg-[#FCFCFC] sm:mx-12 md:mx-0 md:px-9 px-5 sm:px-9 py-12 rounded-xl shadow ">
        <TextInput
           label=  {getLabel()}
          name="fatherName"
          value={formfour.fatherName}
          onChange={handleInput}
          placeholder="Father's Name"
          type="text"
          // Add onBlur and error props if needed
        />

        <TextInput
             label=  {getLabel()}
          name="fatherOccupation"
          value={formfour.fatherOccupation}
          onChange={handleInputOccupation}
          placeholder="Father's Occupation"
          type="text"
          // Add onBlur and error props if needed
        />
        <TextInput
             label=  {getLabel()}
          name="motherName"
          value={formfour.motherName}
          onChange={(e) => handleInput(e)}
          placeholder="Mother's Name"
        />

        <TextInput
              label=  {getLabel()}
          name="motherOccupation"
          value={formfour.motherOccupation}
          onChange={(e) => handleInputOccupation(e)}
          placeholder="Mother’s Occupation"
          type="text"
        />

        <div className="mt-4">
          <label htmlFor="name" className="font-semibold mb-1 mt-3">
           {getLabel()} Sibling’s <span className="font-normal text-[#414141]">(Optional)</span>
          </label>
          {/* {console.log(formfour)} */}
          {formfour?.users?.map((user, index) => (
            <div key={index} className="flex space-x-2 mb-2 mt-2">
              <select
                value={user.gender}
                onChange={(e) => handleGenderChange(index, e.target.value)}
                className="p-2 border rounded w-1/2 bg-[#F0F0F0] cursor-pointer"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select
                value={user.option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="p-2 border rounded w-1/2 bg-[#F0F0F0] cursor-pointer"
              >
                <option value="">Select Option</option>
                <option value="married">Married</option>
                <option value="unamarried">Un-married</option>
                <option value="Widow or Widower">Widow or Widower</option>
                <option value="Awaiting Divorce">Awaiting Divorce</option>
              </select>
              {index === 0 && (
                <button
                  onClick={handleAddUser}
                  className="p-2  text-white rounded ml-2"
                >
                  <LuPlus color="#CC2E2E" size={35} />
                </button>
              )}
              {index !== 0 && (
                <button
                  onClick={() => handleRemoveUser(index)}
                  className="p-2  text-white rounded "
                >
                  <FiMinus color="#CC2E2E" size={35} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-5 mb-3">
       
          <RadioInput
              label=  {getModifieldLabelforInput()}
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
           
            selectedValue={formfour.withFamilyStatus}
            onChange={(value) =>
              setFormfour((prevForm) => ({
                ...prevForm,
                withFamilyStatus: value,
              }))
            }
          />
        </div>
        {/* <LocationSelect
          countryOptions={countri}
          stateOptions={stat}
          cityOptions={citi}
          countryLabel="Family Settled"
          stateLabel="State"
          cityLabel="City"
          customCountryName="country"
          customStateName="state"
          customCtiyName="city"
          currentlyLivingInCountry={formfour.country}
          currentlyLivingInState={formfour.state}
          currentlyLivingInCity={formfour.city}
          handleSelectChange={handleSelectChange}
        /> */}

        <div className="mt-6">
          <span className="font-semibold    ">       {getLabel()} Family Settled </span>
          <p className="font-medium font-DMsans my-2">
            {" "}
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
              options={countri}
              value={
                countri.find(
                  (option) => option.countryId === formfour.country
                ) || null
              }
              getOptionLabel={(option) => option.countryName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  InputLabelProps={{
                    shrink: !!formfour.country || params.inputProps?.value,
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
            options={stat}
            value={
              stat.find((option) => option.stateId === formfour.state) || null
            }
            getOptionLabel={(option) => option.stateName}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State"
                InputLabelProps={{
                  shrink: !!formfour.state || params.inputProps?.value,
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
              handleSelectChange(event, newValue.cityId, "city")
            }
            options={citi}
            value={
              citi.find((option) => option.cityId === formfour.city) || null
            }
            getOptionLabel={(option) => option.cityName}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                InputLabelProps={{
                  shrink: !!formfour.city || params.inputProps?.value,
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

        <div className=" mb-2 mt-5">
          <label className="font-semibold ">
            {getLabel()} Religion 
          </label>
          <span className="flex flex-col justify-start items-start mx-5 mt-1 mb-3">
            <span className="flex flex-row items-center">
              <input
                className="p-2 rounded-full bg-[#F0F0F0] mt-1  h-[5vh] "
                type="checkbox"
                name="religion"
                value={1}
                checked={true}
                // onChange={(e) => handleInput(e)}
              />
              <label className="px-3 font-DMsans">Hinduism</label>
            </span>
          </span>
        </div>
        {/* <div className=" mb-2 mt-5">
          <label className="font-semibold mt-2 "> {gender} Community*</label>
          <div className="flex space-x-2 mb-2 mt-2">
            <select
              onChange={(e) => handleInput(e)}
              className="p-2 bg-[#F0F0F0] w-full mt-1 outline-0 h-[8vh] border focus:border-[#CC2E2E] rounded-md"
              type="text"
              name="community"
              value={formfour.community}
            >
              <option value="">Select Community</option>
              {community?.map((item, index) => (
                <option key={index} value={item.communityId}>
                  {item.communityName}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        <div className="mt-6">
          <span className="font-semibold    ">
          {getLabel()} Community <span className="text-primary">*</span>
          </span>
          <div className="mt-3">
            <Autocomplete
              onChange={(event, newValue) =>
                handleSelectChange(
                  event,
                  newValue ? newValue.communityId : "",
                  "community"
                )
              }
              options={community}
              value={
                community.find(
                  (option) => option.communityId === formfour.community
                ) || null
              }
              getOptionLabel={(option) => option.communityName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Community"
                  InputLabelProps={{
                    shrink: !!formfour.community || params.inputProps?.value,
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


        <div className="mt-5">
        <label className=" font-DMsans font-semibold"> {getLabel()} Family Annual Income ({userState?.careerDetails?.[0]?.currencyType}) <span className="text-primary">*</span></label>
        <input
            value={formfour.annualIncomeValue}
            onChange={(e) => handleInput(e)}
            className={`p-2 bg-[#F0F0F0] mt-2 outline-0 md:h-[55px] w-full border focus:border-[#CC2E2E] rounded-md 
          }`}
            type="number"
            name="annualIncomeValue"
            placeholder="Annual Income :"
          />
           
        </div>
        <div className="mt-9 flex justify-center  items-center md:gap-16 gap-3 px-12">
          <Link
            to={`/registration-form/${parseInt(page) - 1}`}
            onClick={prevForm}
            className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
          >
            Previous
          </Link>

          <Link
            onClick={handleSubmitForm4}
            className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
          >
            Save
          </Link>
          <Link
            onClick={handleNext}
            className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
          >
            Next
          </Link>
        </div>
      </div>
    </>
  );
};
export default Form4;
