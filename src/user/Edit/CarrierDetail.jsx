import React, { useEffect, useState } from "react";
import { pro } from "../../DummyData/prof";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { getFormData } from "../../Stores/service/Genricfunc";
import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import { RadioInput, TextInput } from "../../components/CustomInput";
import { selectGender } from "../../Stores/slices/formSlice";
import apiurl from "../../util";
import { toast } from "react-toastify";
import { getMasterData } from "../../common/commonFunction";
import { useNavigate } from "react-router-dom";
const carrerDetail = ({ showProfile , profileData, setAgainCallFlag, againCallFlag}) => {
  const [carrierDatas, setCarrierDatas] = useState([]);
  const [education, setEducation] = useState([]);
  const [profession, setProfession] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [carrer, setCarrer] = useState({
    highestEducation: "",
    highestQualification: "",
    currentDesignation: "",
    previousOccupation: "",
    profession: "",
    isOther: false,
    currencyType: "",
    annualIncomeValue: "",
    otherProfession: "",
    university: "",
  });
  const dispatch = useDispatch();

  const { userData, userId } = useSelector(userDataStore);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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
      if (name === "profession") {
        setCarrer((prev) => ({
          ...prev,
          profession: value === "other" ? prev.profession : value,
          isOther: value === "other",
        }));
      } else if (name === "otherProfession") {
        setCarrer((prev) => ({
          ...prev,
          otherProfession: value,
        }));
      } else {
        setCarrer((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      }
    }
  };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;

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
      setCarrer((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleAddProfession = async () => {
    try {
      let response = await apiurl.post(`/add-profession`, {
        professionName: carrer.otherProfession,
      });
      return response?.data?.profession?.proffesion_id;
    } catch (err) {
      // console.log(err);
    }
  };
  const getProfession = async () => {
    try {
      const data = await getMasterData("profession");
      setProfession(
        data.map((item) => ({
          id: item.proffesion_id,
          name: item.proffesion_name,
        }))
      );
    } catch (error) {
      // console.error("Error fetching profession data:", error);
    }
  };

  // console.log("getting prof data", profession);
  const getEducation = async () => {
    try {
      const response = await apiurl.get("/getMasterData/education");
      setEducation(
        response.data.map((item) => ({
          EducationId: item.education_id,
          EducationName: item.education_name,
        }))
      );
    } catch (error) {
      // console.error("Error fetching countries:", error);
      return [];
    }
  };
  const handleCurrencyChange = (currency) => {
    setCarrer((prev) => ({
      ...prev,
      currencyType: currency,
    }));
  };

  const nextForm = () => {
    dispatch(setStep(currentStep + 1));
    window.scrollTo(0, 0);
  };

  const prevForm = () => {
    dispatch(setStep(currentStep - 1));
  };
  const handleinput = (e) => {
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
      // Allow only fifteen-digit numbers
      const regex = /^(|0|[0-9]{1,15})$/;
      if (!regex.test(value)) {
        isValid = false;
      }
    }

    if (isValid) {
      const parsedValue = name === "profession" ? parseInt(value) : value;
      setCarrer((prevState) => ({
        ...prevState,
        [name]: parsedValue,
      }));
    }
  };
  // useEffect(() => {
  //   const formData = userData?.basicDetails;

  //   setFormDetails(formData);
  //  console.log("formdetails hai", formDeatils[0])
  // }, [userData]);

  const [formErrors, setFormErrors] = useState({
    highestEducation: "",
    highestQualification: "",
    currentDesignation: "",
    previousOccupation: "",
    profession: "",

    currencyType: "",
    annualIncomeValue: "",

    university: "",
  });

  const validateForm = (formData) => {
    // console.log("formData", formData);
    const errors = {};
    let hasErrors = false;

    if (!formData.highestEducation) {
      errors.highestEducation = "Education is required";
      hasErrors = true;
    }
    if (!formData.highestQualification) {
      errors.highestQualification = "Qualification is required";
      hasErrors = true;
    }
    if (!formData.currentDesignation) {
      errors.currentDesignation = "Designation is required";
      hasErrors = true;
    }
    if (!formData.previousOccupation) {
      errors.previousOccupation = "Occupation is required";
      hasErrors = true;
    }
    if (!formData.profession) {
      errors.profession = "Profession is required";
      hasErrors = true;
    }
    // console.log("eroor mai");
    if (userData?.gender === "M") {
      // console.log("condition lagne wala hai");
      if (
        !formData.currencyType ||
        !formData.annualIncomeValue ||
        formData.annualIncomeValue === "" ||
        formData.annualIncomeValue.trim() === "" ||
        formData.annualIncomeValue === 0
      ) {
        // console.log("valid nahi hai re baba");
        errors.currencyType = "Currency Type is required";
        errors.annualIncomeValue = "Annual Income is Required";

        hasErrors = true;
      }
    } else if (userData?.gender === "F") {
      if (!formData.currencyType) {
        errors.currencyType = "Currency Type is optional";

        hasErrors = true;
      }
    }

    if (
      typeof formData.university !== "string" ||
      !formData.university.trim()
    ) {
      errors.university = "University is required";
      hasErrors = true;
    }
    setFormErrors(errors); // Update the form errors state
    return !hasErrors; // Return true if there are no errors
  };
  // console.log("form", formDeatils);
  const handleSubmitForm3 = async (state) => {
    // console.log("Submitting Form 3...");

    // Validate form data

    try {
      // if (profession && profession.length > 0 ){

      let formData;

      if (carrer.isOther === true) {
        formData = {
          ...carrer,
          "school/university": carrer.university,
          profession: profession.length + 1,
          // Map university to school/university
        };
      } else {
        formData = {
          ...carrer,
          "school/university": carrer.university,
          // Map university to school/university
        };
      }

      // console.log("Form data validation passed. Submitting data...");
      // console.log("1111111111111111111111111",formData)
      // console.log("222222222222222222222222222222",carrer)

      // console.log("scheck",state);
      if (state === "") {
        if (!validateForm(formData)) {
          // console.log("Form validation failed.");
          toast.error("Please fill in all required fields.");
          setIsOpen((prev) => prev);
          return;
        }
        handleSendData(formData);
      } else if (state === "next") {
        handleNext(formData);
      }
      //   if (state === ""){
      //     if (!validateForm(formData)) {
      // console.log("Form validation failed.");
      //     toast.error("Please fill in all required fields.");
      //     return;
      //   }}else if(state === "next"){
      //     handleNext(formData);
      //   }

      // handleSendData(formData);
      // handleAddProfession();
      // const response = await apiurl.post(`/user-data/${userId}?page=3`, {
      //   careerDetails: { ...formData },
      // });
      // toast.success(response.data.message);
      // dispatch(setUser({ userData: { ...response.data.user } }));
      // console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.log("Error submitting form data:", error);
      toast.error("An error occurred while submitting form data.");
    }
  };

  const handleSendData = async (formData) => {
    try {
      console.log("entring");
      handleAddProfession();
      const response = await apiurl.post(`/user-data/${userId}?page=3`, {
        careerDetails: { ...formData },
      });
      setAgainCallFlag(true);
      toast.success(response.data.message);
      // fetchData()
      // dispatch(setUser({ userData: { ...response.data.user } }));
      setIsOpen((prev) => !prev);
      // console.log("Form submitted successfully:", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleNext = async (formData) => {
  //   // console.log("mak");
  //   if (!validateForm(formData)) {
  //     toast.error("Please fill in all required fields.");
  //     return;
  //   }

  // If form validation passes, proceed to the next page

  //    await handleSendData(formData)
  //   navigate(`/registration-form/${parseInt(page) + 1}`);

  //   window.scrollTo(0, 0);
  // };
  const customErrorMessages = {
    highestEducation: "Education  is required",
    highestQualification: "Qualification is required",
    currentDesignation: "Designation is required",
    previousOccupation: "Occupation is required",
    profession: "Profession is required",

    currencyType: "Currency Type is required",
    annualIncomeValue: "Annual income is required",

    university: "University is required",
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const formData = await getFormData(userId, page);

  //       setCarrer(formData.careerDetails);
  //       setCarrer((prev) => ({
  //         ...prev,
  //         university: formData.careerDetails["school/university"],
  //       }));
  //     } catch (error) {
  //       // console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [userId, ]);

  useEffect(() => {
    getEducation();
    getProfession();
  }, []);

  const resetOther = () => {
    setCarrer({
      ...carrer,
      profession: "",
      otherProfession: "",
      isOther: false,
    });
  };

  // useEffect(() =>
  // {
  //   if (careerDetails)
  //   {
  //     setCarrer(careerDetails?.careerDetails);
  //     console.log(careerDetails)
  //     setCarrer((prev) => ({
  //       ...prev,
  //       university: careerDetails?.careerDetails["school/university"],
  //     }));
  //     getEducation();

  //   }
  // }, []);

 
    // console.log(userData);
    const fetchData = async () => {
      const userData = profileData[2]
      if (userData ) {
        const data = profileData[2];
        //  const eduPlace = userData.school/university
        // console.log(data,"lpl")
        setCarrer({
          highestEducation: data?.highestEducation || "",
          highestQualification: data?.highestQualification || "",
          currentDesignation: data?.currentDesignation || "",
          previousOccupation: data?.previousOccupation || "",
          profession: data?.profession || "",

          currencyType: data?.currencyType || "",
          annualIncomeValue: data?.annualIncomeValue || "",
          university: data["school/university"] || "",
        });

        const educationData = profileData[2];
        setCarrierDatas([
          // formData,
          // perosnalData,
          educationData,
        ]);
      }
    };
    useEffect(() => {
    fetchData();
    if(showProfile){
      setIsOpen(false);
    }
    console.log("cARRIERDETAIL")
  }, [ showProfile, againCallFlag]);
  // console.log(carrierDatas);

  // useEffect(() => {
  //   getProfession();
  // }, []);
  // console.log(carrierDatas);
  return (
    <>
      <>
        <div className="shadow rounded-xl  py-3 mt-9 my-5 w-full overflow-hidden">
          <span className="flex justify-between items-center text-primary px-10 py-2">
            <p className="  font-medium  text-[20px]">Career Details</p>
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
          <span className="flex md:flex-row sm:flex-row flex-col  items-baselinev justify-between  font-DMsans px-10 text-start pb-8">
            <span className=" mt-4  text-[17px] md:w-1/2 sm:w-1/2">
              <p className="  font-medium"> Education</p>
              <p className="font-light text-[15px]">
                {carrierDatas[0]?.educationctype || "NA"}
              </p>

              <p className=" pt-4 font-medium"> University</p>
              <p className=" font-light text-[15px]">
                {carrer.university ? carrer.university : "NA"}
              </p>
              <p className=" pt-4 font-medium"> Highest Qualification</p>
              <p className=" font-light text-[15px]">
                {carrierDatas[0]?.highestQualification
                  ? carrierDatas[0]?.highestQualification
                  : "NA"}
              </p>
              <p className=" pt-4 font-medium">Profession</p>
              <p className=" font-light text-[15px]">
                {carrierDatas[0]?.professionctype || "NA"}
              </p>
            </span>
            <span className="text-[17px] mt-4 md:w-1/2 sm:w-1/2">
              <p className="  font-medium"> Current Designation</p>
              <p className=" font-light text-[15px]">
                {carrierDatas[0]?.currentDesignation
                  ? carrierDatas[0]?.currentDesignation
                  : "NA"}
              </p>
              <p className=" pt-4 font-medium">Previous Occupation</p>
              <p className=" font-light text-[15px]">
                {carrierDatas[0]?.previousOccupation
                  ? carrierDatas[0]?.previousOccupation
                  : "NA"}
              </p>
              <p className=" pt-4 font-medium"> Approximate Annual Income</p>
              <p className=" font-light text-[15px]">
                {carrierDatas[0]?.annualIncomeUSD
                  ? carrierDatas[0]?.annualIncomeUSD
                  : "NA"}{" "}
                USD
              </p>
            </span>
          </span>

          {isOpen && (
            <>
              <span className="flex md:flex-row sm:flex-row flex-col  items-baseline justify-between sm:gap-9 md:gap-9 font-DMsans px-10 text-start pb-8">
                <span className="w-full">
                  <div className=" mb-2">
                    <RadioInput
                      options={education.map((item) => ({
                        value: item.EducationId,
                        label: item.EducationName,
                      }))}
                      field="Education Qualification"
                      onBlur={handleBlur}
                      selectedValue={carrer.highestEducation}
                      onChange={(value) =>
                        setCarrer((prev) => ({
                          ...prev,
                          highestEducation: value,
                        }))
                      }
                    />
                  </div>
                  <TextInput
                    type="text"
                    placeholder=" Highest Qualification"
                    value={carrer.highestQualification}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    name="highestQualification"
                  />

                  {/* School / University */}
                  <TextInput
                    type="text"
                    placeholder="School or University"
                    value={carrer.university}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    name="university"
                  />

                  <div className="flex flex-col mb-2">
                    <label className="font-semibold">
                      {" "}
                      Profession <sup className="text-primary">*</sup>
                    </label>

                    {/*         
          <select
            onChange={handleChange}
            className="p-2 bg-[#F0F0F0] mt-1 outline-0 h-[55px] border focus:border-[#CC2E2E] rounded-md"
            name="profession"
            onBlur={handleBlur}
            value={carrer.profession}
          >
            <option value="">Select Profession</option>
            {profession.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
            <option value="other">Other</option>
          </select> */}

                    {/* Show text input for Other profession */}
                    {carrer.isOther ? (
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Wirite your profession"
                          className="p-2 bg-[#F0F0F0] mt-1 outline-0 h-[8vh] border focus:border-[#CC2E2E] rounded-md mb-3 w-full"
                          value={carrer.otherProfession}
                          onChange={handleChange}
                          name="otherProfession"
                        />
                        <button
                          type="button"
                          onClick={resetOther}
                          className="absolute right-2 top-6 text-primary text-28"
                        >
                          <FaXmark />
                        </button>
                      </div>
                    ) : (
                      <select
                        onChange={handleChange}
                        className="p-2 bg-[#F0F0F0] mt-1 outline-0 h-[55px] border focus:border-[#CC2E2E] rounded-md"
                        name="profession"
                        onBlur={handleBlur}
                        value={carrer.profession}
                      >
                        <option value="">Select Profession</option>
                        {profession.map((p, index) => (
                          <option key={`${p.id}-${index}`} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                    )}
                  </div>
                  <span className="text-primary text-[13px] font-DMsans ">
                    If your profession is not in the list, then choose other and
                    add your profession.
                  </span>
                </span>

                <span className="w-full">
                  {/* Previous Occupation */}
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      placeholder=" Current Designation"
                      value={carrer.currentDesignation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="currentDesignation"
                    />
                  </div>{" "}
                  <TextInput
                    type="text"
                    placeholder=" Previous Occupation"
                    value={carrer.previousOccupation}
                    onChange={handleinput}
                    onBlur={handleBlur}
                    name="previousOccupation"
                  />
                  {/* Approximate Annual Income */}
                  <div className=" mb-2 md:mt-12 sm:mt-12">
                    <label className="font-semibold">
                      {" "}
                      Currency Type{" "}
                      {/* {userData?.gender === "M" ? (
              <span className="text-primary">*</span>
            ) : (
              <span className="font-normal text-[#414141]">(Optional)</span>
            )} */}
                      <span className="text-primary">*</span>
                    </label>
                    <span className="flex flex-col justify-start items-start md:mx-5 mt-3 mb-3">
                      {/* Add appropriate onChange handlers */}
                      <span className="flex items-center mb-3">
                        <input
                          type="radio"
                          name="incomeCurrency"
                          value="INR"
                          checked={carrer.currencyType === "INR"}
                          onChange={() => handleCurrencyChange("INR")}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="rupee" className="px-3 font-DMsans">
                          Indian Rupee (INR)
                        </label>
                      </span>
                      <span className="flex items-center mb-3">
                        <input
                          type="radio"
                          name="incomeCurrency"
                          value="USD"
                          checked={carrer.currencyType === "USD"}
                          onBlur={handleBlur}
                          onChange={() => handleCurrencyChange("USD")}
                        />
                        <label htmlFor="dollar" className="px-3 font-DMsans">
                          United States Dollar (USD)
                        </label>
                      </span>
                      <span className="flex items-center mb-3">
                        <input
                          type="radio"
                          name="incomeCurrency"
                          value="AED"
                          checked={carrer.currencyType === "AED"}
                          onChange={() => handleCurrencyChange("AED")}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="dhiram" className="px-3 font-DMsans">
                          United Arab Emirates Dirham (AED)
                        </label>
                      </span>
                      <span className="flex items-center mb-2">
                        <input
                          type="radio"
                          name="incomeCurrency"
                          value="GBP"
                          checked={carrer.currencyType === "GBP"}
                          onBlur={handleBlur}
                          onChange={() => handleCurrencyChange("GBP")}
                        />
                        <label htmlFor="pound" className="px-3 font-DMsans">
                          United Kingdom Pound (GBP)
                        </label>
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col mb-5 md:mt-8 sm:mt-8">
                    <label className="font-semibold">
                      Annual Income Value{" "}
                      {userData?.gender === "M" ? (
                        <span className="text-primary">*</span>
                      ) : (
                        <span className="font-normal text-[#414141]">
                          (Optional)
                        </span>
                      )}
                    </label>
                    <input
                      value={carrer.annualIncomeValue}
                      onChange={handleinput}
                      className={`p-2 bg-[#F0F0F0] mt-2 outline-0 md:h-[55px] w-full border focus:border-[#CC2E2E] rounded-md 
          }`}
                      type="number"
                      name="annualIncomeValue"
                      placeholder="Annual Income :"
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
                    handleSubmitForm3("");
                
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
    </>
  );
};

export default carrerDetail;
