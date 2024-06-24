import React, { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillGrid1X2Fill } from "react-icons/bs";

import { LuCopyPlus } from "react-icons/lu";
import { VscSettingsGear } from "react-icons/vsc";
import { GiSelfLove } from "react-icons/gi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { HiPencilSquare } from "react-icons/hi2";

import {
  getCitiesByState,
  getCountries,
  getStatesByCountry,
} from "../../common/commonFunction";
import { useDispatch, useSelector } from "react-redux";
import { logout, userDataStore } from "../../Stores/slices/AuthSlice";


import apiurl from "../../util";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LogoutPop from './../PopUps/LogoutPop';

const SideBar = () => {
  const [sidebarData, setSidebarData] = useState([]);

  const { userData, userId } = useSelector(userDataStore);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const path = window.location.pathname;
  const [community, setCommunity] = useState()
  const [showProf, setShowProf] = useState(false);
  const [isLogoutOpen, setisLogoutOpen] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  
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
        const formData = userData?.basicDetails;
        const selfDetails = userData?.selfDetails;
        const perosnalData = userData?.additionalDetails;
        const educationData = userData?.careerDetails;
        const additionalDetails = userData?.familyDetails;
        setSidebarData([
          formData,
          perosnalData,
          educationData,
          additionalDetails,
          selfDetails,
        ]);
        setResponse(formData?.userId)
        setLoading(false);
  }, [userId, 1]);

  const maritalStatusMapping = {
    'single': 'Single',
    'awaitingdivorce': 'Awaiting Divorce',
    'divorcee': 'Divorcee',
    'widoworwidower': "Widow or Widower"
    // Add other mappings as needed
  };
  const transformedMaritalStatus = maritalStatusMapping[sidebarData[1]?.maritalStatus] || 'NA';
  

  const dateOfBirth = sidebarData[0]?.dateOfBirth;

// Function to reformat date
function reformatDate(dateStr) {
    if (!dateStr) return null; // Handle case where date is not provided
    const [year, month, day] = dateStr?.split('-');
    return `${day}-${month}-${year}`;
}

// Apply the function
const formattedDateOfBirth = reformatDate(dateOfBirth);

