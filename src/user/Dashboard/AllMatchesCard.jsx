import React, { lazy, useEffect, useState } from "react";
import Header from "../../components/Header";
import { userprofiledata } from "../../DummyData/userProfile";
import SideBar, { ResponsiveDetail } from "./SideBar";

import { about, logo, menu } from "../../assets";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import { RxCross2 } from "react-icons/rx";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MobileSidebar from "./MobileSidebar";
import { TbEyeCheck, TbEyePlus } from "react-icons/tb";
import { MdBlock } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

import apiurl from "../../util";

import { LuUserPlus } from "react-icons/lu";

import BlockPop from "../PopUps/BlockPop";
import { openPopup } from "../../Stores/slices/PopupSlice";
import { toast } from "react-toastify";
import { getMasterData } from "../../common/commonFunction";

const AllMatchesCard = ({ profileDetails, setIsBlockedUser }) => {
  const { userData, userId } = useSelector(userDataStore);
  const [profileRequestSent, setProfileRequestSent] = useState(
    profileDetails?.isProfileRequest || false
  );
  const [interstRequestSent, setInterestRequestSent] = useState(
    profileDetails?.isInterestRequest || false
  );
  const [isShortlisted, setIsShortListed] = useState(
    profileDetails?.isShortlisted || false
  );
  // const [shortlist, setShortlist] = useState(0);
  const [diet, setDiet] = useState([]);
  const [isOpenPop, setIsOpenPop] = useState(false);
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state) => state.popup[profileDetails?._id] || false
  );
  const [showProf, setShowProf] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [showdiet, setShowDiet] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showProfileName, setShowProfileName] = useState(false);
  const [showInterestName, setShowInterestName] = useState(false);
  const [profileMessage, setProfileMessage] = useState({});
  const [interestMessage, setInterestMessage] = useState({});
  const [isMarital, setMarital] = useState(false);
  const handleMouseEnterMarital = () => {
    setMarital(true);
  };

  const handleMouseLeaveMarital = () => {
    setMarital(false);
  };

  const handleMouseEnterProfile = () => {
    setShowProfileName(true);
  };

  const handleMouseLeaveProfile = () => {
    setShowProfileName(false);
  };
  const handleMouseEnterInterest= () => {
    setShowInterestName(true);
  };

  const handleMouseLeaveInterest = () => {
    setShowInterestName(false);
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
  // const handleMouseEnterCountry = () => {
  //   setShowCountry(true);
  // };

  // const handleMouseLeaveCountry = () => {
  //   setShowCountry(false);
  // };

  useEffect(() => {
    async function getData(val) {
      const diet = await getMasterData("diet");
      setDiet(diet);
    }
    getData();
  }, []);

  const ShortlistedData = async () => {
    if (userId && profileDetails) {
      try {
        const response = await apiurl.post(`/shortlist/add`, {
          user: userId,
          shortlistedUserId: profileDetails?._id,
        });

        if (response.status === 200) {
          const matchRequest = response.data;
          console.log("Match request sent successfully:", matchRequest);
          toast.info(response.data.message);
          setIsShortListed(!isShortlisted);
          return matchRequest;
        } else {
          // If the request failed, throw an error
          toast.info(response.data.message);
          setIsShortListed(!isShortlisted);
          throw new Error("Failed to send match request");
        }
      } catch (error) {
        console.error("Error sending match request:", error);
        throw error;
      }
    }
  };
  const handleOpenPopup = () => {
    // dispatch(openPopup({ cardId: profileDetails._id }));
    // Open popup for specific card
    setIsOpenPop(true);
  };
  const closeblockPop = () => {
    setIsOpenPop(false);
  };
  const sendProfileRequest = async () => {
    try {
      if (userId) {
        const response = await apiurl.post("/api/profile-request/send", {
          profileRequestBy: userId,
          profileRequestTo: profileDetails?._id,
        });
        setProfileMessage(response.data)

        toast.success(response.data === "Profile request updated to pending" || response.data === "You have sent the Profile request from your declined section" ? "Profile request sent successfully" : response.data);
        console.log("Profile request sent successfully");
        // Update the state to indicate that the request has been sent
        setProfileRequestSent(true);
      } else {
        console.error("Error: userId is not present");
        // toast.error("something went wrong");
      }
    } catch (error) {
      console.error("Error sending profile request:", error);
      toast.error(error.response.data);
    }
  };
  const blockUser = async () => {
    try {
      if (userId) {
        await apiurl.post("/block-user", {
          blockBy: userId,
          blockUserId: profileDetails?._id,
        });
        toast.success("User blocked");
        console.log("user blocked successfully");
        // Update the state to indicate that the request has been sent
        //   setProfileRequestSent(true);
        setIsBlockedUser(true);
      } else {
        toast.error("Something went wrong");
        console.error("Error: userId is not present");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error blocking user:", error);
    }
  };
  const sendIntrestRequest = async () => {
    try {
      if (userId) {
        const response = await apiurl.post("/api/interest-request/send", {
          interestRequestBy: userId,
          interestRequestTo: profileDetails?._id,
        });
        setInterestMessage(response.data)

        toast.success(response.data === "Interest request updated to pending" || response.data === "You have sent the Interest request from your declined section" ? "Interest request sent successfully" : response.data);
        console.log("Interest request sent successfully");
        setInterestRequestSent(true);
      } else {
        console.error("Error: userId is not present");
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error(error.response.data);
      console.error("Error sending interest request:", error);
    }
  };
  console.log(profileDetails, "makl");


  const maritalStatusMapping = {
    'single': 'Single',
    'awaitingdivorce': 'Awaiting Divorce',
    'divorcee': 'Divorcee',
    'widoworwidower': "Widow or Widower"
    // Add other mappings as needed
  };
  const transformedMaritalStatus = maritalStatusMapping[profileDetails?.additionalDetails[0]?.maritalStatus] || 'NA';

  const dateOfBirth = profileDetails?.basicDetails[0]?.dateOfBirth;

  // Function to reformat date
  function reformatDate(dateStr) {
      if (!dateStr) return null; // Handle case where date is not provided
      const [year, month, day] = dateStr?.split('-');
      return `${day}-${month}-${year}`;
  }
  
  const height = profileDetails?.additionalDetails[0]?.height;
  const formattedHeight = height
    ? String(height).replace("undefined", "") + "ft"
    : "NA";
  // Apply the function
  const formattedDateOfBirth = reformatDate(dateOfBirth);


  function formatTime(timeString) {
    if (!timeString) return "NA";
    
    // Split the time string into its components
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    
    // Parse hours and minutes
    let hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    
    // Adjust hour for AM/PM
    if (period === 'PM' && hour !== 12) {
        hour += 12;
    } else if (period === 'AM' && hour === 12) {
        hour = 0;
    }
    
    // Format hours for 12-hour clock and pad minutes if necessary
    const formattedHour = hour % 12 || 12;
    const formattedMinutes = minute < 10 ? `0${minute}` : minute;
    
    return `${formattedHour}:${formattedMinutes} ${period}`;
  }
  
  // Usage example
  const timeOfBirth = profileDetails?.basicDetails[0]?.timeOfBirth;
  const formattedTime = timeOfBirth !== "NA" ? formatTime(timeOfBirth) : "NA";
  return (
    <div className="  shadow rounded-lg flex flex-col md:px-3  justify-between relative items-center md:w-auto w-[50vh]  sm:w-[70%] ">
      {/* <span
        onClick={() => {
          handleCrossClick(profileDetails._id);
        }}
        className="text-primary text-[28px] absolute right-0 m-2 cursor-pointer"
      >
        {" "}
        <RxCross2 />
      </span> */}
      {isOpenPop && (
        <span className="absolute">
          <BlockPop
            setIsOpen={setIsOpenPop}
            closeblockPop={closeblockPop}
            cardId={profileDetails._id}
            blockUser={blockUser}
          />
        </span>
      )}
      <img
      loading ="lazy"
        src={profileDetails.selfDetails[0].profilePictureUrl}
        alt="img"
        onError={(e) =>
          (e.target.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo88hNln0LTch7KlXro5JEeSFWUJqBVAxgEtagyZq9g&s")
        }
        className="rounded-full md:w-36 md:h-36 w-36 h-36  mt-8 border-primary border"
      />
      <p className="font-semibold pt-3  md:px-0 px-6 text-[19px] text-center md:w-80">
        {profileDetails?.basicDetails[0]?.name?.replace("undefined", "")}{" "}
      </p>
      <p
       
        className=" font-semibold md:px-0 px-6 text-[16px] text-center md:w-80"
      >
        {profileDetails?.additionalDetails[0]?.currentStateName || "NA"},{" "}
        {profileDetails?.additionalDetails[0]?.currentCountryName || "NA"}
        {" "}
      </p>
     
      <p className="font-semibold text-[16px]">
        ({profileDetails?.basicDetails[0]?.userId})
      </p>

      <span className="flex justify-center  items-center flex-col  mt-3  px-6 text-[16px]">
        <span className="flex justify-between md:w-72 w-60 items-center">
          <span className="font-regular text-start ">
            <p>
              {profileDetails?.basicDetails[0]?.age || "NA"}yrs{", "}
    {formattedHeight}
            </p>
            <p>{formattedDateOfBirth || "NA"}</p>
            <p   onMouseEnter={handleMouseEnterMarital}
                      onMouseLeave={handleMouseLeaveMarital}>{transformedMaritalStatus?.slice(0, 8)}..</p>
                       {isMarital && (
                      <div className="absolute   w-auto p-2 bg-white  rounded-lg ">
                        <p> {transformedMaritalStatus}</p>
                      </div>
                    )}
          </span>
          <span className="font-regular text-start ">
            <p
              onMouseEnter={handleMouseEnterComm}
              onMouseLeave={handleMouseLeaveComm}
              className="cursor-pointer"
            >
              {profileDetails?.familyDetails[0]?.community === 18
                ? "Open to all"
                : profileDetails?.familyDetails[0]?.communityName?.slice(
                    0,
                    12
                  ) || "NA"}
              ..{" "}
            </p>

            {showCommunity && (
              <div className="text-start absolute  w-auto p-1 bg-white border  rounded-lg ">
                <p>
                  {" "}
                  {profileDetails?.familyDetails[0]?.community === 18
                    ? "Open to all"
                    : profileDetails?.familyDetails[0]?.communityName || "NA"}
                </p>
              </div>
            )}
            <p>
              {formattedTime}
             
            </p>

          
            <p
              onMouseEnter={handleMouseEnterProf}
              onMouseLeave={handleMouseLeaveProf}
              
              className="cursor-pointer"
            >
              {profileDetails?.careerDetails[0]?.professionName?.slice(0, 10) ||
                "NA"}
              ...
            </p>
            {showProf && (
              <div className="text-start absolute  w-auto p-1 bg-white border  rounded-lg ">
                <p>
                  {" "}
                  {profileDetails?.careerDetails[0]?.professionName || "NA"}
                </p>
              </div>
            )}
          </span>
        </span>

        <div className="flex items-center justify-between w-72   md:px-0 px-6  mt-3 text-center pb-3">
          <span className="font-light ">
            <span
              onClick={sendProfileRequest}
              onMouseEnter={handleMouseEnterProfile}
              onMouseLeave={handleMouseLeaveProfile}
              className="bg-primary cursor-pointer text-white rounded-xl px-8 py-1 flex items-center"
            >
              <span
            >
               {profileMessage === "This person has already sent an Profile request to you"  ? (
  <TbEyePlus size={23} />
) : (
  profileDetails?.isProfileRequest || profileRequestSent ? (
    <TbEyeCheck size={23} />
  ) : (
    <TbEyePlus size={23} />
  )
)}
              </span>
              {showProfileName && (
              <div className="text-start text-black absolute -mt-16 w-auto p-1 bg-white border  font-DMsans rounded-lg ">
                <p>
                  {" "}
                  Profile Request
                </p>
              </div>
            )}
            </span>
            <span
              onClick={ShortlistedData}
         
              className="border border-primary cursor-pointer text-primary rounded-xl px-8 py-1 mt-2 flex items-center"
            >
              <span>
                {profileDetails.isShortListed || isShortlisted ? (
                  <IoBookmark size={23} />
                ) : (
                  <IoBookmarkOutline size={23} />
                )}
              </span>
             
            </span>
          </span>
          <span className="font-light">
            <span
              onClick={sendIntrestRequest}
              onMouseEnter={handleMouseEnterInterest}
              onMouseLeave={handleMouseLeaveInterest}
              className="bg-primary cursor-pointer rounded-xl px-8  py-1 flex items-center text-white"
            >
              <span>
              {interestMessage === "This person has already sent an Interest request to you"  ? (
                          <LuUserPlus size={23} />
                        ) : (
                          profileDetails?.isInterestRequest || interstRequestSent ? (
                            <FaUserCheck size={23} />
                          ) : (
                            <LuUserPlus size={23} />
                          )
                          )}
              </span>
              {showInterestName && (
              <div className="text-start text-black absolute -mt-20 w-auto p-1 bg-white border  font-DMsans rounded-lg ">
                <p>
                  {" "}
                  Interest Request
                </p>
              </div>
            )}
            </span>
            <span className="border text-primary cursor-pointer border-primary rounded-xl px-8 py-1 mt-2 flex items-center">
              <span onClick={handleOpenPopup}>
                <MdBlock size={23} />
              </span>
            </span>
          </span>
        </div>
      </span>
    </div>
  );
};

export default AllMatchesCard;
