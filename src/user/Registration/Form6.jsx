import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setStep, selectStepper } from "../../Stores/slices/Regslice";
import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getCitiesByState,
  getCountries,
  getStatesByCountry,
  getMasterData,
} from "../../common/commonFunction.js"; // Import your utility functions
import apiurl from "../../util.js";
import CustomSlider from "../../components/CustomSlider.jsx";
import { getFormData } from "../../Stores/service/Genricfunc.jsx";
import { toast } from "react-toastify";
import { setSelectAll } from "../../Stores/slices/selectAllSlice,jsx";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
const minDistance = 3;
function valuetext(value) {
  return `${value}°C`;
}

const Form6 = ({ page }) => {
  // const selectAllReduce = useSelector((state) => state.selectAll.selectAll);
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllEducation, setSelectAllEducation] = useState(false);

  const [selectDiet, setSelectDiet] = useState(false);
  const [formsix, setFormsix] = useState({
    country: "",
    state: "",
    city: "",
    maritalStatus: "",
    education: "",
    // workingpreference: [],

    community: "",
    profession: "",
    dietType: "",
    all: "",
    ageRangeStart: 20,
    ageRangeEnd: 39,
    heightRangeStart: 3,
    heightRangeEnd: 7,
    annualIncomeRangeStart: "",
    annualIncomeRangeEnd: "",
  });
  const dispatch = useDispatch();
  const { userId } = useSelector(userDataStore);
  // console.log(userId);
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
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [community, setCommunity] = useState([]);
  const [education, setEducation] = useState([]);
  const [profession, setProfession] = useState([]);
  const [diet, setDiet] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  // Function to handle focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Function to handle blur
  const handleBlur = () => {
    setIsFocused(false);
  };
  const prevForm = () => {
    dispatch(setStep(currentStep - 1));
  };
  const handleAge = (event, newValues, activeThumb) => {
    if (!Array.isArray(newValues)) {
      return;
    }

    const [newValueStart, newValueEnd] = newValues;

    if (activeThumb === 0) {
      setFormsix((prevForm) => ({
        ...prevForm,
        ageRangeStart: Math.min(
          newValueStart,
          prevForm.ageRangeEnd - minDistance
        ),
      }));
    } else {
      setFormsix((prevForm) => ({
        ...prevForm,
        ageRangeEnd: Math.max(
          newValueEnd,
          prevForm.ageRangeStart + minDistance
        ),
      }));
    }
  };

  const handleHeight = (event, newValues, activeThumb) => {
    if (!Array.isArray(newValues)) {
      return;
    }

    const [newValueStart, newValueEnd] = newValues;

    setFormsix((prevForm) => ({
      ...prevForm,
      heightRangeStart: newValueStart,
      heightRangeEnd: newValueEnd,
    }));
  };

  const handleCheckboxChange = (e, option, field, id) => {
    const { checked } = e.target;

    if (id === -1) {
      // Set all values in the field to checked or unchecked based on the 'checked' value
      setFormsix((prevForm) => ({
        ...prevForm,
        [field]: checked ? option : [],
      }));
    } else {
      if (checked) {
        // Add the selected option to the corresponding field in the formsix state
        setFormsix((prevForm) => ({
          ...prevForm,
          [field]: Array.isArray(prevForm[field])
            ? [...prevForm[field], option]
            : prevForm[field] == undefined
            ? [option]
            : [...stringToArray(prevForm[field]), option],
        }));
      } else {
        // console.log(formsix, field);

        // Remove the unselected option from the corresponding field in the formsix state
        setFormsix((prevForm) => ({
          ...prevForm,
          [field]: Array.isArray(prevForm[field])
            ? prevForm[field].filter((item) => item !== option)
            : stringToArray(prevForm[field]).filter((item) => item !== option),
        }));
      }
    }
  };
  // console.log({ formsix });
  function arrayToString(arr) {
    return arr.join(", ");
  }
  function stringToArray(str) {
    // console.log(str);
    return str.split(", ").map((item) => item.trim());
  }


  const [selectAllMaritalStatus, setSelectAllMaritalStatus] = useState(false);

  const [selectAllDiet, setSelectAllDiet] = useState(false);

  // useEffect(() => {
  //   setSelectAllMaritalStatus(formsix.maritalStatus.length === maritalData.length);
  // }, [formsix.maritalStatus, maritalData]);

  // useEffect(() => {
  //   setSelectAllEducation(formsix.education.length === education.length);
  // }, [formsix.education, education]);

  // useEffect(() => {
  //   setSelectAllDiet(formsix.dietType.length === diet.length);
  // }, [formsix.dietType, diet]);

  const handleSelectAllChange = (e, name) => {
    const isChecked = e.target.checked;
  
    if (isChecked) {
      if (name === "maritalStatus") {
        setFormsix((prevForm) => ({
          ...prevForm,
          maritalStatus: maritalData.map((val) => val).join(', '), // Select all options as comma-separated string
        }));
        setSelectAllMaritalStatus(true);
      } else if (name === "education") {
        setFormsix((prevForm) => ({
          ...prevForm,
          education: education.map((val) => val.educationId).join(', '), // Select all options as comma-separated string
        }));
        setSelectAllEducation(true);
      } else if (name === "workingpreference") {
        setFormsix((prevForm) => ({
          ...prevForm,
          workingpreference: workingpreferenceData.join(', '), // Select all options as comma-separated string
        }));
        setSelectWorkingPreference(true);
      } else if (name === "dietType") {
        setFormsix((prevForm) => ({
          ...prevForm,
          dietType: diet.map((val) => val.dietId).join(', '), // Select all options as comma-separated string
        }));
        setSelectDiet(true);
      }
    } else {
      if (name === "maritalStatus") {
        setFormsix((prevForm) => ({
          ...prevForm,
          maritalStatus: '', // Deselect all options
        }));
        // setSelectAll(false);
        setSelectAllMaritalStatus(false);
      } else if (name === "education") {
        setFormsix((prevForm) => ({
          ...prevForm,
          education: '', // Deselect all options
        }));
        setSelectAllEducation(false);
      } else if (name === "workingpreference") {
        setFormsix((prevForm) => ({
          ...prevForm,
          workingpreference: '', // Deselect all options
        }));
        setSelectWorkingPreference(false);
      } else if (name === "dietType") {
        setFormsix((prevForm) => ({
          ...prevForm,
          dietType: '', // Deselect all options
        }));
        setSelectDiet(false);
      }
    }
  };
  
  const getEducation = async () => {
    try {
      const data = await getMasterData("education");
      if (data) {
        setEducation(() => [
        
          ...data.map((item) => ({
            educationId: item.education_id,
            educationName: item.education_name,
          })),
        ]);
      } else {
        // console.error("Data is null or undefined");
      }
    } catch (error) {
      // console.error("Error fetching education data:", error);
    }
  };
  const getCommunityData = async () => {
    try {
      const response = await getMasterData("community");
      let community = response.map((item) => ({
        communityId: item.community_id,
        communityName: item.community_name,
      }));
      setCommunity(community);
    } catch (error) {
      // console.error("Error fetching community data:", error);
      return [];
    }
  };

  const getProfession = async () => {
    try {
      const data = await getMasterData("profession");
      const professionOptions = data.map((item) => ({
        id: item.proffesion_id,
        name: item.proffesion_name,
      }));
      // Adding "Open to all" option at the beginning
      setProfession(["Open to all", ...professionOptions]);
    } catch (error) {
      // console.error("Error fetching profession data:", error);
    }
  };
  const getDiet = async () => {
    const data = await getMasterData("diet");
    setDiet(
      data.map((item) => ({
        dietId: item.diet_id,
        dietName: item.diet_name,
      }))
    );
  };

  useEffect(() => {
    dispatch(setStep(page));
  }, []);

  const handleannualIncomeRange = (event, newValues, activeThumb) => {
    if (!Array.isArray(newValues)) {
      return;
    }

    const [newValueStart, newValueEnd] = newValues;

    if (activeThumb === 0) {
      setFormsix((prevForm) => ({
        ...prevForm,
        annualIncomeRange: {
          start: Math.min(
            newValueStart,
            prevForm.annualIncomeRange.end - minDistance
          ),
          end: prevForm.annualIncomeRange.end,
        },
      }));
    } else {
      setFormsix((prevForm) => ({
        ...prevForm,
        annualIncomeRange: {
          start: prevForm.annualIncomeRange.start,
          end: Math.max(
            newValueEnd,
            prevForm.annualIncomeRange.start + minDistance
          ),
        },
      }));
    }
  };
  const handleAnnualIncome = (event, newValues, activeThumb) => {
    if (!Array.isArray(newValues)) {
      return;
    }

    const [newValueStart, newValueEnd] = newValues;

    if (activeThumb === 0) {
      setFormsix((prevForm) => ({
        ...prevForm,
        annualIncomeRangeStart: Math.min(
          newValueStart,
          prevForm.annualIncomeRangeEnd - minDistance
        ),
      }));
    } else {
      setFormsix((prevForm) => ({
        ...prevForm,
        annualIncomeRangeEnd: Math.max(
          newValueEnd,
          prevForm.annualIncomeRangeStart + minDistance
        ),
      }));
    }
  };
  const handleProfessionChange = (event, values) => {
    if (values.includes("Open to all")) {
      // If "Open to all" is selected, set the state to include all options
      setFormsix((prevValues) => ({
        ...prevValues,
        profession: profession.map((option) => option.id),
      }));
    } else {
      // If other options are selected, set the state to include those options
      setFormsix((prevValues) => ({
        ...prevValues,
        profession: values.map((value) => value.id),
      }));
    }
  };

  const [formErrors, setFormErrors] = useState({
    country: "",

    maritalStatus: "",
    education: "",

    profession: "",
    dietType: "",
    community: "",
    // ageRangeStart: 20,
    // ageRangeEnd: 39,
    // heightRangeStart: 3,
    // heightRangeEnd: 7,
    // annualIncomeRangeStart:"",
    // annualIncomeRangeEnd: "",
  });

  const validateForm = () => {
    const errors = {};
    let hasErrors = false;

    if (!formsix.country) {
      errors.country = "Country is required";
      hasErrors = true;
    }
    if (!formsix.maritalStatus) {
      errors.maritalStatus = "Marital Status is required";
      hasErrors = true;
    }
    if (!formsix.community) {
      errors.community = "community is required";
      hasErrors = true;
    }
    if (!formsix.dietType) {
      errors.dietType = "Diet is required";
      hasErrors = true;
    }
    if (!formsix.profession) {
      errors.profession = "Profession is required";
      hasErrors = true;
    }
    if (!formsix.education) {
      errors.education = "Education is required";
      hasErrors = true;
    }

    // if (!formsix.annualIncomeValue) {
    //   errors.annualIncomeValue = "Annual Income is required";
    //   hasErrors = true;
    // }

    setFormErrors(errors);
    return !hasErrors;
  };

  const handleSubmitForm6 = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      let strFormSix = { ...formsix };

      // console.log("data", formsix.country, formsix.state, formsix.city);
      // console.log("string", strFormSix);
      //  const countryStr = formsix?.country?.join(",") || ""
      //  const stateStr = formsix?.state?.join(",") || ""
      //  const cityStr = formsix?.city?.join(",") || ""

      //  strFormSix.country = countryStr
      //  strFormSix.state = stateStr
      //  strFormSix.city= cityStr
      if (Array.isArray(formsix.state)) {
        strFormSix.state = formsix.state.join(",");
      }
      if (Array.isArray(formsix.city)) {
        strFormSix.city = formsix.city.join(",");
      }
      if (Array.isArray(formsix.country)) {
        strFormSix.country = formsix.country.join(",");
      }
      if (Array.isArray(formsix.community)) {
        strFormSix.community = formsix.community.join(",");
      }

      const response = await apiurl.post(`/user-data/${userId}?page=6`, {
        partnerPreference: { ...strFormSix },
      });
      toast.success(response.data.message);
      dispatch(setUser({ userData: { ...response.data.user } }));
      // console.log(response.data);
    } catch (error) {
      toast.error("something went wrong", error);
      // console.error("Error fetching cities:", error);
      return [];
    }
  };

  const handleNext = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    await handleSubmitForm6();
    navigate("/form-submitted");
    
    // navigate(`/registration-form/${parseInt(page) + 1}`);
  };
  const customErrorMessages = {
    country: "This field is required",

    maritalStatus: "This field is required",
    education: "This field is required",

    profession: "This field is required",
    dietType: "This field is required",

    // ageRangeStart: 20,
    // ageRangeEnd: 39,
    // heightRangeStart: 3,
    // heightRangeEnd: 7,
    // annualIncomeRangeStart:"",
    // annualIncomeRangeEnd: "",
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
  // const handleSelectChange = (event, values, field) => {
    // console.log("Selected values:", values, field);
    // console.log("Event details:", event);

  //   if (values.includes("open_to_all")) {
  //     if (field === "country") {
  //       setFormsix((prevValues) => ({
  //         ...prevValues,
  //         country: country.map((option) => option.countryId).join(","),
  //         state: "",
  //         city: "",
  //       }));
  //       setState([]);
  //       setCity([]);
  //     } else if (field === "state") {
  //       setFormsix((prevValues) => ({
  //         ...prevValues,
  //         state: state.map((option) => option.stateId).join(","),
  //         city: "",
  //       }));
  //       setCity([]);
  //     }
  //   } else {
  //     setFormsix((prevValues) => ({
  //       ...prevValues,
  //       [field]: Array.isArray(values) ? values.join(",") : values,
  //     }));

  //     if (field === "country") {
  //       setFormsix((prevValues) => ({
  //         ...prevValues,
  //         country: Array.isArray(values) ? values.join(",") : values,
  //         state: "",
  //         city: "",
  //       }));
  //       getStatesByCountry(values)
  //         .then((states) => {
  //           states = states.map((item) => ({
  //             stateName: item.state_name,
  //             stateId: item.state_id,
  //           }));
  //           setState(states);
  //         })
          // .catch((error) => console.error("Error fetching states:", error));
  //     } else if (field === "state") {
  //       setFormsix((prevValues) => ({
  //         ...prevValues,
  //         state: Array.isArray(values) ? values.join(",") : values,
  //         city: "",
  //       }));
  //       getCitiesByState(formsix.country, values)
  //         .then((cities) => {
  //           cities = cities.map((item) => ({
  //             cityName: item.city_name,
  //             cityId: item.city_id,
  //           }));
  //           setCity(cities);
  //         })
          // .catch((error) => console.error("Error fetching cities:", error));
  //     }
  //   }
  // };

  const fetchStatesByIds = async (stateIds) => {
    // console.log(stateIds)
    try {
      const response = await apiurl.get(`/multiple-states?state=${stateIds}`)
      return response.data;

    } catch (error) {
      // console.error('Error fetching states:', error);
      throw error;
    }
  };
  
  const fetchCitiesByIds = async (cityIds) => {
    try {
      const response = await apiurl.get(`/multiple-cities?city=${cityIds}`)
      return response.data;
    } catch (error) {
      // console.error('Error fetching cities:', error);
      throw error;
    }
  };

  const handleSelectChange = (event, values, field) => {
    if (values === "Open to all") {
      if (field === "country") {
        setFormsix((prevValues) => ({
          ...prevValues,
          country: country.map((option) => option.countryId),
          state: "",
          city: "",
        }));
        setState([]);
        setCity([]);
      } else if (field === "state") {
        setFormsix((prevValues) => ({
          ...prevValues,
          state: "",
          city: "",
        }));
        setCity([]);
      }
    } else {
      setFormsix((prevValues) => ({
        ...prevValues,
        [field]: values,
      }));
      if (field === "country") {
        setFormsix((prevValues) => ({
          ...prevValues,
          country: values,
          state: "",
          city: "",
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
        setFormsix((prevValues) => ({
          ...prevValues,
          state: values,
          city: "",
        }));
        getCitiesByState(formsix.country, values)
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
        setFormsix((prevValues) => ({
          ...prevValues,
          city: values,
        }));
      }
    }
  };

  const handleCommunityChange = (event, newValue, fieldName) => {
    let selectedValues = "";

    if (newValue) {
      if (newValue.some((option) => option.communityId === "all")) {
        // If "Open to all" is selected, select all communities
        selectedValues = community
          .map((option) => option.communityId);
        
      } else {
        // If other option(s) are selected, include them
        selectedValues = newValue.map((option) => option.communityId);
      }
    }

    setFormsix((prevValues) => ({
      ...prevValues,
      [fieldName]: selectedValues,
    }));
  };
  const handleinput = (e) => {
    const { value, name } = e.target;
    const parsedValue =
      name === "profession" || "annualIncomeRangeEnd" ? parseInt(value) : value;
    setFormsix((log) => ({
      ...log,
      [name]: parsedValue,
    }));
  };
  // const { country, state, city } = formsix;
  // const workingpreferenceData = [
  //   "Private Company",
  //   "Public / Government Sector",
  //   "Business / Self Employed",
  //   "Homemaker",
  // ];
  const maritalData = [
    "single",
    "divorcee",
    "awaitingdivorce",
    "widoworwidower",
  ];
  const displayTextMapping = {
    single: "Single",
    divorcee: "Divorcee",
    awaitingdivorce: "Awaiting Divorce",
    widoworwidower: "Widow or Widower",
  };

  const handleDietChange = (option, checked) => {
    setFormsix((prevForm) => {
      const dietTypeArray = Array.isArray(prevForm.dietType)
        ? prevForm.dietType
        : [];
      const updatedDiet = checked
        ? [...dietTypeArray, option]
        : dietTypeArray.filter((item) => item !== option);

      return {
        ...prevForm,
        dietType: updatedDiet,
      };
    });
  };

  //  console.log("formsix hai ye", formsix);

  // const handleSelectAllReduce = (e) => {
  //   const checked = e.target.checked;
  //   dispatch(setSelectAll(checked));
  // };
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
    getEducation();
    getCommunityData();
    getProfession();
    getDiet();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = await getFormData(userId, page);
        // console.log({ formData });
        const partnerPreference = formData.partnerPreference;
        setFormsix(partnerPreference);
        setFormsix((prev) => ({
          ...prev,
          annualIncomeValue: partnerPreference.annualIncomeRangeStart,
        }));
        // console.log(partnerPreference);
        if (partnerPreference.maritalStatus.length == 51) {
          // setSelectAll(true);
          setSelectAllMaritalStatus(true);
        }
        if (partnerPreference.education.length == 13) {
          setSelectAllEducation(true);
        }
        // if (partnerPreference.workingpreference.length == 80)
        // {
        //   setSelectWorkingPreference(true);
        // }
        if (partnerPreference?.diet?.length == 13) {
          setSelectDiet(true);
        }
        const countries = await getCountries();
        const mappedCountries = countries.map((item) => ({
          countryName: item.country_name,
          countryId: item.country_id,
          countryCode: item.country_code,
        }));
        setCountry(mappedCountries);

        if (partnerPreference.country) {
          // console.log("hello");
          const stateId = partnerPreference.state;
          const states = await fetchStatesByIds(stateId);
          const mappedStates = states.map((item) => ({
            stateName: item.state_name,
            stateId: item.state_id,
          }));
          setState(mappedStates);

          if (partnerPreference.state) {
            const stateId = partnerPreference.state;
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
  }, [userId]);


  // useEffect(() => {
  //   const loadStates = async () => {
  //     if (formsix.state && formsix.state.length > 0) {
  //       const fetchedStates = await fetchStatesByIds(formsix.state);
  //       setStateOptions(fetchedStates);
  //     }
  //   };

  //   loadStates();
  // }, [formsix.state]);

  // useEffect(() => {
  //   const loadCities = async () => {
  //     if (formsix.city && formsix.city.length > 0) {
  //       const fetchedCities = await fetchCitiesByIds(formsix.city);
  //       setCityOptions(fetchedCities);
  //     }
  //   };

  //   loadCities();
  // }, [formsix.city]);
  // console.log("profession",profession)
  return (
    <>
      <div className="bg-[#FCFCFC] sm:mx-6 md:mx-0 md:px-9 px-5 sm:px-6 py-12 rounded-xl shadow ">
        <label htmlFor="name" className="font-semibold mb-1 mt-3 text-[25px]">
          Partner Preference
        </label>
        <div className=" mb-2 mt-5">
          <label className="font-semibold mt-2 ">
            Age Range{" "}
            <span className="font-normal text-[#414141]">(Optional)</span>
          </label>
          <CustomSlider
            getAriaLabel={() => "Minimum distance shift"}
            value={[formsix.ageRangeStart, formsix.ageRangeEnd]}
            onChange={handleAge}
            valueLabelDisplay="auto"
            className="mt-12 "
            minValue={21}
            maxValue={75}
            aria-label="pretto slider"
            getAriaValueText={valuetext}
            disableSwap
          />
        </div>

        <div className=" mb-2 mt-5">
          <label className="font-semibold mt-2 ">
            {" "}
            Height Range{" "}
            <span className="font-normal text-[#414141]">(Optional)</span>
          </label>
          <CustomSlider
            getAriaLabel={() => "Height range slider"}
            value={[formsix.heightRangeStart, formsix.heightRangeEnd]}
            onChange={handleHeight}
            valueLabelDisplay="auto"
            className="mt-12 mb-3"
            aria-label="Height range slider"
            getAriaValueText={valuetext}
            disableSwap
            minValue={4.0}
            maxValue={7.0}
            step={0.1}
          />
        </div>
        <div className=" mb-2">
          <label htmlFor="hscope" className="font-semibold ">
            Marital Status 
          </label>
          <span className="flex flex-col justify-start items-start mx-5">
            <span className="flex flex-row items-center" key="selectAll">
              <input
                type="checkbox"
                name="maritalStatus"
                id="selectAll"
                className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                checked={selectAllMaritalStatus} 
                onChange={(e) => handleSelectAllChange(e, "maritalStatus")}
              />
              <label htmlFor="maritalStatus" className="px-3 font-DMsans">
                Open to all
              </label>
            </span>
          </span>
          <span className="flex flex-col justify-start items-start mx-5">
            {maritalData.map((option, index) => (
              <span className="flex flex-row items-center" key={index}>
                <input
                     className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                  type="checkbox"
                  name={`maritalStatus${index}`}
                  id={`maritalStatus${index}`}
                  checked={formsix.maritalStatus.includes(option)}
                  value={option}
                  onChange={(e) =>
                    handleCheckboxChange(e, option, "maritalStatus")
                  }
                />
                <label
                  htmlFor={`maritalStatus${index}`}
                  className="px-3 font-DMsans"
                >
                   {displayTextMapping[option]}
                </label>
              </span>
            ))}
          </span>
        </div>
        <div className="mt-5">
          <span className="font-semibold ">
            Community <span className="text-primary">*</span>
          </span>
          <div className="mt-5">
            <Autocomplete
              multiple
              onChange={(event, newValue) =>
                handleCommunityChange(event, newValue, "community")
              }
              options={[
                // { communityId: "all", communityName: "Open to all" },
                ...community,
              ]}
              value={community.filter(
                (option) =>
                  formsix.community &&
                  formsix.community.includes(option.communityId)
              )}
              getOptionLabel={(option) => option.communityName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Community"
                  InputLabelProps={{
                    shrink:
                      isFocused ||
                      (formsix.community && formsix.community.length > 0),
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
          <span className="font-semibold  text-black  ">Location </span>
          <p className="my-2 mb-4 font-DMsans font-medium">
            Country <span className="text-primary">*</span>
          </p>
          <div className="mt-3">
          <Autocomplete
  onChange={(event, newValue) => {
    if (newValue && newValue.some((option) => option.countryId === "open_to_all")) {
      handleSelectChange(event, "Open to all", "country");
    } else {
      handleSelectChange(
        event,
        newValue ? newValue.map((option) => option.countryId) : [],
        "country"
      );
    }
  }}
  multiple
  options={[
    // { countryId: "open_to_all", countryName: "Open to all" },
   ...country]}
  value={
    formsix.country === "Open to all"
      ? [{ countryId: "open_to_all", countryName: "Open to all" }]
      : country.filter(
          (option) =>
            formsix.country && formsix.country.includes(option.countryId)
        )
  }
  // getOptionLabel={(option) =>
  //   option.countryId === "open_to_all" ? "Open to all" : option.countryName
   
  // }
  getOptionLabel={(option) => option.countryName}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Country"
      InputLabelProps={{
        shrink: !!(
          formsix.country &&
          formsix.country.length
          //  &&
          // formsix.country !== "Open to all"
        ) || params.inputProps?.value,
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      // disabled={formsix.country === "Open to all"}
      sx={{
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
              handleSelectChange(
                event,
                newValue ? newValue.map((option) => option.stateId) : [],
                "state"
              )
            }
            multiple
            options={state}
            value={state.filter(
              (option) =>
                formsix.state && formsix.state.includes(option.stateId)
            )}
            getOptionLabel={(option) => option.stateName}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State"
                InputLabelProps={{
                  shrink:
                    !!(formsix.state && formsix.state.length) ||
                    params.inputProps?.value,
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={
                  formsix.country && formsix.country.includes("open_to_all")
                } // Disable when "Open to all" is selected
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
{/* 
        <div className="mt-6">
          <Autocomplete
            onChange={(event, newValue) =>
              handleSelectChange(
                event,
                newValue ? newValue.map((option) => option.cityId) : [],
                "city"
              )
            }
            multiple
            options={city}
            value={city.filter(
              (option) => formsix.city && formsix.city.includes(option.cityId)
            )}
            getOptionLabel={(option) => option.cityName}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                InputLabelProps={{
                  shrink:
                    !!(formsix.city && formsix.city.length) ||
                    params.inputProps?.value,
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={
                  formsix.country && formsix.country.includes("open_to_all")
                }
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "none",
                    },
                }}
              />
            )}
          />
        </div> */}

        <div className=" mb-2 mt-5">
          <label className="font-semibold ">
            Education <span className="text-primary">*</span>
          </label>
          <span className="flex flex-col justify-start items-start mx-5 mt-3 mb-3">
            <span className="flex flex-col justify-start items-start ">
              <span className="flex flex-row items-center" key="selectAll">
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAllEducation"
                  className="p-2 bg-[#F0F0F0] mt-1 h-20"
                  checked={selectAllEducation} // Make sure you have a state variable for selectAll
                  onChange={(e) => handleSelectAllChange(e, "education")}
                />
                <label
                  htmlFor="selectAllEducation"
                  className="px-3 font-DMsans"
                >
                  Open to all
                </label>
              </span>
            </span>
            {education.map((eduOption, index) => (
              <span className="flex flex-row items-center" key={index}>
                <input
                  className="p-2 bg-[#F0F0F0] mt-1 h-20"
                  type="checkbox"
                  name={`education${index}`}
                  id={`education${index}`}
                  checked={formsix.education.includes(eduOption.educationId)}
                  value={eduOption.educationId}
                  onChange={(e) =>
                    handleCheckboxChange(e, eduOption.educationId, "education")
                  }
                />
                <label
                  htmlFor={`education${index}`}
                  className="px-3 font-DMsans"
                >
                  {eduOption.educationName}
                </label>
              </span>
            ))}
          </span>
        </div>

        <div className=" mb-2 mt-8">
          <label className="font-semibold mt-2 ">
            Profession <span className="text-primary">*</span>
          </label>
          <div className="mt-3">
          <Autocomplete
              multiple // make the selection multiple
              onChange={handleProfessionChange}
            
              value={
                formsix.profession.
                includes("Open to all")
                  ? ["Open to all"]
                  :profession.filter((option) =>
                      formsix.profession.includes(option.id)
                    )
              }
              options={profession}
              getOptionLabel={(option) =>
                // option === "Open to all" ? option :
                 option.name
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Profession"
                  InputLabelProps={{
                    shrink: isFocused || formsix.profession.length > 0,
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none", // Remove border when focused
                      },
                  }
                  }
                />
              )}
              // renderOption={(props, option) => (
              //   <li {...props}>
              //     <span>
              //       {option === "Open to all" ? "Open to all" : option.name}
              //     </span>{" "}
              //     {/* Adjusted to display profession name */}
              //   </li>
              //)}
            />
          </div>
        </div>

        <div className=" mb-2 mt-5">
          <label className="font-semibold ">
            Diet Type <span className="text-primary">*</span>
          </label>
          <span className="flex flex-col justify-start items-start mx-5 mt-3 mb-3">
            <span className="flex flex-col justify-start items-start ">
              <span className="flex flex-row items-center" key="selectAll">
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAllDiet"
                  className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                  checked={selectDiet} // Make sure you have a state variable for selectAll
                  onChange={(e) => handleSelectAllChange(e, "dietType")}
                />
                <label htmlFor="selectAllDiet" className="px-3 font-DMsans">
                  Open to all
                </label>
              </span>
            </span>
            {diet.map((dietOption, index) => (
              <span className="flex flex-row items-center" key={index}>
                <input
                  className="p-2 bg-[#F0F0F0] mt-1 h-20"
                  type="checkbox"
                  name={`diet${index}`}
                  id={`diet${index}`}
                  value={dietOption.dietId}
                  checked={formsix?.dietType?.includes(dietOption.dietId)}
                  onChange={(e) =>
                    handleDietChange(dietOption.dietId, e.target.checked)
                  }
                />
                <label htmlFor={`diet${index}`} className="px-3 font-DMsans">
                  {dietOption.dietName}
                </label>
              </span>
            ))}
          </span>
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
            onClick={handleNext}
            className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
          >
            Submit
          </Link>
        </div>
      </div>
    </>
  );
};

export default Form6;
