import React, { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillGrid1X2Fill } from "react-icons/bs";

import { LuCopyPlus } from "react-icons/lu";
import { VscSettingsGear } from "react-icons/vsc";
import { GiSelfLove } from "react-icons/gi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { HiPencilSquare } from "react-icons/hi2";

import { useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";


import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LogoutPop from "./../PopUps/LogoutPop";

const SideBar = () => {
  const [sidebarData, setSidebarData] = useState([]);
  const { userData, userId } = useSelector(userDataStore);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const path = window.location.pathname;
  const [showProf, setShowProf] = useState(false);
  const [isLogoutOpen, setisLogoutOpen] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showCountry, setShowCountry] = useState(false);

  const handleMouseEnterCountry = () => {
    setShowCountry(true);
  };

  const handleMouseLeaveCountry = () => {
    setShowCountry(false);
  };

  const handleMouseEnterComm = () => {
    setShowCommunity(true);
  };

  const handleMouseLeaveComm = () => {
    setShowCommunity(false);
  };
  const handleMouseEnterProf = () => {
    setShowProf(true);
  };

  const handleMouseLeaveProf = () => {
    setShowProf(false);
  };
  const openLogoutPopup = () => {
    setisLogoutOpen(true);
  };

  const closeLogout = () => {
    setisLogoutOpen(false);
  };
  const location = useLocation();

  useEffect(() => {
    const formData = userData;
    setSidebarData({
      formData,
    });

    setLoading(false);
  }, [userData]);

  const maritalStatusMapping = {
    single: "Single",
    awaitingdivorce: "Awaiting Divorce",
    divorcee: "Divorcee",
    widoworwidower: "Widow or Widower",
    // Add other mappings as needed
  };
  const transformedMaritalStatus =
    maritalStatusMapping[
      sidebarData?.formData?.additionalDetails?.maritalStatus
    ] || "NA";

  const dateOfBirth = sidebarData?.formData?.basicDetails?.dateOfBirth;

  // Function to reformat date
  function reformatDate(dateStr) {
    if (!dateStr) return null; // Handle case where date is not provided
    const [year, month, day] = dateStr?.split("-");
    return `${day}-${month}-${year}`;
  }

  // Apply the function
  const formattedDateOfBirth = reformatDate(dateOfBirth);

  console.log(formattedDateOfBirth);
  return (
    <>
    
      {loading ? (
        <div className="px-6  md:w-1/4 sm:w-[39%]  z-30 mt-28 absolute md:block sm:block hidden">
          <Skeleton height={620} />
        </div>
      ) : (
        <>
          {/* //desktop sidebar */}
          <LogoutPop isLogoutOpen={isLogoutOpen} closeLogout={closeLogout} />
          <div
            className={`md:px-6 px-6 text-white  hidden md:block sm:block   fixed mt-20 sm:mt-28 md:mt-20   `}
          >
            <div
              className={`bg-primary  w-[90%] md:min-w-full mt-5 md:mt-12 rounded-2xl md:h-[80vh] sm:[40vh] overflow-y-scroll  scrollbar-hide md:pb-36 sm:pb-9`}
            >
              <div className="flex  justify-center items-center relative ">
                <span className=" bg-green-500 rounded-full w-[13px] h-[13px] absolute md:left-[165px] sm:left-[152px] mt-20"></span>
                <img
                  src={sidebarData?.formData?.selfDetails?.profilePictureUrl}
                  loading="lazy"
                  className="text-[32px] w-20 h-20 mt-10 rounded-full border-2 border-white"
                  alt="Profile"
                />
              </div>

              <>
                <p className="text-center font-montserrat font-light mt-3 ">
                  {sidebarData?.formData?.basicDetails?.name?.replace(
                    "undefined",
                    ""
                  ) || "NA"}
                </p>
                <p className="text-center font-extralight">
                  {" "}
                  {sidebarData?.formData?.additionalDetails?.stateatype || "NA"}
                  {", "}
                  {sidebarData?.formData?.additionalDetails?.countryatype ||
                    "NA"}
                </p>
                <p className="text-center font-light">
                  ({sidebarData?.formData?.userId})
                </p>
                <span className="flex items-start justify-between px-5 mt-3 text-start ">
                  <span className="font-light">
                    <p>
                      {sidebarData?.formData?.basicDetails?.age
                        ? sidebarData?.formData?.basicDetails?.age + "yrs"
                        : "NA"}
                      ,{" "}
                      {sidebarData?.formData?.additionalDetails?.height
                        ? sidebarData?.formData?.additionalDetails?.height +
                          "ft"
                        : "NA"}
                    </p>
                    <p>{formattedDateOfBirth}</p>
                    <p>{transformedMaritalStatus}</p>
                    <p></p>
                  </span>
                  <span className="font-light text-start">
                    <p
                      className="cursor-pointer"
                      onMouseEnter={handleMouseEnterComm}
                      onMouseLeave={handleMouseLeaveComm}
                    >
                      {" "}
                      {sidebarData?.formData?.familyDetails?.communityftype
                        ? sidebarData?.formData?.familyDetails?.communityftype?.slice(
                            0,
                            12
                          )
                        : "NA"}
                      ..
                    </p>
                    {showCommunity && (
                      <p className="absolute  text-white  w-20 p-2 bg-primary  rounded-lg ">
                        {sidebarData?.formData?.familyDetails?.communityftype
                          ? sidebarData?.formData?.familyDetails?.communityftype
                          : "NA"}
                      </p>
                    )}

                    <p>
                      {" "}
                      {sidebarData?.formData?.basicDetails?.timeOfBirth || "NA"}
                    </p>
                    <p
                      onMouseEnter={handleMouseEnterProf}
                      onMouseLeave={handleMouseLeaveProf}
                      className="cursor-pointer"
                    >
                      {sidebarData?.formData?.careerDetails?.professionctype?.slice(
                        0,
                        10
                      ) || "NA"}
                      ..
                    </p>
                    {showProf && (
                      <div className="w-auto text-white bg-primary  absolute  rounded-lg ">
                        <p>
                          {" "}
                          {sidebarData?.formData?.careerDetails
                            ?.professionctype || "NA"}
                        </p>
                      </div>
                    )}
                  </span>
                </span>

                <ul className="flex flex-col mx-5 mt-5">
                  <Link
                    className={`py-2 px-2 hover:bg-white hover:text-primary rounded-xl cursor-pointer ${
                      path === "/user-dashboard" && "sidebar-active"
                    }`}
                    to="/user-dashboard"
                  >
                    <li className={`flex items-center`}>
                      <span className="text-[23px]">
                        {" "}
                        <BsFillGrid1X2Fill />
                      </span>
                      <span className="px-3">Dashboard</span>
                    </li>
                  </Link>
                  <Link
                    className={` py-2 mt-2 px-2 hover:bg-white hover:text-primary rounded-xl cursor-pointer pointer `}
                    to="/profile"
                    state={{
                      location: location.pathname,
                    }}
                  >
                    <li className={`flex items-center`}>
                      <span className="text-[23px]">
                        {" "}
                        <HiPencilSquare />
                      </span>
                      <span className="px-4">My Profile</span>
                    </li>
                  </Link>
                  <Link
                    className=" py-2 px-2 mt-2  hover:bg-white hover:text-primary rounded-xl cursor-pointer"
                    to="/image-edit"
                  >
                    <li className={`flex items-center`}>
                      <span className="text-[25px]">
                        {" "}
                        <LuCopyPlus />
                      </span>
                      <span className="px-4">My Photos</span>
                    </li>
                  </Link>
                  <Link
                    className=" py-2 px-2 mt-2 hover:bg-white hover:text-primary rounded-xl cursor-pointer"
                    to="/partner-edit"
                  >
                    <li className={`flex items-center`}>
                      <span className="text-[25px]">
                        {" "}
                        <GiSelfLove />
                      </span>
                      <span className="px-4">Partner Preference</span>
                    </li>
                  </Link>
                  <span className="flex items-center  mt-2  bg-transparent py-2 px-2   hover:bg-white hover:text-primary rounded-xl cursor-pointer">
                    <span className="text-[23px]">
                      {" "}
                      <VscSettingsGear />
                    </span>
                    <span
                      onClick={() => setIsOpen((prev) => !prev)}
                      className="flex items-center  px-[18px]  "
                    >
                      Setting{" "}
                      {!isOpen ? (
                        <span className="ps-24">
                          <IoIosArrowDown />
                        </span>
                      ) : (
                        <span className="ps-24">
                          <IoIosArrowUp />
                        </span>
                      )}
                    </span>
                  </span>
                  {isOpen && (
                    <span className="md:ps-10 sm:ps-5 sm:mt-2 text-[14px]  ">
                      <Link to="/settings/contact-info">
                        {" "}
                        <li
                          className={` py-1 px-2 mb-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer ${
                            path === "/settings/contact-info" &&
                            "sidebar-active"
                          }`}
                        >
                          Updated Contact Information
                        </li>
                      </Link>
                      <Link to="/settings/phonenumber">
                        {" "}
                        <li
                          className={`mt-2 py-1 px-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer ${
                            path === "/settings/phonenumber" && "sidebar-active"
                          }`}
                        >
                          Change Registered Number
                        </li>
                      </Link>
                      <Link to="/settings/email">
                        {" "}
                        <li
                          className={`mt-2 py-1 px-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer ${
                            path === "/settings/email" && "sidebar-active"
                          }`}
                        >
                          Email Settings
                        </li>
                      </Link>
                      <Link to="/settings/block-profile">
                        {" "}
                        <li
                          className={`mt-2  mb-2 py-1 px-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer ${
                            path === "/settings/block-profile" &&
                            "sidebar-active"
                          }`}
                        >
                          Blocked Profile
                        </li>
                      </Link>
                      <Link to="/settings/delete-profile">
                        {" "}
                        <li
                          className={`mt-2 py-1 px-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer ${
                            path === "/settings/delete-profile" &&
                            "sidebar-active"
                          }`}
                        >
                          Delete Profile
                        </li>
                      </Link>
                      <li
                        onClick={openLogoutPopup}
                        className="mt-2 py-1 px-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer"
                      >
                        Logout
                      </li>
                    </span>
                  )}
                </ul>
              </>
            </div>
          </div>
        </>
      )}
      <>
  
 
    <div className="px-6 w-screen">
      <div className="bg-primary   mt-2 py-3  rounded-lg  md:hidden sm:hidden ss:hidden xl:hidden  mobile-shadow  ">
        <span className="flex items-center justify-center gap-6">
          {/* <span className=" bg-green-500 rounded-full w-[12px] h-[12px] absolute left-[120px]    mt-9"></span> */}
          <div className="flex  justify-center items-center relative ">
            <span className=" bg-green-500 rounded-full w-[10px] h-[10px] absolute  left-[70px] mt-9"></span>
            <img
              src={sidebarData?.formData?.selfDetails?.profilePictureUrl}
              loading="lazy"
              className="text-[32px] w-20 h-20  rounded-full border-2 border-white"
              alt="Profile"
            />
          </div>
          <span className=" text-white ">
            <p className="text-center font-montserrat font-medium mt-3 text-[20px]  ">
              {sidebarData?.formData?.basicDetails?.name?.replace(
                "undefined",
                ""
              ) || "NA"}
            </p>
            <p
              onMouseEnter={handleMouseEnterCountry}
              onMouseLeave={handleMouseLeaveCountry}
              className="text-center font-montserrat cursor-pointer"
            >
              {" "}
              {sidebarData?.formData?.additionalDetails?.stateatype ||
                "NA"}{" "}
              {sidebarData?.formData?.additionalDetails?.countryatype?.slice(
                0,
                7
              ) || "NA"}
              ..{" "}
            </p>
            {showCountry && (
              <div className="w-auto text-white bg-primary  absolute px-3  rounded-lg ">
                <p>
                  {" "}
                  {sidebarData?.formData?.additionalDetails?.stateatype ||
                    "NA"}{" "}
                  {sidebarData?.formData?.additionalDetails?.countryatype ||
                    "NA"}
                </p>
              </div>
            )}
            <p className="text-center font-medium text-[17px]">
              ({sidebarData?.formData?.userId})
            </p>
          </span>
        </span>
        <span className="flex items-start justify-evenly text-white mt-3  gap-3 leading-8">
          <span className="font-light text-start">
            <p>
              {sidebarData?.formData?.basicDetails?.age
                ? sidebarData?.formData?.basicDetails?.age + "yrs"
                : "NA"}
              {", "}{" "}
              {sidebarData?.formData?.additionalDetails?.height
                ? sidebarData?.formData?.additionalDetails?.height + "ft"
                : "NA"}
            </p>
            <p> {formattedDateOfBirth || "NA"}</p>

            <p>{transformedMaritalStatus}</p>
          </span>
          <span className="font-light text-start">
           

            <p>
              {sidebarData?.formData?.basicDetails?.timeOfBirth || "NA"}
            </p>

            <p
              className="cursor-pointer"
              onMouseEnter={handleMouseEnterComm}
              onMouseLeave={handleMouseLeaveComm}
            >
              {" "}
              {sidebarData?.formData?.familyDetails?.communityftype
                ? sidebarData?.formData?.familyDetails?.communityftype?.slice(
                    0,
                    12
                  )
                : "NA"}
              ..
            </p>
            {showCommunity && (
              <p className="absolute  text-white  w-20 p-2 bg-primary  rounded-lg ">
                {sidebarData?.formData?.familyDetails?.communityftype
                  ? sidebarData?.formData?.familyDetails?.communityftype
                  : "NA"}
              </p>
            )}
            <p
              onMouseEnter={handleMouseEnterProf}
              onMouseLeave={handleMouseLeaveProf}
              className="cursor-pointer"
            >
              {sidebarData?.formData?.careerDetails?.professionctype?.slice(
                0,
                10
              ) || "NA"}
              ..
            </p>
            {showProf && (
              <div className="w-auto text-white bg-primary  absolute  rounded-lg p-1">
                <p>
                  {" "}
                  {sidebarData?.formData?.careerDetails?.professionctype ||
                    "NA"}
                </p>
              </div>
            )}
          </span>
        </span>
      </div>
    </div>
 
</>
    </>

  );
};



export default SideBar;
