import React, { useEffect, useState } from "react";
import { TbEyeCheck, TbEyePlus } from "react-icons/tb";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { FaCheck, FaUserCheck } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

import apiurl from "../../util";
import { useDispatch, useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import { FaXmark } from "react-icons/fa6";

import BlockPop from "../PopUps/BlockPop";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LuUserPlus } from "react-icons/lu";
import {
  getCountries,
  getMasterData,
  getStateById,
} from "../../common/commonFunction";

const OptionDetails = ({
  option,
  overAllDataId,
  isType,
  action,
  actionType,
  differentiationValue,
  isShortListedTo,
  isShortListedBy,
  isRequestTo,
  isRequestBy,
  setButtonClickFlag,
}) => {
  const { userId } = useSelector(userDataStore);
  const [isShortlisted, setIsShortListed] = useState(
    differentiationValue === "By" ? isShortListedBy : isShortListedTo
  );
  const [requestSent, setRequestSent] = useState(
    differentiationValue === "By" ? isRequestBy : isRequestTo
  );
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [profession, setProfession] = useState([]);
  const [diet, setDiet] = useState([]);
  const [Community, setCommunity] = useState([]);
  const location = useLocation();
  const [isOpenPop, setIsOpenPop] = useState(false);

  const [showProf, setShowProf] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [isMarital, setMarital]  = useState(false)
  // const [isLoading, setLoading] = useState(true); // Loading state

  const handleOpenPopup = () => {
    setIsOpenPop(true);
  };
  const closeblockPop = () => {
    setIsOpenPop(false);
  };

  // console.log(requestSent, "iiiiiiiiiiiiii");
  // console.log(option, overAllDataId, isType, action, actionType, differentiationValue, isShortListedTo, isShortListedBy, isRequestTo, isRequestBy, setButtonClickFlag, "iiiiiiiiiiiiii")

  useEffect(() => {
 
    async function getData(val) {
      try{
      // setLoading(true); 
      const profession = await getMasterData("profession");
      setProfession(profession);
      const diet = await getMasterData("diet");
      setDiet(diet);
      const community = await getMasterData("community");
      setCommunity(community);
      const countries = await getCountries();
      setCountries(countries);
      // const state = await getStatesByCountry();
      // setStates(state);
      const states = await getStateById(
        option.additionalDetails[0]?.currentlyLivingInState
      );
      setStates(states);
      // setLoading(false);
    }catch (error) {
    console.error("Error fetching data:", error);
    // setLoading(false); // Make sure to clear loading state on error too
  }
}
    getData();
  }, []);



  const blockUser = async () => {
    try {
      if (userId) {
        await apiurl.post("/block-user", {
          blockBy: userId,
          blockUserId: option?._id,
        });
        setButtonClickFlag(true);
        toast.success("User blocked");
        console.log("user blocked successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error blocking user:", error);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await apiurl.put(
        `/api/${isType}-request/accept/${requestId}?${isType}RequestToId=${userId}`
      );
      setButtonClickFlag(true);
      toast.success(response?.data?.responseMsg);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };


  
  const sendProfileRequest = async () => {
    try {
      if (userId) {
        const response = await apiurl.post("/api/profile-request/send", {
          profileRequestBy: userId,
          profileRequestTo: option?._id,
        });
        setRequestSent(true);
        setButtonClickFlag(true);
        toast.success(response.data);
      } else {
        toast.error("Somethimg went wrong");
        console.error("Error: userId is not present");
      }
    } catch (error) {
      toast.error("Somethimg went wrong");
      console.error("Error sending profile request:", error);
    }
  };

  const sendIntrestRequest = async () => {
    try {
      if (userId) {
        const response = await apiurl.post("/api/interest-request/send", {
          interestRequestBy: userId,
          interestRequestTo: option?._id,
        });
        setRequestSent(true);
        setButtonClickFlag(true);
        toast.success(response.data);
      }
    } catch (error) {
      toast.error("Somethimg went wrong");
      console.error("Error sending interest request:", error);
    }
  };

  const Shortlisted = async () => {
    if (userId && option) {
      try {
        const response = await apiurl.post(`/shortlist/add`, {
          user: userId,
          shortlistedUserId: option?._id,
        });

        toast.success(response.data.message);
        const matchRequest = response.data;
        console.log("Match request sent successfully:", matchRequest);
        setIsShortListed(!isShortlisted);
        return matchRequest;
      } catch (error) {
        console.error("Error sending match request:", error);
        throw error;
      }
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      const response = await apiurl.put(
        `/api/${isType}-request/decline/${requestId}?${isType}RequestToId=${userId}`
      );
      setButtonClickFlag(true);
      toast.error("Request Declined");
      console.log("response", response);
    } catch (error) {
      toast.error("Somethimg went wrong");
      console.error("Error declining request:", error);
    }
  };

  const handleCancelRequest = async (requestId) => {
    try {
      await apiurl.put(
        `/api/${isType}-request/cancel/${requestId}?${isType}RequestById=${userId}`
      );
      setButtonClickFlag(true);
      toast.success("Request cancelled");
    } catch (error) {
      toast.error("Somethimg went wrong");
      console.error("Error declining request:", error);
    }
  };

  useEffect(() => {
    setIsShortListed(
      differentiationValue === "By" ? isShortListedBy : isShortListedTo
    );
    setRequestSent(differentiationValue === "By" ? isRequestBy : isRequestTo);
  }, [
    differentiationValue,
    isShortListedBy,
    isShortListedTo,
    isRequestBy,
    isRequestTo,
  ]);

  // console.log(option?.basicDetails[0])
  const maritalStatusMapping = {
    single: "Single",
    awaitingdivorce: "Awaiting Divorce",
    divorcee: "Divorcee",
    widoworwidower: "Widow or Widower",
    // Add other mappings as needed
  };
  const transformedMaritalStatus =
    maritalStatusMapping[option?.additionalDetails[0]?.maritalStatus] || "NA";
  // console.log(personalDatas,"llllll")

  const handleMouseEnterComm = () => {
    setShowCommunity(true);
  };

  const handleMouseLeaveComm = () => {
    setShowCommunity(false);
  };


  const handleMouseEnterMarital = () => {
    setMarital(true);
  };

  const handleMouseLeaveMarital = () => {
    setMarital(false);
  };

  const handleMouseEnterProf = () => {
    setShowProf(true);
  };
  console.log(states); // Check the structure of 'state' here

  const handleMouseLeaveProf = () => {
    setShowProf(false);
  };


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
  const timeOfBirth = option?.basicDetails[0]?.timeOfBirth || "NA";
  const formattedTime = timeOfBirth !== "NA" ? formatTime(timeOfBirth) : "NA";
  console.log(option?.basicDetails[0]?.timeOfBirth, "klk");
  return (
    <>
      {isOpenPop && (
        <span className="absolute">
          <BlockPop
            cardId={option._id}
            setIsOpen={setIsOpenPop}
            blockUser={blockUser}
            closeblockPop={closeblockPop}
          />
        </span>
      )}
      
      {/* {isLoading ? (
        <>
        <div className=" w-full  ">
      <Skeleton height={500} />
    </div>
    <div className=" w-full mt-9 ">
    <Skeleton height={500} />
    </div>
    </>
      ) : ( */}
      
      <div className="  mt-9 md:mt-0 sm:mt-0 sm:pr-6 mx-6   sm:mx-0 relative">
        <div className="shadow flex md:flex-row flex-col pb-5 md:pb-3 sm:mb-9 sm:flex-row md:w-[38rem] justify-center  md:py-3 sm:py-2  items-center px-3 rounded-2xl  sm:w-[97%] w-full  mb-6 ">
          <span>
            <img
              src={option?.selfDetails[0]?.profilePictureUrl || ""}
              alt=""
              onError={(e) =>
                (e.target.src =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo88hNln0LTch7KlXro5JEeSFWUJqBVAxgEtagyZq9g&s")
              }
              className="md:w-60 md:h-64 sm:w-60 sm:h-64 w-40 h-40 md:rounded-lg sm:rounded-lg rounded-full mt-[12%] md:mt-0 sm:mt-0"
            />
          </span>
          <div className="mx-2">
            <span>
              <span>
                <p className="md:text-start mt-5  sm:text-start text-center  md:mb-0 sm:mb-0 px-6 w-72  text-[17px] font-semibold capitalize ">
                  {option?.basicDetails[0]?.name?.replace("undefined", "")}{" "}
                </p>
                <p
                 
                  className=" md:text-start  sm:text-start text-center mb-2 md:mb-0 sm:mb-0 px-6 w-72  text-[17px] font-semibold capitalize"
                >
                
                {states?.state_name || "NA"}{", "}
                  {(countries.length > 0 &&
                    countries
                      ?.filter(
                        (count) =>
                          count.country_id ==
                          option?.additionalDetails[0]?.currentlyLivingInCountry
                      )[0]
                      ?.country_name) ||
                    "NA"}
                  
                </p>

               
                <p className="md:text-start  sm:text-start text-center mb-5 md:mb-0 sm:mb-0 px-6 w-72  text-[17px] font-semibold capitalize">
                  {" "}
                  ({option?.basicDetails[0]?.userId})
                </p>
              </span>
              <div className="flex justify-center flex-col  items-center  ">
                <span className="flex justify-between  items-center gap-16 md:w-full w-72  pl-6 text-[16px] mt-2">
                  <span className="font-regular text-start w-1/2 ">
                    <p>
                      {option?.basicDetails[0]?.age}yrs{" ,"}
                      {option?.additionalDetails[0]?.height || "NA"}ft
                    </p>
                    <p>{option?.basicDetails[0]?.dateOfBirth}</p>


                    <p
                     onMouseEnter={handleMouseEnterMarital}
                     onMouseLeave={handleMouseLeaveMarital}
                    >{transformedMaritalStatus?.slice(0, 8)}..</p>
                     {isMarital && (
                      <div className="absolute   w-auto p-2 bg-white  rounded-lg ">
                        <p>
                          {" "}
                          
                        {transformedMaritalStatus}
                        </p>
                      </div>
                    )}
                  </span>
                  <span className="font-regular text-start w-1/2">
                    <p
                      onMouseEnter={handleMouseEnterComm}
                      onMouseLeave={handleMouseLeaveComm}
                      className="cursor-pointer"
                    >
                      {(Community.length > 0 &&
                        Community?.filter(
                          (comm) =>
                            comm?.community_id ==
                            option?.familyDetails[0]?.community
                        )[0]?.community_name?.slice(0, 12)) ||
                        "NA"}
                      ..
                    </p>
                    {showCommunity && (
                      <div className="absolute   w-auto p-2 bg-white  rounded-lg ">
                        <p>
                          {" "}
                          {(Community.length > 0 &&
                            Community?.filter(
                              (comm) =>
                                comm?.community_id ==
                                option?.familyDetails[0]?.community
                            )[0]?.community_name) ||
                            "NA"}
                        </p>
                      </div>
                    )}

                    <p>{formattedTime}</p>

                    <p
                      onMouseEnter={handleMouseEnterProf}
                      onMouseLeave={handleMouseLeaveProf}
                      className="cursor-pointer"
                    >
                      {profession.length > 0 &&
                        profession
                          ?.filter(
                            (prof) =>
                              prof.proffesion_id ==
                              option?.careerDetails[0]?.profession
                          )[0]
                          ?.proffesion_name?.slice(0, 10)}
                      ..
                    </p>
                    {showProf && (
                      <div className="absolute   w-auto p-2 bg-white  rounded-lg ">
                        <p>
                          {" "}
                          {profession.length > 0 &&
                            profession?.filter(
                              (prof) =>
                                prof.proffesion_id ==
                                option?.careerDetails[0]?.profession
                            )[0]?.proffesion_name}
                        </p>
                      </div>
                    )}
                    {/* <p>
                      {diet?.length > 0 &&
                        diet?.filter(
                          (dietDetail) =>
                            dietDetail.diet_id ==
                            option?.additionalDetails[0]?.diet
                        )[0]?.diet_name}
                    </p> */}
                    {/* <p>{Community.length > 0 && Community.filter((comm) => comm.community_id == option?.familyDetails[0]?.community)[0].community_name}</p> */}
                  </span>
                </span>
                {actionType === "accepted" && (
                  <div className="mt-2 flex flex-col  ml-2  ">
                    <Link
                      to="/profile"
                      state={{
                        userId: option?._id,
                        location: location.pathname,
                      }}
                      className="text-center bg-primary md:w-[246px] w-[246px] sm:w-[245px]  py-2 text-white rounded-md cursor-pointer"
                    >
                      View Profile
                    </Link>
                    <span className="flex items-center justify-between cursor-pointer ">
                      <span
                        onClick={Shortlisted}
                        className="border border-primary text-primary rounded-xl px-7 py-[2px]  mt-2 flex items-center"
                      >
                        {isShortlisted ? (
                          <IoBookmark size={23} />
                        ) : (
                          <IoBookmarkOutline size={23} />
                        )}
                      </span>
                      <span
                        onClick={handleOpenPopup}
                        className="text-primary rounded-xl px-5 py-1 mt-2  flex items-center text-[26px]"
                      >
                        <MdBlock />
                      </span>
                    </span>
                  </div>
                )}
                {actionType === "pending" && action === "sent" && (
                  // Render buttons for sent requests
                  <div className="mt-2 flex flex-col  px-6 ">
                    <span
                      onClick={() => {
                        handleCancelRequest(overAllDataId);
                      }}
                      className="text-center bg-primary md:w-[17rem] w-[245px] sm:w-60  py-2 text-white rounded-md cursor-pointer"
                    >
                      Cancel Request
                    </span>
                    <span className="flex items-center justify-between cursor-pointer ">
                      <span
                        onClick={Shortlisted}
                        className="border border-primary text-primary rounded-xl px-7 py-[2px]  mt-2 flex items-center"
                      >
                        {isShortlisted ? (
                          <IoBookmark size={23} />
                        ) : (
                          <IoBookmarkOutline size={23} />
                        )}
                      </span>
                      <span
                        onClick={handleOpenPopup}
                        className="text-primary rounded-xl px-3 py-1 mt-2  flex items-center text-[26px]"
                      >
                        <MdBlock />
                      </span>
                    </span>
                  </div>
                )}
                {actionType === "pending" && action === "recieved" && (
                  // Render buttons for sent requests
                  <div className="mt-6 flex flex-row justify-between w-full   px-6 mb-2 ">
                    <span
                      onClick={() => handleDeclineRequest(overAllDataId)}
                      className="flex items-center border border-primary text-primary font-medium py-2 px-3  rounded-md cursor-pointer"
                    >
                      <FaXmark size={20} />
                      <span className="text-center  px-2">Decline</span>
                    </span>

                    <span
                      onClick={() => handleAcceptRequest(overAllDataId)}
                      className="flex items-center bg-primary text-white font-medium py-2 px-3 rounded-md cursor-pointer"
                    >
                      <FaCheck />
                      <span className="text-center  px-2">Accept</span>
                    </span>
                  </div>
                )}

                {actionType === "declined" && (
                  // Render buttons for declined requests
                  <div className="flex flex-row justify-between px-6 w-full  mt-5 text-center pb-5">
                    <span className="font-light">
                      <span
                        onClick={sendProfileRequest}
                        className="bg-primary rounded-xl px-8 py-1 flex  items-center cursor-pointer text-white"
                      >
                        {isType === "interest" && requestSent ? (
                          <TbEyeCheck size={23} />
                        ) : (
                          <TbEyePlus size={23} />
                        )}
                      </span>
                      <span
                        onClick={Shortlisted}
                        className="border border-primary text-primary ursor-pointer cursor-pointer rounded-xl px-8 py-1 mt-2  flex  items-center"
                      >
                        {isShortlisted ? (
                          <IoBookmark size={23} />
                        ) : (
                          <IoBookmarkOutline size={23} />
                        )}
                      </span>
                    </span>
                    <span className="font-light">
                      <span
                        onClick={sendIntrestRequest}
                        className="bg-primary rounded-xl px-8 py-1 flex  items-center cursor-pointer text-white"
                      >
                        {isType === "profile" && requestSent ? (
                          <FaUserCheck size={23} />
                        ) : (
                          <LuUserPlus size={23} />
                        )}
                      </span>
                      <span
                        onClick={handleOpenPopup}
                        className="border text-primary  cursor-pointer border-primary rounded-xl px-8 py-1 mt-2 flex items-center"
                      >
                        <MdBlock size={25} />
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </span>
          </div>
        </div>
      </div>
      
    {/* )} */}
    </>
  );
};

export default OptionDetails;
