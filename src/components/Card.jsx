import React, { useEffect } from "react";



import { TbEyeCheck, TbEyePlus } from "react-icons/tb";
import { MdBlock } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import apiurl from "../util";
import { userDataStore } from "../Stores/slices/AuthSlice";
import { useState } from "react";
import { LuUserPlus } from "react-icons/lu";

import BlockPop from "../user/PopUps/BlockPop";
import { openPopup } from "../Stores/slices/PopupSlice";
import { toast } from 'react-toastify';
import UnblockProfilePop from "../user/PopUps/UnblockProfilePop";


const Card = ({ item, type, fetchData, updateData, setIsBlocked,  handleBlockUser, handleUnblockUser, blockedUsers}) =>
{

  const { userId } = useSelector(userDataStore);

  const [profileRequestSent, setProfileRequestSent] = useState(item?.isProfileRequest || false);
  const [interstRequestSent, setInterestRequestSent] = useState(item?.isInterestRequest || false);
  const [isShortlisted, setIsShortListed] = useState(item?.isShortListed || false)
  const isOpen = useSelector(state => state.popup[item?._id] || false);
  const dispatch = useDispatch();
  const [isUnblockOpen, setIsUnblockOpen] = useState(false); // Corrected state name
  const [isOpenPop, setIsOpenPop] = useState(false);
  const [showProf, setShowProf] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  const openUnblockPopup = () => {
    setIsUnblockOpen(true); // Corrected function name
  };

  const closeUnblock = () => {
    setIsUnblockOpen(false);
  }
  const handleMouseEnterProf = () => {
    setShowProf(true);
  };

  const handleMouseLeaveProf = () => {
    setShowProf(false);
  };
  const handleOpenPopup = () => {
    // dispatch(openPopup({ cardId: profileDetails._id })); 
    // Open popup for specific card
    setIsOpenPop(true);
  };
  const closeblockPop = () => {
    setIsOpenPop(false);
  };

  const Shortlisted = async () =>
  {
    if (userId && item)
    {
      try
      {
        const response = await apiurl.post(`/shortlist/add`, {
          user: userId,
          shortlistedUserId: item?._id,
        });

        if (response.status === 200)
        {
          const matchRequest = response.data;
  
          console.log("Match request sent successfully:", matchRequest);
          toast.info(response.data.message)
          if(type === "shortList"){
            fetchData();
          }
          setIsShortListed(!isShortlisted) ;
          updateData(item?._id, "shortlist", isShortlisted)
          return matchRequest;
        } else
        {
          // If the request failed, throw an error
          if(type === "shortList"){
            fetchData();
          }
          toast.info(response.data.message)
          setIsShortListed(!isShortlisted);
          updateData(item?._id, "shortlist", isShortlisted)
          throw new Error("Failed to send match request");
        
        }
        
      } catch (error)
      {
        toast.error(response.error.message)
        console.error("Error sending match request:", error);
        throw error;
      }
    }
  };

  
  const unblockUser = async (blockedUserId) => {
    if (userId) {
      try {
        const response = await apiurl.put(`/unblock-user`, {
          blockedBy: userId,
          blockedUserId: blockedUserId,
        });
        console.log(response.data.message);
        setIsBlocked(true)
        handleUnblockUser(blockedUserId);
      } catch (error) {
        console.error("Error unblocking user:", error);
      }
    }
  };

  const blockUser = async () =>
  {
    try
    {
      if (userId)
      {
      const response =   await apiurl.post("/block-user", {
          blockBy: userId,
          blockUserId: item?._id,
        });
        toast.success(response.data.message)
        console.log(response);
        // Update the state to indicate that the request has been sent
        setProfileRequestSent(true);
        handleBlockUser(item._id);
      } else
      {
       
        console.error("Error: userId is not present");
      }
      fetchData();
    } catch (error)
    {
      toast.error(error.data.message)
      console.error("Error blocking user:", error);
    }
  };


  const sendProfileRequest = async () =>
  {
    try
    {
      if (userId)
      {
       const response =  await apiurl.post("/api/profile-request/send", {
          profileRequestBy: userId,
          profileRequestTo: item?._id,
        });
        // console.log(response,"rems");
        setProfileRequestSent(true);
          toast.success(response.data);

          updateData(item?._id, "profile", profileRequestSent)
       
        // Update the state to indicate that the request has been sent
      } else
      {
        
        console.error("Error: userId is not present");
      }
      
    } catch (error)
    {
      toast.error(error.data)
      console.error("Error sending profile request:", error);
    }
  };


  const sendIntrestRequest = async () =>
  {
    try
    {
      if (userId)
      {
       const response =  await apiurl.post('/api/interest-request/send', {
          interestRequestBy: userId,
          interestRequestTo: item?._id
        });
        toast.success(response.data)
        setInterestRequestSent(true);
        updateData(item?._id, "interest", interstRequestSent)
      
        console.log(response?.data,"res");
      } else
      {
        
        console.error('Error: userId is not present');
      }
    } catch (error)
    {
      toast.error(error.data)
      console.error('Error sending interest request:', error);
    }
  };
  


  return (
    <>

      {isOpenPop &&
      <span className="absolute">
       <BlockPop cardId={item?._id} blockUser={blockUser} closeblockPop = {closeblockPop}/>
       </span>}
       <UnblockProfilePop unblockUser={unblockUser} id={item?._id} isUnblockOpen={isUnblockOpen} closeUnblock={closeUnblock} />
      <div className="grid gid-cols-2 items-center justify-center  mt-9 md:mt-5 sm:mt-0 sm:pr-6 mx-6   sm:mx-0 ">
        <div className="shadow flex md:flex-row flex-col sm:flex-row md:w-[38rem] justify-center  md:py-2 sm:py-2  items-center px-3 rounded-2xl  sm:w-[55vh] w-full   mb-6 ">
       
          <span>
            {" "}
            <img
              src={item?.selfDetails[0]?.profilePictureUrl}
              alt=""
              onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo88hNln0LTch7KlXro5JEeSFWUJqBVAxgEtagyZq9g&s"}
              className="md:w-60 md:h-64 sm:w-60 sm:h-64 w-44 h-44 md:rounded-lg sm:rounded-lg rounded-full mt-[12%] md:mt-0 sm:mt-0 "
            />
          </span>
          <span>
            <p className="px-9 mt-3  capitalize text-[16px] font-semibold md:text-start sm:text-start text-center">
              {item?.basicDetails[0]?.name?.replace("undefined", "") } <br />
              ({item?.basicDetails[0]?.userId}){" "}
            </p>
<div className="flex justify-center flex-col  items-center   ">
            <span className="flex justify-between  items-center gap-2 mt-3  px-9 text-[16px]">
              <span className="font-regular text-start ">
                <p>
                  {item?.basicDetails[0]?.age  || "NA"}yrs {item?.additionalDetails[0]?.height + "ft" || "NA"}
                </p>
                <p>{item?.basicDetails[0]?.dateOfBirth || "NA"}</p>
                <p>{item?.additionalDetails[0]?.maritalStatus || "NA"}</p>
                <p
                onMouseEnter={handleMouseEnterProf}
                    onMouseLeave={handleMouseLeaveProf}
                    className="cursor-pointer">{item?.careerDetails[0]?.professionName?.slice(0,9)|| "NA"}...</p>
                     {showProf && (
        <div className=" right-0 top-60 fixed  mt-2 w-52 p-2 bg-white border border-gray-300 rounded-lg shadow">
          <p> {item?.careerDetails[0]?.professionName|| "NA"}</p>
        </div>
      )}
              </span>
              <span className="font-regular text-end">
                <p className="w-36">{item?.familyDetails[0]?.communityName || "NA"}</p>
                <p>{item?.basicDetails[0]?.timeOfBirth?.slice(0, 5) + " " + item?.basicDetails[0]?.timeOfBirth?.slice(-2) || "NA"}</p>
                <p
                   onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer">
           {" "}
            {item?.additionalDetails[0].currentCountryName?.slice(0, 10) || "NA"},
           {item?.additionalDetails[0].currentStateName?.slice(0, 5) || "NA"}{" "}
          </p>
          {showTooltip && (
        <div className="fixed right-0 top-72 text-start  mt-2 w-60 p-2 bg-white border border-gray-300 rounded-lg shadow">
          <p>    {item?.additionalDetails[0].currentCountryName|| "NA"}, {item?.additionalDetails[0].currentStateName || "NA"}</p>
        </div>
      )}
                <p>{item?.additionalDetails[0]?.dietName || "NA"}</p>
              </span>
           </span>
         
            <span className="grid grid-flow-col gap-12 justify-between items-center      mt-5 text-center pb-5 px-10">
            {type !== "blockedUsers" && 
            <>
              <span className="font-light ">
                <span onClick={sendProfileRequest} className="bg-primary text-white rounded-xl px-8 py-[3px] flex items-center cursor-pointer">
                  <span>
                    {item?.isProfileRequest || profileRequestSent ?(
                      <TbEyeCheck size={23} /> 
                    ) : (

                      <TbEyePlus size={23} />
                    )}
                  </span>
                </span>
                <span onClick={Shortlisted} className="border border-primary text-primary  cursor-pointer  rounded-xl px-8  py-[3px] mt-2 flex items-center">

                  {item?.isShortListed || isShortlisted || type === "shortList" ? (
                      <IoBookmark size={23} />
                  ) : (
                    <IoBookmarkOutline size={23} />  
                  )}
                </span>
              </span>

              <span className="font-light">
                <span onClick={sendIntrestRequest} className="bg-primary text-white  cursor-pointer  rounded-xl px-8  py-[3px] flex items-center">
                  <span>
                  {item?.isInterestRequest || interstRequestSent ?  (
                      <FaUserCheck size={23} />
                    ) : (

                      <LuUserPlus size={23} />
                    )}
                  </span>
                </span>
                <span className="border text-primary   cursor-pointer border-primary rounded-xl px-8 py-[3px] mt-2 flex items-center">
                  <span onClick={handleOpenPopup}>
                    <MdBlock size={23} />
                  </span>
                </span>
            
              </span>

              </>
            }
            {type === "blockedUsers" && 
                <span className="font-light">
                 
                  <span onClick={openUnblockPopup}  className="border text-primary   cursor-pointer border-primary rounded-lg px-8 py-[3px] mt-2 flex items-center">
               
                       Unblock
                   
                  </span>
                </span>
              }
            </span>
            </div>
             </span>
             </div>
       
     
      </div>

    </>

  );
};

// onClick={() => unblockedUserFunc(item?._id)}
export default Card;
