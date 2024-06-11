import React, { useState } from "react";
import Header from "../../components/Header";
import SideBar from "../Dashboard/SideBar";
import { BackArrow } from "../../components/DataNotFound";
import { useDispatch, useSelector } from "react-redux";
import apiurl from "../../util";
import { userDataStore } from "../../Stores/slices/AuthSlice";

const SubsEmail = () => {
  const [emailSettings, setEmailSettings] = useState({
    emailOpt: "",
  });

  const handleInput = async (e) => {
    const { value, name } = e.target;
    setEmailSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
    await subscribeEmail();
  };

  const { userId } = useSelector(userDataStore);

  const subscribeEmail = async () => {
    if (userId) {
      try {
        const value = emailSettings.emailOpt === "Enable" ? true : false;
        await apiurl.put(`/change-email-subscription`, {
          userId,
          isValue: value,
        });
      } catch (err) {
        console.error("Error subscribing to email:", err);
        // Handle error
      }
    }
  };

  const emailOption = ["Enable", "Disable"];

  return (
    <>
      <Header />
      <SideBar />
      <BackArrow className="sm:hidden md:hidden block" />
      <div className="shadow md:px-9 py-3 px-6 mb-36 md:mb-5 md:mx-28 my-5 rounded-md md:ml-96 sm:ml-72 sm:mt-36 sm:mb-9 md:mt-40 mt-7 mx-6">
        <span>
          <p className="font-semibold font-montserrat mt-5 text-[22px]">Email Settings</p>
          <p className="pt-3">Subscribe Email Services Every 5 Days</p>
          <span className="flex flex-col mt-2">
            {emailOption.map((option, index) => (
              <span key={index}>
                <input
                  type="radio"
                  className="bg-[#F0F0F0] rounded-md mt-2 mx-1"
                  onChange={handleInput}
                  id={`emailOpt${index}`}
                  name="emailOpt"
                  value={option}
                />
                <label htmlFor={`emailOpt${index}`}>{option}</label>
              </span>
            ))}
          </span>
        </span>
      </div>
    </>
  );
};

export default SubsEmail;
