import React, { useState } from "react";
import Header from "../../components/Header";
import SideBar from "../Dashboard/SideBar";
import { BackArrow } from "../../components/DataNotFound";
import ChangeRegPopUp from "./components/ChangeRegPopUp";
import { useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import apiurl from "../../util";

const RegNumber = () => {
  // const [email, setEmail] = useState("");
  // const [showInput, setShowInput] = useState(false);

  const { userId } = useSelector(userDataStore);

  // const handleInput = (e) => {
  //   const { value } = e.target;
  //   setEmail(value);
  // };

  // const handleProceedClick = () => {
  //   setShowInput(true);
  // };

  const handleNumberChange = async () => {
    if (userId) {
      try {
       await apiurl.post(`/generate-link-for-number`, {
        
          userId
        });
        toast.success("verify your email address")
      } catch (err) {
        toast.error("Something went wrong")
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false); // Corrected state name

  const openPopUp = () => {
    setIsOpen(true); // Corrected function name
  };

  const closePopUp= () => {
    setIsOpen(false);
  };

  return (
    <>
      <Header />
      <div className="mt-">
        <SideBar />
      </div>
      <BackArrow className="sm:hidden md:hidden block" />
      <div className="shadow md:px-9 py-3 px-6 mb-36 md:mb-5 md:mx-28 my-5 rounded-md md:ml-96 sm:ml-72 sm:mt-36 sm:mb-9 md:mt-40 mt-7 mx-6">
        <span>
          <p className="font-semibold font-montserrat mt-8 text-[22px]">
            Change Registered Number
          </p>
          {/* {!showInput && ( */}
            <div className="flex items-center justify-start gap-5  mb-9 font-DMsans mt-8">
              <span
                className="bg-primary text-white px-7 rounded-md py-2 cursor-pointer"
                  onClick={() => {
                  
                 openPopUp();
                 handleNumberChange();
                }}
              >
                Proceed
              </span>
            </div>
          {/* )} */}
          {/* {showInput && (
            <>
              <p className="pt-3">Email Id</p>
              <input
                type="email"
                className="bg-[#F0F0F0] rounded-md py-3 mt-2 md:w-[65%] w-full px-3"
                value={email}
                onChange={handleInput}
                placeholder="Enter your email address"
                name="email"
              />
              <div className="flex items-center justify-center gap-5 mx-9 mb-9 font-DMsans mt-8">
                <span className="border border-primary text-primary px-5 rounded-md py-2 cursor-pointer">
                  Cancel
                </span>
                <span
                  className="bg-primary text-white px-7 rounded-md py-2 cursor-pointer"
                  onClick={handleNumberChange}
                >
                  Send Email
                </span>
              </div>
            </>
          )} */}
        </span>
      </div>
      <ChangeRegPopUp closePopUp = {closePopUp} isOpen = {isOpen}/>
    </>
  );
};

export default RegNumber;