console.log(formattedDateOfBirth);
  return (
    <>
      {/* <div className="px-6  md:w-1/4 sm:w-[39%]  z-30 mt-28 absolute md:block sm:block hidden">
          <Skeleton height={620} />
        </div> */}
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
                <span className=" bg-green-500 rounded-full w-[13px] h-[13px] absolute left-[165px]  mt-20"></span>
                <img
                  src={sidebarData[4]?.profilePictureUrl}
                  className="text-[32px] w-20 h-20 mt-10 rounded-full border-2 border-white"
                  alt="Profile"
                />
              </div>
              {sidebarData.length > 0 && (
                <>
                  <p className="text-center font-montserrat font-light mt-3 ">
                    {sidebarData[0]?.name?.replace("undefined", "") || "NA"}
                  </p>
                  <p className="text-center font-extralight">
                        {" "}
                        {sidebarData[1]?.stateatype || "NA"}{", "}
                        {sidebarData[1]?.countryatype || "NA"}
                       
                      </p>
                  <p className="text-center font-light">({response})</p>
                  <span className="flex items-start justify-between px-5 mt-3 text-start ">
                    <span className="font-light">
                      <p>
                        {sidebarData[0]?.age ? sidebarData[0]?.age + "yrs" : "NA"}
                        ,{" "}
                        {sidebarData[1]?.height
                          ? sidebarData[1]?.height + "ft"
                          : "NA"}
                      </p>
                      <p>{formattedDateOfBirth}</p>
                      <p>
                        {transformedMaritalStatus
                         }
                      </p>
                      <p>
                      
                      </p>
                     
         
                    </span>
                    <span className="font-light text-start">
                      <p
                      className="cursor-pointer"
                      onMouseEnter={handleMouseEnterComm}
                      onMouseLeave={handleMouseLeaveComm}>
                        {" "}
                       
                        {sidebarData[3]?.communityftype
                          ? sidebarData[3]?.communityftype?.slice(0, 12)
                          : "NA"}..
                      </p>
                      {showCommunity && (
                      <p className="absolute  text-white  w-20 p-2 bg-primary  rounded-lg ">
                        
                        {sidebarData[3]?.communityftype
                          ? sidebarData[3]?.communityftype
                          : "NA"}
                        </p>
                  
                    )}

                      <p> {sidebarData[0]?.timeOfBirth || "NA"}</p>
                    

                      {/* <p>
                        {sidebarData[1]?.dietatype?.slice(0, 9) ||
                          "NA"}
                      </p> */}
                      <p
                      onMouseEnter={handleMouseEnterProf}
                    onMouseLeave={handleMouseLeaveProf}
                    className="cursor-pointer">{sidebarData[2]?.professionctype?.slice(0, 10)  || "NA"}..</p>
                     {showProf && (
        <div className="w-auto text-white bg-primary  absolute  rounded-lg ">
          <p>  {sidebarData[2]?.professionctype || "NA"}</p>
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
                      <li  className={`flex items-center`}>
                      <span className="text-[23px]">    <BsFillGrid1X2Fill /></span>
                        <span  className="px-3">Dashboard</span>
                      </li>
                    </Link>
                    <Link
                      className={` py-2 mt-2 px-2 hover:bg-white hover:text-primary rounded-xl cursor-pointer pointer `}
                      to="/profile"
                      state={{
              
                        location: location.pathname,
                      }}
                    >
                      <li  className={`flex items-center`}>
                      <span className="text-[23px]">     <HiPencilSquare  /></span>
                        <span className="px-4">My Profile</span>
                      </li>
                    </Link>
                    <Link
                      className=" py-2 px-2 mt-2  hover:bg-white hover:text-primary rounded-xl cursor-pointer"
                      to="/image-edit"
                    >
                      <li className={`flex items-center`}>
                      <span className="text-[25px]">    <LuCopyPlus /></span>
                        <span className="px-4">My Photos</span>
                      </li>
                    </Link>
                    <Link
                      className=" py-2 px-2 mt-2 hover:bg-white hover:text-primary rounded-xl cursor-pointer"
                      to="/partner-edit"
                    >
                      <li className={`flex items-center`}>
                      <span className="text-[25px]">      <GiSelfLove /></span>
                        <span className="px-4">Partner Preference</span>
                      </li>
                    </Link>
                    <span className="flex items-center  mt-2  bg-transparent py-2 px-2   hover:bg-white hover:text-primary rounded-xl cursor-pointer">
                   <span className="text-[23px]">   <VscSettingsGear  /></span>
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
                          <li className={` py-1 px-2 mb-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer ${path === "/settings/contact-info" && "sidebar-active" }` }>
                            Updated Contact Information
                          </li>
                        </Link>
                        <Link to="/settings/phonenumber">
                          {" "}
                          <li className={`mt-2 py-1 px-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer ${path === "/settings/phonenumber" && "sidebar-active" }`}>
                            Change Registered Number
                          </li>
                        </Link>
                        {/* <Link to="/settings/whatsapp">
                          {" "}
                          <li className={`mt-2 py-1 px-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer ${path === "/settings/contact-info" && "sidebar-active" }`}>
                            Whatsapp Settings
                          </li>
                        </Link> */}
                        <Link to="/settings/email">
                          {" "}
                          <li className={`mt-2 py-1 px-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer ${path === "/settings/email" && "sidebar-active" }`}>
                            Email Settings
                          </li>
                        </Link>
                        <Link to="/settings/block-profile">
                          {" "}
                          <li className={`mt-2  mb-2 py-1 px-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer ${path === "/settings/block-profile" && "sidebar-active" }`}>
                            Blocked Profile
                          </li>
                        </Link>
                        <Link to="/settings/delete-profile">
                          {" "}
                          <li className={`mt-2 py-1 px-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer ${path === "/settings/delete-profile" && "sidebar-active" }`}>
                            Delete Profile
                          </li>
                        </Link>
                        <li onClick={openLogoutPopup} className="mt-2 py-1 px-2 hover:bg-white hover:text-primary rounded-lg cursor-pointer">
                          Logout
                        </li>
                      </span>
                    )}
                  </ul>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* //resposive sidebar profile card on dashboard */}

      {/* //responsive hamburger menu */}
    </>
  );
};

const ResponsiveDetail = () => {
  const [sidebarData, setSidebarData] = useState([]);

  const { userData, userId } = useSelector(userDataStore);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [showProf, setShowProf] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
 
  const handleMouseEnterProf = () => {
    setShowProf(true);
  };

  const handleMouseLeaveProf = () => {
    setShowProf(false);
  };
  const handleMouseEnterComm = () => {
    setShowCommunity(true);
  };

  const handleMouseLeaveComm = () => {
    setShowCommunity(false);
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
      console.error("Error fetching community data:", error);
      return [];
    }
  };

  useEffect(() => {
    getCountries();
    getCitiesByState();
    getStatesByCountry();
    getCommunityData();
  }, [userId, 1]);
  useEffect(() => {

        const formData = userData?.basicDetails;
        const selfDetails = userData?.selfDetails;
        const perosnalData = userData?.additionalDetails;
        const educationData = userData?.careerDetails;
        const additionalDetails = userData?.familyDetails;
        setSidebarData([
          formData,
          perosnalData,
          educationData,
          additionalDetails,
          selfDetails,
        ]);
        setResponse(formData?.userId)
        setLoading(false);
  }, [userId]);

console.log(sidebarData,"kl");

  return (
    <>
     {/* <div className="px-6  w-full  z-30 mt-28 md:hidden sm:hidden xl:hidden ">
          <Skeleton height={270} />
        </div> */}
          {loading ? (
            <div className="px-6  w-full  z-30  md:hidden sm:hidden xl:hidden ">
          <Skeleton height={270} />
        </div>
      ) : (
      <div className="px-6 w-screen">
        <div className="bg-primary   mt-2 py-3  rounded-lg  md:hidden sm:hidden ss:hidden xl:hidden  mobile-shadow  ">
          <span className="flex items-center justify-center gap-6">
            {/* <span className=" bg-green-500 rounded-full w-[12px] h-[12px] absolute left-[120px]    mt-9"></span> */}
            <img
            src={sidebarData[4]?.profilePictureUrl}
              className="text-[32px] w-20 h-20  rounded-full border-2 border-white"
              alt="Profile"
            />

            <span className=" text-white ">
              <p className="text-center font-montserrat font-medium mt-3 text-[20px]  ">
              {sidebarData[0]?.name?.replace("undefined", "") || "NA"}
              </p>
              <p className="text-center font-montserrat">  {`${sidebarData[1]?.countryatype || "NA"} ${sidebarData[1]?.stateatype || "NA"}`}</p>
              <p className="text-center font-medium text-[17px]">({response})</p>
            </span>
          </span>
          <span className="flex items-start justify-evenly text-white mt-3  gap-3 leading-8">
            <span className="font-light text-start">
              <p>{sidebarData[0]?.age ? sidebarData[0]?.age + "yrs" : "NA"}
            {", "}  {sidebarData[1]?.height
                          ? sidebarData[1]?.height + "ft"
                          : "NA"}</p>
              <p> {sidebarData[0]?.dateOfBirth}</p>
             
              <p
                      onMouseEnter={handleMouseEnterProf}
                    onMouseLeave={handleMouseLeaveProf}
                    className="cursor-pointer">{sidebarData[2]?.professionctype?.slice(0, 10)  || "NA"}..</p>
                     {showProf && (
        <div className="w-auto text-white bg-primary  absolute  rounded-lg ">
          <p>  {sidebarData[2]?.professionctype || "NA"}</p>
        </div>
      )}
         
              <p> {sidebarData[1]?.maritalStatus
                          ? sidebarData[1]?.maritalStatus
                          : "NA"}</p>
            </span>
            <span className="font-light text-start">
              {/* <p> {community.find(item => item.communityId === sidebarData.community)?.communityName || "NA"}, Hindu</p> */}
             
             
              <p>{sidebarData[0]?.timeOfBirth || "NA"}</p>
              <p> {sidebarData[1]?.dietatype?.slice(0, 9)  || "NA"}</p>
              <p
                      className="cursor-pointer"
                      onMouseEnter={handleMouseEnterComm}
                      onMouseLeave={handleMouseLeaveComm}>
                        {" "}
                       
                        {sidebarData[3]?.communityftype
                          ? sidebarData[3]?.communityftype?.slice(0, 12)
                          : "NA"}..
                      </p>
                      {showCommunity && (
                      <p className="absolute  text-white  w-20 p-2 bg-primary  rounded-lg ">
                        
                        {sidebarData[3]?.communityftype
                          ? sidebarData[3]?.communityftype
                          : "NA"}
                        </p>
                  
                    )}
            </span>
          </span>
        </div>
      </div>
    )}
    </>
  );
};

export { SideBar, ResponsiveDetail };
export default SideBar;
