import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Consent = ({ selectedOption,setShowConsent, callBackName}) => {
  const navigate = useNavigate();
  const [consent, setConsent] = useState({
    firstname: "",
    lastname: "",
    checkmark: "",
    formText: "",
  });

  const handleinput = (e) => {
    const { value, name, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setConsent((log) => ({
      ...log,
      [name]: inputValue,
    }));
  };


  const handleSubmit = (e) => {
    console.log("Submitted Form");
    callBackName(consent.firstname, consent.lastname)
    setShowConsent(false);
  };
  return (
    <>
      <div className=" rounded-md bg-white p-5 mt-12">
        <div className="text-center bg-[#FCFCFC]  px-9 py-12 rounded-xl shadow md:mx-96 sm:mx-9 mx-3 ">
          <h2 className="text-2xl text-[#262626]  font-semibold mb-4">
            Consent Form
          </h2>
          <span className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-[#262626] font-DMsans text-start mb-2"
            >
              First Name*
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              className=" w-full h-[7vh] rounded-md bg-[#eaeaea] focus:outline-none px-3"
              name="firstname"
              value={consent.firstname}
              onChange={(e) => handleinput(e)}
            />

            <label
              htmlFor="username"
              className="block text-sm font-semibold text-[#262626] font-DMsans text-start mb-2 mt-3"
            >
              Last Name*
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="lastname"
              value={consent.lastname}
              className=" w-full h-[7vh] rounded-md bg-[#eaeaea] focus:outline-none px-3"
              onChange={(e) => handleinput(e)}
            />
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-[#262626] font-DMsans text-start mb-2 mt-3"
            >
              Consent*
            </label>
            <p className="text-start">
              I,{" "}
              <span className="font-semibold">
                {consent.firstname} {consent.lastname}
              </span>{" "}
              hereb by verify that I am entrusted & authorized by{" "}
              {selectedOption ? selectedOption.name : ""} with the{" "}
              <input
                type="text"
                value={consent.formText}
                name="formText"
                placeholder=" Enter the name ---------"
                onChange={(e) => handleinput(e)}
                className=" focus:outline-none"
              />
              to create a profile on Connecting Soulmate for a likehood of
              marriage. I have all the relevant & correct details and assuure to
              that follow the terms & conditions.
            </p>
            <span className="flex justify-start items-center mt-3 mb-3">
              <input
                type="checkbox"
                name="checkmark"
                checked={consent.checkmark}
                onChange={(e) => handleinput(e)}
              />
              <span className="px-2">I Agree</span>
            </span>

            <span
              onClick={() => {
                // navigate(-1);
                handleSubmit();
              }}
              className="w-full bg-[#A92525] block text-white py-3 cursor-pointer rounded-lg mt-9 "
            >
              Submit
            </span>
          </span>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default Consent;