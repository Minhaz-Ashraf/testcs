import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep,
  setFormData,
  selectStepper,
} from "../../Stores/slices/Regslice";
import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import apiurl from "../../util";
import { RadioInput, TextInput } from "../../components/CustomInput";
import { getFormData } from "../../Stores/service/Genricfunc";
import { getLabel, getMasterData } from "../../common/commonFunction.js";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
const Form3 = ({ page }) => {
  const [education, setEducation] = useState([]);
  const [profession, setProfession] = useState([]);
  const [formthree, setFormthree] = useState({
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
  const { currentStep } = useSelector(selectStepper);
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
      setFormthree((prev) => ({
        ...prev,
        profession: value === "other" ? prev.profession : value,
        isOther: value === "other",
      }));
    } else if (name === "otherProfession") {
      setFormthree((prev) => ({
        ...prev,
        otherProfession: value,
      }));
    } else {
      setFormthree((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  }

  
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

   
    
      setFormthree((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    
    }}
  

  const handleAddProfession = async () => {
    try {
      let response = await apiurl.post(`/add-profession`, {
        professionName: formthree.otherProfession,
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
    setFormthree((prev) => ({
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
  
        e.preventDefault(); 
      }
    } else if (type === "number") {
      // Allow empty string or fifteen-digit numbers
      const regex = /^(|0|[0-9]{1,15})$/;// 0 or numbers with up to 15 digits
      if (!regex.test(value)) {
        isValid = false;
      }
    }
  
    if (isValid) {

    
    const parsedValue = name === "profession" ? parseInt(value) : value;
    setFormthree((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };
}
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
    if (userData?.gender === "M" ) {
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
    }else if (userData?.gender === "F"){
      if (!formData.currencyType ){
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

      if (formthree.isOther === true) {
        formData = {
          ...formthree,
          "school/university": formthree.university,
          profession: profession.length + 1,
          // Map university to school/university
        };
      } else {
        formData = {
          ...formthree,
          "school/university": formthree.university,
          // Map university to school/university
        };
      }

      // console.log("Form data validation passed. Submitting data...");
      // console.log("1111111111111111111111111",formData)
      // console.log("222222222222222222222222222222",formthree)

    // console.log("scheck",state);
      if (state === ""){
        if (!validateForm(formData)) {
        // console.log("Form validation failed.");
        toast.error("Please fill in all required fields.");
        return;
        }
        handleSendData(formData);
      }else if(state === "next"){
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
      // console.error("Error submitting form data:", error);
      toast.error("An error occurred while submitting form data.");
    }
  };


   const handleSendData = async (formData)=>{
    try{
      handleAddProfession();
      const response = await apiurl.post(`/user-data/${userId}?page=3`, {
        careerDetails: { ...formData },
      });
      toast.success(response.data.message);
      dispatch(setUser({ userData: { ...response.data.user } }));
      // console.log("Form submitted successfully:", response.data);
    }catch(err){
    //  console.log(err)
    }
   }

  const handleNext = async (formData) => {
    // console.log("mak");
    if (!validateForm(formData)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // If form validation passes, proceed to the next page
     
     await handleSendData(formData)
    navigate(`/registration-form/${parseInt(page) + 1}`);
   
    window.scrollTo(0, 0);
  };
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = await getFormData(userId, page);

        setFormthree(formData.careerDetails);
        setFormthree((prev) => ({
          ...prev,
          university: formData.careerDetails["school/university"],
        }));
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, [userId, page]);

  useEffect(() => {
    dispatch(setStep(page));
  }, []);
  useEffect(() => {
    getEducation();
    getProfession();
  }, []);

  const resetOther = () => {
    setFormthree({
      ...formthree,
      profession: "",
      otherProfession: "",
      isOther: false,
    });
  };
  return (
    <>
       
       
      <div className="bg-[#FCFCFC] sm:mx-12 md:mx-0 md:px-9 sm:px-6 px-5 py-12 rounded-xl shadow ">
        {/*highestEducation Qualification */}
        <div className=" mb-2">
          <RadioInput
    label=  {getLabel()}
            options={education.map((item) => ({
              value: item.EducationId,
              label: item.EducationName,
            }))}
            field="Education Qualification"
            onBlur={handleBlur}
            selectedValue={formthree.highestEducation}
            onChange={(value) =>
              setFormthree((prev) => ({ ...prev, highestEducation: value }))
            }
          />
        </div>

        {/* Highest Qualification */}
        <TextInput
          type="text"
          label=  {getLabel()}
          placeholder=" Highest Qualification"
          value={formthree.highestQualification}
          onChange={handleInput}
          onBlur={handleBlur}
          name="highestQualification"
        />

        {/* School / University */}
        <TextInput
          type="text"
          label=  {getLabel()}
          placeholder="School or University"
          value={formthree.university}
          onChange={handleInput}
          onBlur={handleBlur}
          name="university"
        />

        {/* Profession */}
        <div className="flex flex-col mb-2">
          <label className="font-semibold">
            {" "}
             {getLabel()} Profession <sup className="text-primary">*</sup>
          </label>

          {/*         
          <select
            onChange={handleChange}
            className="p-2 bg-[#F0F0F0] mt-1 outline-0 h-[55px] border focus:border-[#CC2E2E] rounded-md"
            name="profession"
            onBlur={handleBlur}
            value={formthree.profession}
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
          {formthree.isOther ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Wirite your profession"
                className="p-2 bg-[#F0F0F0] mt-1 outline-0 h-[8vh] border focus:border-[#CC2E2E] rounded-md mb-3 w-full"
                value={formthree.otherProfession}
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
              value={formthree.profession}
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
        <span className="text-primary text-[13px] font-DMsans ">If your profession is not in the list, then choose other and add your profession.</span>
        {/* Current currentDesignation */}
        <div className="mt-2">
        <TextInput
          type="text"
          label=  {getLabel()}
          placeholder=" Current Designation"
          value={formthree.currentDesignation}
          onChange={handleChange}
          onBlur={handleBlur}
          name="currentDesignation"
        />
        </div>
         {/* <div className="flex flex-col mb-5">
          <label className="font-semibold">Current Designation</label>
         C
          <input
            value={formthree.currentDesignation}
            onChange={handleChange}
            className={`p-2 bg-[#F0F0F0] mt-2 outline-0 md:h-[55px] w-full border focus:border-[#CC2E2E] rounded-md 
          }`}
            type="number"
            name="annualIncomeValue"
            placeholder="Annual Income :"
          />
        </div> */}

        {/* Previous Occupation */}

        <TextInput
          type="text"
          label=  {getLabel()}
          placeholder=" Previous Occupation"
          value={formthree.previousOccupation}
          onChange={handleinput}
          onBlur={handleBlur}
          name="previousOccupation"
        />

        {/* Approximate Annual Income */}
        <div className=" mb-2">
          <label className="font-semibold">
            {" "}
           {getLabel()} Currency Type{" "}
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
                checked={formthree.currencyType === "INR"}
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
                checked={formthree.currencyType === "USD"}
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
                checked={formthree.currencyType === "AED"}
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
                checked={formthree.currencyType === "GBP"}
                onBlur={handleBlur}
                onChange={() => handleCurrencyChange("GBP")}
              />
              <label htmlFor="pound" className="px-3 font-DMsans">
                United Kingdom Pound (GBP)
              </label>
            </span>
          </span>
        </div>

        {/* Annual Income */}
        {/* <TextInput
          label={gender}
          type="number"
          onBlur={handleBlur}
          placeholder="Annual Income"
          value={formthree.annualIncomeValue}
          name="annualIncomeValue"
          onChange={handleChange}
        /> */}

        <div className="flex flex-col mb-5">
          <label className="font-semibold">
         {getLabel()} Annual Income Value{" "}
            {userData?.gender === "M" ? (
              <span className="text-primary">*</span>
            ) : (
              <span className="font-normal text-[#414141]">(Optional)</span>
            )}
          </label>
          <input
            value={formthree.annualIncomeValue}
            onChange={handleinput}
            className={`p-2 bg-[#F0F0F0] mt-2 outline-0 md:h-[55px] w-full border focus:border-[#CC2E2E] rounded-md 
          }`}
            type="number"
            name="annualIncomeValue"
            placeholder="Annual Income :"
          />
        </div>
        {/* Navigation Buttons */}
        <span className="mt-9 flex justify-center  items-center md:gap-16 gap-3 px-12">
          <Link
            to={`/registration-form/${parseInt(page) - 1}`}
            onClick={prevForm}
            className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
          >
            Previous
          </Link>
          <button
         onClick={() => handleSubmitForm3("")}
            className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
          >
            Save
          </button>
          <Link
            onClick={() => handleSubmitForm3("next")}
            className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
          >
            Next
          </Link>
        </span>
      </div>
    </>
  );
};

export default Form3;
