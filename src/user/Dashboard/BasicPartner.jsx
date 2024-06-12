import { useEffect, useState } from "react";
import { pro } from "../../DummyData/prof";
import { FiEdit } from "react-icons/fi";
import CustomSlider from "../../components/CustomSlider";
import {
  getCitiesByState,
  getCountries,
  getMasterData,
  getStatesByCountry,
} from "../../common/commonFunction";

import { useDispatch, useSelector } from "react-redux";
import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import { getFormData, getUser } from "../../Stores/service/Genricfunc";
import { toast } from "react-toastify";
import apiurl from "../../util";
import { Autocomplete, TextField } from "@mui/material";
import BasicDetail from "../Edit/BasicDetail";
const minDistance = 3;
function valuetext(value) {
  return `${value}°C`;
}
const BasicPartnerEdit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copen, setIsCopen] = useState(false);
  const [lopen, setIsLopen] = useState(false);
  const [carrerOpen, setCarrerOpen] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [selectAllEducation, setSelectAllEducation] = useState(false);
  const [selectWorkingPreference, setSelectWorkingPreference] = useState(false);
  const [selectDiet, setSelectDiet] = useState(false);

  const [selectAllMaritalStatus, setSelectAllMaritalStatus] = useState(false);
  const [basicDetails, setBasicDetails] = useState({
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
  const [isFormSixData, setIsFormSixData] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [community, setCommunity] = useState([]);
  const [education, setEducation] = useState([]);
  const [profession, setProfession] = useState([]);
  const [diet, setDiet] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [basicData, setBasicData] = useState([]);
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Function to handle blur
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleAge = (event, newValues, activeThumb) => {
    if (!Array.isArray(newValues)) {
      return;
    }

    const [newValueStart, newValueEnd] = newValues;

    if (activeThumb === 0) {
      setBasicDetails((prevForm) => ({
        ...prevForm,
        ageRangeStart: Math.min(
          newValueStart,
          prevForm.ageRangeEnd - minDistance
        ),
      }));
    } else {
      setBasicDetails((prevForm) => ({
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

    setBasicDetails((prevForm) => ({
      ...prevForm,
      heightRangeStart: newValueStart,
      heightRangeEnd: newValueEnd,
    }));
  };

  const handleCheckboxChange = (e, option, field, id) => {
    const { checked } = e.target;

    if (id === -1) {
      // Set all values in the field to checked or unchecked based on the 'checked' value
      setBasicDetails((prevForm) => ({
        ...prevForm,
        [field]: checked ? option : [],
      }));
    } else {
      if (checked) {
        // Add the selected option to the corresponding field in the basicDetails state
        setBasicDetails((prevForm) => ({
          ...prevForm,
          [field]: Array.isArray(prevForm[field])
            ? [...prevForm[field], option]
            : prevForm[field] == undefined
            ? [option]
            : [...stringToArray(prevForm[field]), option],
        }));
      } else {
        // console.log(basicDetails, field);

        // Remove the unselected option from the corresponding field in the basicDetails state
        setBasicDetails((prevForm) => ({
          ...prevForm,
          [field]: Array.isArray(prevForm[field])
            ? prevForm[field].filter((item) => item !== option)
            : stringToArray(prevForm[field]).filter((item) => item !== option),
        }));
      }
    }
  };
  function arrayToString(arr) {
    return arr.join(", ");
  }
  function stringToArray(str) {
    return str.split(", ").map((item) => item.trim());
  }

  const handleProfessionChange = (event, values) => {
    if (values.includes("Open to all")) {
      // If "Open to all" is selected, set the state to include all options
      setBasicDetails((prevValues) => ({
        ...prevValues,
        profession: profession.map((option) => option.id),
      }));
    } else {
      // If other options are selected, set the state to include those options
      setBasicDetails((prevValues) => ({
        ...prevValues,
        profession: values.map((value) => value.id),
      }));
    }
  };
  const handleAnnualIncome = (event, newValues, activeThumb) => {
    if (!Array.isArray(newValues)) {
      return;
    }

    const [newValueStart, newValueEnd] = newValues;

    if (activeThumb === 0) {
      setBasicDetails((prevForm) => ({
        ...prevForm,
        annualIncomeRangeStart: Math.min(
          newValueStart,
          prevForm.annualIncomeRangeEnd - minDistance
        ),
      }));
    } else {
      setBasicDetails((prevForm) => ({
        ...prevForm,
        annualIncomeRangeEnd: Math.max(
          newValueEnd,
          prevForm.annualIncomeRangeStart + minDistance
        ),
      }));
    }
  };
  const handleSelectAllChange = (e, name) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      if (name === "maritalStatus") {
        setBasicDetails((prevForm) => ({
          ...prevForm,
          maritalStatus: maritalData.map((val) => val).join(", "), // Select all options as comma-separated string
        }));
        setSelectAllMaritalStatus(true);
      } else if (name === "education") {
        setBasicDetails((prevForm) => ({
          ...prevForm,
          education: education.map((val) => val.educationId).join(", "), // Select all options as comma-separated string
        }));
        setSelectAllEducation(true);
      } else if (name === "workingpreference") {
        setBasicDetails((prevForm) => ({
          ...prevForm,
          workingpreference: workingpreferenceData.join(", "), // Select all options as comma-separated string
        }));
        setSelectWorkingPreference(true);
      } else if (name === "dietType") {
        setBasicDetails((prevForm) => ({
          ...prevForm,
          dietType: diet.map((val) => val.dietId).join(", "), // Select all options as comma-separated string
        }));
        setSelectDiet(true);
      }
    } else {
      if (name === "maritalStatus") {
        setBasicDetails((prevForm) => ({
          ...prevForm,
          maritalStatus: "", // Deselect all options
        }));
        // setSelectAll(false);
        setSelectAllMaritalStatus(false);
      } else if (name === "education") {
        setBasicDetails((prevForm) => ({
          ...prevForm,
          education: "", // Deselect all options
        }));
        setSelectAllEducation(false);
      } else if (name === "workingpreference") {
        setBasicDetails((prevForm) => ({
          ...prevForm,
          workingpreference: "", // Deselect all options
        }));
        setSelectWorkingPreference(false);
      } else if (name === "dietType") {
        setBasicDetails((prevForm) => ({
          ...prevForm,
          dietType: "", // Deselect all options
        }));
        setSelectDiet(false);
      }
    }
  };
  const getEducation = async () => {
    const response = await getMasterData("education");
    let education = response.map((item) => ({
      educationId: item.education_id,
      educationName: item.education_name,
    }));
    setEducation(education);
  };
  console.log(education);

  const handleCommunityChange = (event, newValue, fieldName) => {
    let selectedValues = "";

    if (newValue) {
      if (newValue.some((option) => option.communityId === "all")) {
        // If "Open to all" is selected, select all communities
        selectedValues = community.map((option) => option.communityId);
      } else {
        // If other option(s) are selected, include them
        selectedValues = newValue.map((option) => option.communityId);
      }
    }

    setBasicDetails((prevValues) => ({
      ...prevValues,
      [fieldName]: selectedValues,
    }));
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
      console.error("Error fetching community data:", error);
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
      console.error("Error fetching profession data:", error);
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

  const handleannualIncomeRange = (event, newValues, activeThumb) => {
    if (!Array.isArray(newValues)) {
      return;
    }

    const [newValueStart, newValueEnd] = newValues;

    if (activeThumb === 0) {
      setBasicDetails((prevForm) => ({
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
      setBasicDetails((prevForm) => ({
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

    if (!basicDetails.country) {
      errors.country = "Country is required";
      hasErrors = true;
    }
    if (
      !basicDetails.maritalStatus ||
      basicDetails.maritalStatus.length === 0
    ) {
      errors.maritalStatus = "Marital Status is required";
      hasErrors = true;
    }
    if (!basicDetails.community || basicDetails.community.length === 0) {
      errors.community = "community is required";
      hasErrors = true;
    }
    if (!basicDetails.dietType || basicDetails.dietType.length === 0) {
      errors.dietType = "Diet is required";
      hasErrors = true;
    }
    if (!basicDetails?.profession || basicDetails?.community?.length === 0) {
      errors.profession = "Profession is required";
      hasErrors = true;
    }
    if (!basicDetails.education || basicDetails.community.length === 0) {
      errors.education = "Education is required";
      hasErrors = true;
    }

    // if (!basicDetails.annualIncomeValue) {
    //   errors.annualIncomeValue = "Annual Income is required";
    //   hasErrors = true;
    // }

    setFormErrors(errors);
    return !hasErrors;
  };

  const handleSubmitForm6 = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      setIsOpen((prev) => prev);
      setIsCopen((prev) => prev);
      setIsLopen((prev) => prev);
      setCarrerOpen((prev) => prev);
      return;
    }
    try {
      let strFormSix = { ...basicDetails };

      // console.log("data", basicDetails.country, basicDetails.state, basicDetails.city);
      // console.log("string", strFormSix);
      //  const countryStr = basicDetails?.country?.join(",") || ""
      //  const stateStr = basicDetails?.state?.join(",") || ""
      //  const cityStr = basicDetails?.city?.join(",") || ""

      //  strFormSix.country = countryStr
      //  strFormSix.state = stateStr
      //  strFormSix.city= cityStr
      if (Array.isArray(basicDetails.state)) {
        strFormSix.state = basicDetails.state.join(",");
      }
      if (Array.isArray(basicDetails.city)) {
        strFormSix.city = basicDetails.city.join(",");
      }
      if (Array.isArray(basicDetails.country)) {
        strFormSix.country = basicDetails.country.join(",");
      }
      if (Array.isArray(basicDetails.community)) {
        strFormSix.community = basicDetails.community.join(",");
      }

      const response = await apiurl.post(`/user-data/${userId}?page=6`, {
        partnerPreference: { ...strFormSix },
      });
      toast.success(response.data.message);
      fetchData()
      dispatch(setUser({ userData: { ...response.data.user } }));
      setIsOpen((prev) => !prev);
      setIsCopen((prev) => !prev);
      setIsLopen((prev) => !prev);
      setCarrerOpen((prev) => !prev);
      // console.log(response.data);
    } catch (error) {
      toast.error("something went wrong", error);
      // console.error("Error fetching cities:", error);
      return [];
    }
  };

  // const handleNext = async () => {
  //   if (!validateForm()) {
  //     toast.error("Please fill in all required fields.");
  //     return;
  //   }
  //   await handleSubmitForm6();
  //   navigate("/form-submitted");

  //   // navigate(`/registration-form/${parseInt(page) + 1}`);
  // };
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

  // const handleBlurError = (e) => {
  //   const { value, name } = e.target;
  //   const errors = { ...formErrors };

  //   // Validate the input field when it loses focus
  //   if (!value.trim()) {
  //     errors[name] = `${customErrorMessages[name]} is required !`;
  //   } else {
  //     errors[name] = ""; // Clear the error message if the field is not empty
  //   }

  //   setFormErrors(errors);
  // };
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
  //       getCitiesByState(basicDetabasicDetails.country, values)
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

  const handleSelectChange = (event, values, field) => {
    if (values === "Open to all") {
      if (field === "country") {
        setBasicDetails((prevValues) => ({
          ...prevValues,
          country: country.map((option) => option.countryId),
          state: "",
          city: "",
        }));
        setState([]);
        setCity([]);
      } else if (field === "state") {
        setBasicDetails((prevValues) => ({
          ...prevValues,
          state: "",
          city: "",
        }));
        setCity([]);
      }
    } else {
      setBasicDetails((prevValues) => ({
        ...prevValues,
        [field]: values,
      }));
      if (field === "country") {
        setBasicDetails((prevValues) => ({
          ...prevValues,
          country: values,
          state: "",
          city: "",
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
        setBasicDetails((prevValues) => ({
          ...prevValues,
          state: values,
          city: "",
        }));
        getCitiesByState(basicDetails.state, values).then((cities) => {
          setCity(
            cities.map((item) => ({
              cityName: item.city_name,
              cityId: item.city_id,
            }))
          );
        });
        // .catch((error) => console.error("Error fetching cities:", error));
      } else if (field === "city") {
        // Add this condition
        setBasicDetails((prevValues) => ({
      
          ...prevValues,
          city: values,
        }));
      }
    }
  };
  const handleinput = (e) => {
    const { value, name } = e.target;
    const parsedValue =
      name === "profession" || "annualIncomeRangeEnd" ? parseInt(value) : value;
    setBasicDetails((log) => ({
      ...log,
      [name]: parsedValue,
    }));
  };
  // const { country, state, city } = basicDetails;
  const workingpreferenceData = [
    "Private Company",
    "Public / Government Sector",
    "Business / Self Employed",
    "Homemaker",
  ];
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
    setBasicDetails((prevForm) => {
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
  const fetchStatesByIds = async (stateIds) => {
    // console.log(stateIds)
    try {
      const response = await apiurl.get(`/multiple-states?state=${stateIds}`);
      return response.data;
    } catch (error) {
      // console.error('Error fetching states:', error);
      throw error;
    }
  };
  const fetchCitiesByIds = async (cityIds) => {
    try {
      const response = await apiurl.get(`/muliple-cities?city=${cityIds}`)
      return response.data;
    } catch (error) {
      // console.error('Error fetching cities:', error);
      throw error;
    }
  };
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
      .catch((error) => console.error("Error fetching countries:", error));

    getCommunityData();
    getProfession();
    getDiet();
  }, []);

  useEffect(() => {
    getEducation();
    fetchCitiesByIds();
  }, []);

    const fetchData = async () => {
      try {
        const formData = await getFormData(userId, 6);
        console.log({ formData }, "makj");
        const partnerPreference = formData.partnerPreference;
        console.log(partnerPreference, "malk")
        setBasicDetails(partnerPreference);
        setBasicData(partnerPreference)
        console.log(basicDetails)
        setBasicDetails((prev) => ({
          ...prev,
          annualIncomeValue: partnerPreference.annualIncomeRangeStart,
        }));
        // console.log(partnerPreference.workingpreference.length)
        if (partnerPreference.maritalStatus?.length == 51) {
          setSelectAll(true);
        }
        if (partnerPreference.education?.length == 13) {
          setSelectAllEducation(true);
        }
        // if (partnerPreference.workingpreference?.length == 80)
        // {
        //   setSelectWorkingPreference(true)
        // }
        if (partnerPreference.diet?.length == 13) {
          setSelectDiet(true);
        }
        const countries = await getCountries();
        const mappedCountries = countries.map((item) => ({
          countryName: item.country_name,
          countryId: item.country_id,
          countryCode: item.country_code,
        }));
        setCountry(mappedCountries);

        if (partnerPreference.state) {
          const stateId = partnerPreference.state;
          const states = await fetchStatesByIds(stateId);
          const mappedStates = states.map((item) => ({
            stateName: item.state_name,
            stateId: item.state_id,
          }));
          setState(mappedStates);

          if (partnerPreference.city) {
            const cityId = partnerPreference.city;
            const cities = await fetchCitiesByIds(cityId);
            const mappedCities = cities.map((item) => ({
              cityName: item.city_name,
              cityId: item.city_id,
            }));
            setCity(mappedCities);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <>
      <div className="shadow rounded-xl md:mx-52 py-2  my-5 mt-36 mx-6">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">Basic Details</p>
          <span
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-[20px] cursor-pointer flex items-center font-DMsans"
          >
            {!isOpen ? (
              <>
                <FiEdit />
                <span className=" px-3 text-[14px]">Edit</span>{" "}
              </>
            ) : (
              ""
            )}
          </span>
        </span>
        <hr className="mx-9" />
        <span className="flex flex-row  items-baseline gap-80 font-DMsans px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium">Age Range</p>
            <p className=" font-light">
              {basicData.ageRangeStart}yrs - {basicData.ageRangeEnd}yrs
            </p>

            <p className=" pt-4 font-medium"> Height</p>
            <p className=" font-light">
              {basicData.heightRangeStart}ft - {basicData.heightRangeEnd}
              ft
            </p>
          </span>
          <span className="text-[14px] mt-4">
            <p className="  font-medium"> Marital Status</p>
            <p className=" font-light">{basicData.maritalStatus}</p>
          </span>
        </span>

        {isOpen && (
          <>
            <span className="flex flex-col  items-baseline justify-between gap-36 font-DMsans px-10 text-start pb-8">
              <span className="w-full">
                {" "}
                <div className=" mb-2 mt-5">
                  <label className="font-semibold mt-2 ">Age Range</label>
                  <CustomSlider
                    getAriaLabel={() => "Minimum distance shift"}
                    value={[
                      basicDetails.ageRangeStart,
                      basicDetails.ageRangeEnd,
                    ]}
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
                  <label className="font-semibold mt-2 "> Height Range</label>
                  <CustomSlider
                    getAriaLabel={() => "Height range slider"}
                    value={[
                      basicDetails.heightRangeStart,
                      basicDetails.heightRangeEnd,
                    ]}
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
                    Marital Status <span className="text-primary">*</span>
                  </label>
                  <span className="flex flex-col justify-start items-start mx-5">
                    <span
                      className="flex flex-row items-center"
                      key="selectAll"
                    >
                      <input
                        type="checkbox"
                        name="maritalStatus"
                        id="selectAll"
                        className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                        checked={selectAllMaritalStatus}
                        onChange={(e) =>
                          handleSelectAllChange(e, "maritalStatus")
                        }
                      />
                      <label
                        htmlFor="maritalStatus"
                        className="px-3 font-DMsans"
                      >
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
                          checked={basicDetails.maritalStatus.includes(option)}
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
                  handleSubmitForm6();
                
                }}
                className="bg-primary text-white px-7 rounded-md py-2 cursor-pointer"
              >
                Save
              </span>
            </div>
          </>
        )}
      </div>
      <div className="shadow rounded-xl md:mx-52 mx-6 py-3 mt-9 my-5">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">Community</p>
          <span
            onClick={() => setIsCopen((prev) => !prev)}
            className="text-[20px] cursor-pointer flex items-center font-DMsans"
          >
            {!copen ? (
              <>
                <FiEdit />
                <span className=" px-3 text-[14px]">Edit</span>{" "}
              </>
            ) : (
              ""
            )}
          </span>
        </span>
        <hr className="mx-9" />
        <span className="flex flex-row  items-baseline gap-80 font-DMsans px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium">Community</p>

            <p className=" font-light">
              {basicDetails?.communityTypes == 0
                ? "Not disclosed"
                : basicDetails?.communityTypes}
            </p>
          </span>
        </span>

        {copen && (
          <>
            <span className="flex flex-col  items-baseline justify-between gap-36 font-DMsans px-10 text-start pb-8">
              <div className=" mb-2 mt-5">
                <label className="font-semibold mt-2 "> Community <span className="text-primary">*</span></label>
                <div className="flex space-x-2 mb-2 mt-2">
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
                        basicDetails.community &&
                        basicDetails.community.includes(option.communityId)
                    )}
                    getOptionLabel={(option) => option.communityName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Community"
                        InputLabelProps={{
                          shrink:
                            isFocused ||
                            (basicDetails.community &&
                              basicDetails.community.length > 0),
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
            </span>

            <div className="flex items-center justify-end gap-5 mx-9 mb-9 font-DMsans">
              <span
                onClick={() => setIsCopen((prev) => !prev)}
                className="border border-primary text-primary px-5 rounded-md py-2 cursor-pointer"
              >
                Cancel
              </span>
              <span
                onClick={() => {
                  handleSubmitForm6();
                
                }}
                className="bg-primary text-white px-7 rounded-md py-2 cursor-pointer"
              >
                Save
              </span>
            </div>
          </>
        )}
      </div>

      <div className="shadow rounded-xl md:mx-52 mx-6 py-3 mt-9 my-5">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">Location Details</p>
          <span
            onClick={() => setIsLopen((prev) => !prev)}
            className="text-[20px] cursor-pointer flex items-center font-DMsans"
          >
            {!lopen ? (
              <>
                <FiEdit />
                <span className=" px-3 text-[14px]">Edit</span>{" "}
              </>
            ) : (
              ""
            )}
          </span>
        </span>
        <hr className="mx-9" />
        <span className="flex flex-row  items-baseline gap-28 font-DMsans px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium">Country</p>
            <p className=" font-light">{basicData.countryTypes}</p>
          </span>
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium pt-3">State</p>
            <p className=" font-light">{basicData.stateTypes}</p>
            {/*        
            <p className=" font-light">{basicData.citytype}</p> */}
          </span>

          <span className=" mt-4  text-[14px]">
            <p className="  font-medium pt-3">City</p>
            <p className=" font-light">{basicData?.cityTypes}</p>
            {/*        
            <p className=" font-light">{basicData.citytype}</p> */}
          </span>
        </span>

        {lopen && (
          <>
            <span className="flex flex-col  items-baseline justify-between gap-36 font-DMsans px-10 text-start pb-8">
              <span className="w-full">
                <div className="mt-6">
                  <span className="font-semibold  text-black  ">Location</span>
                  <p className="  font-medium  text-[16px] mb-3">
              Country <span className="text-primary">*</span>
            </p>
                  <div className="mt-3">
                    <Autocomplete
                      onChange={(event, newValue) => {
                        if (
                          newValue &&
                          newValue.some(
                            (option) => option.countryId === "open_to_all"
                          )
                        ) {
                          handleSelectChange(event, "Open to all", "country");
                        } else {
                          handleSelectChange(
                            event,
                            newValue
                              ? newValue.map((option) => option.countryId)
                              : [],
                            "country"
                          );
                        }
                      }}
                      multiple
                      options={[
                        // { countryId: "open_to_all", countryName: "Open to all" },
                        ...country,
                      ]}
                      value={
                        basicDetails.country === "Open to all"
                          ? [
                              {
                                countryId: "open_to_all",
                                countryName: "Open to all",
                              },
                            ]
                          : country.filter(
                              (option) =>
                                basicDetails.country &&
                                basicDetails.country.includes(option.countryId)
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
                            shrink:
                              !!(
                                (
                                  basicDetails.country &&
                                  basicDetails.country.length
                                )
                                //  &&
                                // basicDetails.country !== "Open to all"
                              ) || params.inputProps?.value,
                          }}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          // disabled={basicDetails.country === "Open to all"}
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
                      handleSelectChange(
                        event,
                        newValue
                          ? newValue.map((option) => option.stateId)
                          : [],
                        "state"
                      )
                    }
                    multiple
                    options={state}
                    value={state.filter(
                      (option) =>
                        basicDetails.state &&
                        basicDetails.state.includes(option.stateId)
                    )}
                    getOptionLabel={(option) => option.stateName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        InputLabelProps={{
                          shrink:
                            !!(
                              basicDetails.state && basicDetails.state.length
                            ) || params.inputProps?.value,
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={
                          basicDetails.country &&
                          basicDetails.country.includes("open_to_all")
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
              (option) =>basicDetails.city &&basicDetails.city.includes(option.cityId)
            )}
            getOptionLabel={(option) => option.cityName}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                InputLabelProps={{
                  shrink:
                    !!(basicDetails.city &&basicDetails.city.length) ||
                    params.inputProps?.value,
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={
                 basicDetails.country &&basicDetails.country.includes("open_to_all")
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
        </div> 
        </span>
        </span>
            <div className="flex items-center justify-end gap-5 mx-9 mb-9 font-DMsans">
              <span
                onClick={() => setIsLopen((prev) => !prev)}
                className="border border-primary text-primary px-5 rounded-md py-2 cursor-pointer"
              >
                Cancel
              </span>
              <span
                onClick={() => {
                  handleSubmitForm6();
                
                }}
                className="bg-primary text-white px-7 rounded-md py-2 cursor-pointer"
              >
                Save
              </span>
            </div>
          </>
        )}
      </div>

      <div className="shadow rounded-xl md:mx-52 mx-6 py-3 mt-9 my-5">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">Career Details</p>
          <span
            onClick={() => {
              setCarrerOpen((prev) => !prev);
            }}
            className="text-[20px] cursor-pointer flex items-center font-DMsans"
          >
            {!carrerOpen ? (
              <>
                <FiEdit />
                <span className=" px-3 text-[14px]">Edit</span>{" "}
              </>
            ) : (
              ""
            )}
          </span>
        </span>
        <hr className="mx-9" />
        <span className="flex flex-row  items-baseline gap-80 font-DMsans px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium">Education</p>
            <p className=" font-light">{basicDetails.educationTypes}</p>

            {/* <p className="  font-medium pt-3">Working Prefernces</p>
            <p className=" font-light">{basicDetails.workingpreference}</p> */}
            <p className="  font-medium pt-3">Profession</p>
            <p className=" font-light">{basicDetails.professionTypes}</p>
          </span>
          <span className=" mt-4  text-[14px]">
            {/* <p className="  font-medium pt-3">Annual Income </p>
            <p className=" font-light">{basicDetails.annualIncomeRangeStart} </p> */}
            <p className="  font-medium pt-3">Diet Type</p>
            <p className=" font-light">
              {basicDetails.dietTypes || "Not Disclosed"}
            </p>
          </span>
        </span>

        {carrerOpen && (
          <>
            <span className="flex flex-col  items-baseline justify-between gap-36 font-DMsans px-10 text-start pb-8">
              <span className="w-full">
                <div className=" mb-2 mt-5">
                  <label className="font-semibold ">Education  <span className="text-primary">*</span></label>
                  <span className="flex flex-col justify-start items-start mx-5 mt-3 mb-3">
                    <span className="flex flex-col justify-start items-start ">
                      <span
                        className="flex flex-row items-center"
                        key="selectAll"
                      >
                        <input
                          type="checkbox"
                          name="selectAll"
                          id="selectAllEducation"
                          checked={selectAllEducation} // Make sure you have a state variable for selectAll
                          onChange={(e) =>
                            handleSelectAllChange(e, "education")
                          }
                        />
                        <label
                          htmlFor="selectAllEducation"
                          className="px-3 font-DMsans"
                        >
                          Select All
                        </label>
                      </span>
                    </span>
                    {education.map((eduOption, index) => (
                      <span className="flex flex-row items-center" key={index}>
                        <input
                          className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                          type="checkbox"
                          name={`education${index}`}
                          id={`education${index}`}
                          checked={basicDetails.education.includes(
                            eduOption.educationId
                          )}
                          value={eduOption.educationId}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              eduOption.educationId,
                              "education"
                            )
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

                {/* 
                <div className=" mb-2 mt-5">
                  <label className="font-semibold ">Working Preferance</label>
                  <span className="flex flex-col justify-start items-start mx-5 mt-3 mb-3">
                    <span className="flex flex-col justify-start items-start ">
                      <span className="flex flex-row items-center" key="selectAll">
                        <input
                          type="checkbox"
                          name="selectAll"
                          id="selectAll"
                          checked={selectWorkingPreference} // Make sure you have a state variable for selectAll
                          onChange={(e) => handleSelectAllChange(e, "workingpreference")}
                        />
                        <label htmlFor="selectAll" className="px-3 font-DMsans">
                          Select All
                        </label>
                      </span>
                    </span>
                    {workingpreferenceData.map((option, index) => (
                      <span className="flex flex-row items-center" key={index}>
                        <input
                          className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                          type="checkbox"
                          name={`workingpreference${ index }`} // Make sure each checkbox has a unique name
                          id={`workingpreference${ index }`}
                          checked={basicDetails.workingpreference.includes(option)}
                          value={option}
                          onChange={(e) =>
                            handleCheckboxChange(e, option, "workingpreference")
                          }
                        />
                        <label
                          htmlFor={`workingpreference${ index }`}
                          className="px-3 font-DMsans"
                        >
                          {option}
                        </label>
                      </span>
                    ))}
                  </span>
                </div> */}
                <div className=" mb-2 mt-8">
                  <label className="font-semibold mt-2 ">Profession  <span className="text-primary">*</span></label>
                  <div className="mt-3">
                    <Autocomplete
                      multiple // make the selection multiple
                      onChange={handleProfessionChange}
                      value={
                        basicDetails.profession.includes("Open to all")
                          ? ["Open to all"]
                          : profession.filter((option) =>
                              basicDetails.profession.includes(option.id)
                            )
                      }
                      options={profession}
                      getOptionLabel={(option) =>
                        option === "Open to all" ? option : option.name
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Profession"
                          InputLabelProps={{
                            shrink:
                              isFocused || basicDetails.profession.length > 0,
                          }}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          sx={{
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                              {
                                border: "none", // Remove border when focused
                              },
                          }}
                        />
                      )}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <span>
                            {option === "Open to all"
                              ? "open to all"
                              : option.name}
                          </span>{" "}
                          {/* Adjusted to display profession name */}
                        </li>
                      )}
                    />
                  </div>
                </div>
                <div className=" mb-2 mt-5">
                  {/* <label className="font-semibold mt-2 ">Annual Income</label> */}
                  {/* <CustomSlider
            getAriaLabel={() => "Minimum distance shift"}
            value={[basicDetails.annualIncomeRangeStart, basicData.annualIncomeRangeEnd]}
            onChange={handleAnnualIncome}
            valueLabelDisplay="auto"
            className="mt-12 "
            minValue={21}
            maxValue={75}
            aria-label="pretto slider"
            getAriaValueText={valuetext}
            disableSwap
          /> */}
                </div>
                <div className=" mb-2 mt-5">
                  <label className="font-semibold ">Diet Type  <span className="text-primary">*</span></label>
                  <span className="flex flex-col justify-start items-start mx-5 mt-3 mb-3">
                    <span className="flex flex-col justify-start items-start ">
                      <span
                        className="flex flex-row items-center"
                        key="selectAll"
                      >
                        <input
                          type="checkbox"
                          name="selectAll"
                          id="selectAllDiet"
                          className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                          checked={selectDiet} // Make sure you have a state variable for selectAll
                          onChange={(e) => handleSelectAllChange(e, "dietType")}
                        />
                        <label
                          htmlFor="selectAllDiet"
                          className="px-3 font-DMsans"
                        >
                          Select All
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
                          checked={basicDetails?.dietType?.includes(
                            dietOption.dietId
                          )}
                          onChange={(e) =>
                            handleDietChange(
                              dietOption.dietId,
                              e.target.checked
                            )
                          }
                        />
                        <label
                          htmlFor={`diet${index}`}
                          className="px-3 font-DMsans"
                        >
                          {dietOption.dietName}
                        </label>
                      </span>
                    ))}
                  </span>
                </div>
              </span>
            </span>

            <div className="flex items-center justify-end gap-5 mx-9 mb-9 font-DMsans">
              <span
                onClick={() => {
                  setCarrerOpen((prev) => !prev);
                }}
                className="border border-primary text-primary px-5 rounded-md py-2 cursor-pointer"
              >
                Cancel
              </span>
              <span
                onClick={() => {
                  handleSubmitForm6();
                 
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

export default BasicPartnerEdit;
