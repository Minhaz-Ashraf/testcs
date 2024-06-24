import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setStep, selectStepper } from "../../Stores/slices/Regslice";
import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getCitiesByState,
  getCountries,
  getStatesByCountry,
  getMasterData,
} from "../../common/commonFunction.js"; // Import your utility functions
import CustomSlider from "../../components/CustomSlider.jsx";
import { getFormData } from "../../Stores/service/Genricfunc.jsx";
import Header from "../../components/Header.jsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

const minDistance = 3;
function valuetext(value) {
  return `${value}°C`;
}

const AdvanceSearch = ({ page }) => {
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllEducation, setSelectAllEducation] = useState(false);
  const [selectWorkingPreference, setSelectWorkingPreference] = useState(false);
  const [selectDiet, setSelectDiet] = useState(false);
  const location = useLocation();
  const { basicSearchData } = location.state || {};
  const [countryOpen, setCountryOpen] = useState(false);

  console.log(basicSearchData);

  const [basicSearch, setBasicSearch] = useState({
    country: [],
    state: [],
    city: [],
    maritalStatus: "",
    education: "",

    smoking: [],
    community: [],
    profession: [],
    interests: [],

    alcohol: [],
    dietType: "",
    ageRangeStart: "",
    ageRangeEnd: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (basicSearchData) {
      setBasicSearch(basicSearchData);
    }
  }, [basicSearchData]);

  const { userId } = useSelector(userDataStore);
  const path = window.location.pathname;

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [community, setCommunity] = useState([]);
  const [education, setEducation] = useState([]);
  const [profession, setProfession] = useState([]);
  const [diet, setDiet] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [interests, setInterests] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (basicSearchData) {
      setBasicSearch(basicSearchData);
    }
  }, [basicSearchData]);

  // Function to handle focus
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
      setBasicSearch((prevForm) => ({
        ...prevForm,
        ageRangeStart: Math.min(
          newValueStart,
          prevForm.ageRangeEnd - minDistance
        ),
      }));
    } else {
      setBasicSearch((prevForm) => ({
        ...prevForm,
        ageRangeEnd: Math.max(
          newValueEnd,
          prevForm.ageRangeStart + minDistance
        ),
      }));
    }
  };

  const handleInput = (fieldName, values) => {
    if (values.includes("Open to all")) {
      if (fieldName === "smoking") {
        setBasicSearch((prevValues) => ({
          ...prevValues,
          smoking: smokingWithOpenToAll.filter(option => option !== "Open to all"),
        }));
      } else if (fieldName === "alcohol") {
        setBasicSearch((prevValues) => ({
          ...prevValues,
          alcohol: optionsWithOpenToAll.filter(option => option !== "Open to all"),
        }));
      }
    } else {
      setBasicSearch((prevValues) => ({
        ...prevValues,
        [fieldName]: values,
      }));
    }
  };
  

  const handleHeight = (event, newValues, activeThumb) => {
    if (!Array.isArray(newValues)) {
      return;
    }

    const [newValueStart, newValueEnd] = newValues;

    setBasicSearch((prevForm) => ({
      ...prevForm,
      heightRangeStart: newValueStart,
      heightRangeEnd: newValueEnd,
    }));
  };

  const getInterestData = async () => {
    const data = await getMasterData("interest");
    setInterests(
      data.map((item) => ({
        InterestId: item.intrest_id,
        InterestName: item.intrest_name,
      }))
    );
  };
  const handleCommunityChange = (event, newValue, fieldName) => {
    let selectedValues = [];

    if (newValue) {
      if (newValue.some((option) => option.communityId === "all")) {
        // If "Open to all" is selected, set selectedValues to "opentoall"
        selectedValues = "opentoall";
      } else {
        // If other option(s) are selected, include their IDs
        selectedValues = newValue.map((option) => option.communityId);
      }
    }

    setBasicSearch((prevValues) => ({
      ...prevValues,
      [fieldName]: selectedValues,
    }));
  };

  const handleInterest = (fieldName, values, options) => {
    let selectedValues;

    if (values.some((option) => option.InterestName === "Open to all")) {
      // If "Open to all" is selected, set selectedValues to an empty string
      selectedValues = "opentoall";
    } else {
      // If other options are selected, include only InterestIds
      selectedValues = values.map((option) => option.InterestId);
    }

    setBasicSearch((prevValues) => ({
      ...prevValues,
      [fieldName]: selectedValues,
    }));
  };

  const handleCheckboxChange = (e, option, field, id) => {
    const { checked } = e.target;

    if (id === -1) {
      // Set all values in the field to checked or unchecked based on the 'checked' value
      setBasicSearch((prevForm) => ({
        ...prevForm,
        [field]: checked ? option : [],
      }));
    } else {
      if (checked) {
        // Add the selected option to the corresponding field in the basicSearch state
        setBasicSearch((prevForm) => ({
          ...prevForm,
          [field]: Array.isArray(prevForm[field])
            ? [...prevForm[field], option]
            : prevForm[field] == undefined
            ? [option]
            : [...stringToArray(prevForm[field]), option],
        }));
      } else {
        console.log(basicSearch, field);

        // Remove the unselected option from the corresponding field in the basicSearch state
        setBasicSearch((prevForm) => ({
          ...prevForm,
          [field]: Array.isArray(prevForm[field])
            ? prevForm[field].filter((item) => item !== option)
            : stringToArray(prevForm[field]).filter((item) => item !== option),
        }));
      }
    }
  };

  function stringToArray(str) {
    console.log(str);
    return str.split(", ").map((item) => item.trim());
  }
  const handleSelectAllChange = (e, name) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      if (name === "maritalStatus") {
        setBasicSearch((prevForm) => ({
          ...prevForm,
          maritalStatus: [...maritalData], // Select all options
        }));
        setSelectAll(true);
      } else if (name === "education") {
        setBasicSearch((prevForm) => ({
          ...prevForm,
          education: education.map((val) => val.educationId), // Select all options
        }));
        setSelectAllEducation(true);
      } else if (name === "workingpreference") {
        setBasicSearch((prevForm) => ({
          ...prevForm,
          workingpreference: workingpreferenceData.map((val) => val), // Select all options
        }));
        setSelectWorkingPreference(true);
      } else if (name === "dietType") {
        setBasicSearch((prevForm) => ({
          ...prevForm,
          dietType: diet.map((val) => val.dietId), // Select all options
        }));
        setSelectDiet(true);
      }
    } else {
      if (name === "maritalStatus") {
        setBasicSearch((prevForm) => ({
          ...prevForm,
          maritalStatus: [], // Select all options
        }));
        setSelectAll(false);
      } else if (name === "education") {
        setBasicSearch((prevForm) => ({
          ...prevForm,
          education: [], // Select all options
        }));
        setSelectAllEducation(false);
      } else if (name === "workingpreference") {
        setBasicSearch((prevForm) => ({
          ...prevForm,
          workingpreference: [], // Select all options
        }));
        setSelectWorkingPreference(false);
      } else if (name === "dietType") {
        setBasicSearch((prevForm) => ({
          ...prevForm,
          dietType: [], // Select all options
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

  useEffect(() => {
    dispatch(setStep(page));
  }, []);

  const handleSelectChange = (event, values, field) => {
    if (values === "Open to all") {
      if (field === "country") {
        setBasicSearch((prevValues) => ({
          ...prevValues,
          country: "opentoall",
          state: "",
          city: "",
        }));
        setState([]);
        setCity([]);
      } else if (field === "state") {
        setBasicSearch((prevValues) => ({
          ...prevValues,
          state: "",
          city: "",
        }));
        setCity([]);
      }
    } else {
      setBasicSearch((prevValues) => ({
        ...prevValues,
        [field]: values,
      }));
      if (field === "country") {
        setBasicSearch((prevValues) => ({
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
      } else if (field === "state") {
        setBasicSearch((prevValues) => ({
          ...prevValues,
          state: values,
          city: "",
        }));
        getCitiesByState(basicSearch.state, values).then((cities) => {
          setCity(
            cities.map((item) => ({
              cityName: item.city_name,
              cityId: item.city_id,
            }))
          );
        });
      } else if (field === "city") {
        setBasicSearch((prevValues) => ({
          ...prevValues,
          city: values,
        }));
      }
    }
  };
  // const handleProfessionChange = (event, values) => {
  //   if (values.includes("Open to all")) {
  //     // If "Open to all" is selected, set the state to include all options except "Open to all"
  //     setBasicSearch((prevValues) => ({
  //       ...prevValues,
  //       profession: profession
  //         .filter((option) => option.id !== "Open to all")
  //         .map((option) => option.id),
  //     }));
  //   } else {
  //     // If other options are selected, set the state to include those options
  //     setBasicSearch((prevValues) => ({
  //       ...prevValues,
  //       profession: values.map((value) => value.id),
  //     }));
  //   }
  // };
  const handleProfessionChange = (event, values) => {
    if (values.some((option) => option.id === "open_to_all")) {
      // If "Open to all" is selected, set the state to an empty string
      setBasicSearch((prevValues) => ({
        ...prevValues,
        profession: "opentoall",
      }));
    } else {
      // If other options are selected, set the state to include those options
      setBasicSearch((prevValues) => ({
        ...prevValues,
        profession: values.map((value) => value.id),
      }));
    }
  };
  const handleSubmit = () => {
    console.log("Form Submitted");
    navigate("/search-results", { state: { basicSearch } });
  };
  const alcoholData = ["Regular", "Occasional", "Social", "Not at all"];
  const optionsWithOpenToAll = ["Open to all", ...alcoholData];

  const smokingData = ["Regular", "Occasional", "Social", "Not at all"];
  const smokingWithOpenToAll = ["Open to all", ...smokingData];
  // const manglikData = ["Yes", "No", "Partial", "Not Sure"];

  useEffect(() => {
    getEducation();
  }, []);
  const handleinput = (e) => {
    const { value, name } = e.target;
    const parsedValue =
      name === "profession" || "annualIncomeRangeEnd" ? parseInt(value) : value;
    setBasicSearch((log) => ({
      ...log,
      [name]: parsedValue,
    }));
  };


  const maritalData = [
    "single",
    "divorce",
    "awaitingdivorce",
    "widoworwidower",
  ];

  const handleDietChange = (option, checked) => {
    setBasicSearch((prevForm) => {
      const updatedDiet = checked
        ? [...(prevForm.dietType || []), option]
        : (prevForm.dietType || []).filter((item) => item !== option);

      return {
        ...prevForm,
        dietType: updatedDiet,
      };
    });
  };
// console.log(basicSearch?.education?.length, "hj");


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
    getEducation();
    getCommunityData();
    getProfession();
    getDiet();
    getInterestData();
  }, [state, city]);

  useEffect(() => {
    if (basicSearch.country) {
      getStatesByCountry(basicSearch.country)
        .then((states) => {
          setState(
            states.map((item) => ({
              stateName: item.state_name,
              stateId: item.state_id,
            }))
          );
        })
        .catch((error) => console.error("Error fetching states:", error));
    }
  }, [basicSearch.country]); // Trigger when the selected country changes

  useEffect(() => {
  if (basicSearch?.maritalStatus?.length >= 3) {
    // setSelectAll(true);
    setSelectAll(true);
  }
  if (basicSearch?.education?.length >= 4) {
    setSelectAllEducation(true);
  }
  // if (partnerPreference.workingpreference.length == 80)
  // {
  //   setSelectWorkingPreference(true);
  // }
  console.log(basicSearch?.dietType?.length, "mak");
  if (basicSearch?.dietType?.length >= 4) {
    setSelectDiet(true);
  }

}, [basicSearch]);
  useEffect(() => {
    if (basicSearch.country && basicSearch.state) {
      getCitiesByState(basicSearch.country, basicSearch.state)
        .then((cities) => {
          setCity(
            cities.map((item) => ({
              cityName: item.city_name,
              cityId: item.city_id,
            }))
          );
        })
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [basicSearch.country, basicSearch.state]);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center md:gap-16 md:mt-36 mt-20 ">
        <Link to="/searchbyid">
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 font-medium px-6 py-2 cursor-pointer`}
          >
            Search By Profile ID
          </p>
        </Link>
        <Link to="/basic-search">
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 font-medium px-6 py-2 cursor-pointer  ${
              path === "/basic-search" && "active"
            }`}
          >
            Basic Search
          </p>
        </Link>
      </div>
      <div className="bg-[#FCFCFC]  px-9 py-12 rounded-xl shadow  md:mx-80 mx-6 mb-36">
        <label htmlFor="name" className="font-semibold mb-1 mt-3 text-[25px]">
          Basic Search
        </label>
        <div className=" mb-2 mt-5">
          <label className="font-semibold mt-2 ">Age Range</label>
          <CustomSlider
            getAriaLabel={() => "Minimum distance shift"}
            value={[basicSearch.ageRangeStart, basicSearch.ageRangeEnd]}
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
            value={[basicSearch.heightRangeStart, basicSearch.heightRangeEnd]}
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
                className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                type="checkbox"
                name="selectAll"
                id="selectAll"
                checked={selectAll} // Make sure you have a state variable for selectAll
                onChange={(e) => handleSelectAllChange(e, "maritalStatus")}
              />
              <label htmlFor="selectAll" className="px-3 font-DMsans">
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
                  checked={basicSearch.maritalStatus.includes(option)}
                  value={option}
                  onChange={(e) =>
                    handleCheckboxChange(e, option, "maritalStatus")
                  }
                />
                <label
                  htmlFor={`maritalStatus${index}`}
                  className="px-3 font-DMsans"
                >
                  {option}
                </label>
              </span>
            ))}
          </span>
        </div>

        <div className="mt-6">
          <span className="font-medium  text-primary text-[22px] ">
            Location Details
          </span>
          <div className="mt-3">
            <Autocomplete
              onChange={(event, newValue) => {
                if (
                  newValue &&
                  newValue.some((option) => option.countryId === "open_to_all")
                ) {
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
                { countryId: "open_to_all", countryName: "Open to all" },
                ...country,
              ]}
              value={
                basicSearch.country === "opentoall"
                  ? [{ countryId: "open_to_all", countryName: "Open to all" }]
                  : country.filter(
                      (option) =>
                        basicSearch.country &&
                        basicSearch.country.includes(option.countryId)
                    )
              }
              getOptionLabel={(option) =>
                option.countryId === "open_to_all"
                  ? "Open to all"
                  : option.countryName
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    basicSearch.country === "opentoall" ||
                    (basicSearch.country &&
                      basicSearch.country.includes("open_to_all"))
                      ? ""
                      : "Country"
                  }
                  InputLabelProps={{
                    shrink: !!(
                      (basicSearch.country && basicSearch.country.length) ||
                      params.inputProps?.value
                    ),
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={basicSearch.country === "opentoall"}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none",
                      },
                    backgroundColor: "#F0F0F0",
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
            value={
              basicSearch.state === "Open to all"
                ? [{ stateId: "open_to_all", stateName: "Open to all" }]
                : state?.filter(
                    (option) =>
                      basicSearch?.state &&
                      basicSearch?.state?.includes(option.stateId)
                  )
            }
            getOptionLabel={(option) => option.stateName}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State"
                InputLabelProps={{
                  shrink:
                    !!(basicSearch.state && basicSearch.state.length) ||
                    params.inputProps?.value,
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                // disabled={
                //   basicSearch.state && basicSearch.state.includes("open_to_all")
                // } // Disable when "Open to all" is selected
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "none",
                    },
                  backgroundColor: "#F0F0F0",
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
              (option) =>
                basicSearch.city && basicSearch.city.includes(option.cityId)
            )}
            getOptionLabel={(option) => option.cityName}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                InputLabelProps={{
                  shrink:
                    !!(basicSearch.city && basicSearch.city.length) ||
                    params.inputProps?.value,
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={
                  basicSearch.country &&
                  basicSearch.country.includes("open_to_all")
                }
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "none",
                    },
                  backgroundColor: "#F0F0F0",
                }}
              />
            )}
          />
        </div>

        <div className=" mb-2 mt-5">
          <label className="font-semibold ">Education</label>
          <span className="flex flex-col justify-start items-start mx-5 mt-3 mb-3">
            <span className="flex flex-col justify-start items-start ">
              <span className="flex flex-row items-center" key="selectAll">
                <input
                  className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                  type="checkbox"
                  name="selectAll"
                  id="selectAllEducation"
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
                  className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                  type="checkbox"
                  name={`education${index}`}
                  id={`education${index}`}
                  checked={basicSearch.education.includes(
                    eduOption.educationId
                  )}
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
          <label className="font-semibold mt-2 ">Profession</label>
          <div className="mt-3">
            <Autocomplete
              multiple
              onChange={handleProfessionChange}
              value={
                basicSearch.profession === "opentoall"
                  ? [{ id: "open_to_all", name: "Open to all" }]
                  : profession.filter((option) =>
                      basicSearch.profession.includes(option.id)
                    )
              }
              options={[
                { id: "open_to_all", name: "Open to all" },
                ...profession,
              ]}
              getOptionLabel={(option) =>
                option.id === "open_to_all" ? "Open to all" : option.name
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Profession"
                  InputLabelProps={{
                    shrink:
                      isFocused ||
                      basicSearch.profession.length > 0 ||
                      basicSearch.profession === "",
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none", // Remove border when focused
                      },
                    backgroundColor: "#F0F0F0",
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <span>
                    {option.id === "open_to_all" ? "Open to all" : option.name}
                  </span>
                </li>
              )}
            />
          </div>
        </div>

        <div className=" mb-2 mt-5">
          <label className="font-semibold ">Diet Type</label>
          <span className="flex flex-col justify-start items-start mx-5 mt-3 mb-3">
            <span className="flex flex-col justify-start items-start ">
              <span className="flex flex-row items-center" key="selectAll">
                <input
                  className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                  type="checkbox"
                  name="selectAll"
                  id="selectAllDiet"
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
                  className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
                  type="checkbox"
                  name={`diet${index}`}
                  id={`diet${index}`}
                  value={dietOption.dietId}
                  checked={basicSearch?.dietType?.includes(dietOption.dietId)}
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
        <span>
          <span
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center  px-2 text-primary font-medium cursor-pointer"
          >
            View Advance Search{" "}
            {!isOpen ? (
              <span className="ps-2">
                <IoIosArrowDown />
              </span>
            ) : (
              <span className="ps-2">
                <IoIosArrowUp />
              </span>
            )}
          </span>
        </span>
        {isOpen && (
          <>
            <div className="mt-5">
              <span className="font-semibold ">Community</span>
              <div className="mt-5">
              <Autocomplete
      multiple
      onChange={(event, newValue) =>
        handleCommunityChange(event, newValue, "community")
      }
      options={[
        { communityId: "all", communityName: "Open to all" },
        ...community,
      ]}
      value={
        basicSearch.community === "opentoall"
          ? [{ communityId: "all", communityName: "Open to all" }]
          : community.filter((option) =>
              basicSearch.community.includes(option.communityId)
            )
      }
      getOptionLabel={(option) =>
        option.communityId === "all"
          ? "Open to all"
          : option.communityName
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Community"
          InputLabelProps={{
            shrink:
              isFocused ||
              basicSearch.community.length > 0 ||
              basicSearch.community === "",
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "none",
              },
            backgroundColor: "#F0F0F0",
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <span>
            {option.communityId === "all"
              ? "Open to all"
              : option.communityName}
          </span>
        </li>
      )}
    />
              </div>
            </div>

            <div className=" mb-2 mt-9">
              <span className="font-medium  text-primary text-[22px] ">
                Interests & Lifestyle Details
              </span>
              <div className="mt-5">
              <Autocomplete
  multiple
  onChange={(event, values) => handleInterest("interests", values, interests)}
  options={[
    { InterestId: "", InterestName: "Open to all" },
    ...interests,
  ]}
  value={
    basicSearch.interests === "opentoall"
      ? [{ InterestId: "", InterestName: "Open to all" }]
      : interests.filter(option =>
          basicSearch.interests.includes(option.InterestId)
        )
  }
  getOptionLabel={(option) => option.InterestName}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Interest"
      placeholder={
        basicSearch.interests && basicSearch.interests.length > 0 ? "" : ""
      }
      InputLabelProps={{
        shrink: basicSearch.interests && basicSearch.interests.length > 0 ? true : undefined, // Hide the placeholder if there's any value
      }}
      InputProps={{
        ...params.InputProps,
        startAdornment: params.InputProps.startAdornment,
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      sx={{
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "none", // Remove border when focused
        },
        backgroundColor: "#F0F0F0",
      }}
    />
  )}
/>

              </div>
            </div>

            <div className="mb-2 mt-5">
            <Autocomplete
  multiple
  onChange={(event, values) =>
    handleInput("smoking", values)
  }
  value={basicSearch.smoking}
  options={smokingWithOpenToAll}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Smoking"
      InputLabelProps={{
        shrink:
          isFocused ||
          (basicSearch.smoking && basicSearch.smoking.length > 0),
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      sx={{
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        backgroundColor: "#F0F0F0",
      }}
    />
  )}
/>
            </div>

            <div className="mt-5">
              <Autocomplete
                multiple // make the selection multiple if needed
                onChange={(event, values) =>
                  handleInput("alcohol", values, alcoholData)
                } // handle multiple selections for alcohol
                options={optionsWithOpenToAll} // include the "Open to all" option
                value={basicSearch.alcohol }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Alcohol"
                    InputLabelProps={{
                      shrink:
                        isFocused ||
                        (basicSearch.alcohol && basicSearch.alcohol.length > 0),
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: "none",
                        },
                      backgroundColor: "#F0F0F0",
                    }}
                  />
                )}
              />
            </div>
          </>
        )}

        <div className="flex justify-center items-center mt-16">
          <span
            className="bg-[#A92525] px-5 py-2 rounded-lg text-[#ffffff] cursor-pointer"
            onClick={handleSubmit}
          >
            Search
          </span>
        </div>
      </div>
    </>
  );
};

export default AdvanceSearch;
