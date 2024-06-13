import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { userprofiledata } from "../../DummyData/userProfile";
import SideBar, { ResponsiveDetail } from "./SideBar";

import { about, logo, menu } from "../../assets";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";

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
  const handleMouseEnterProf = () => {
    setShowProf(true);
  };

  const handleMouseLeaveProf = () => {
    setShowProf(false);
  };
  const handleMouseEnterCountry = () => {
    setShowCountry(true);
  };

  const handleMouseLeaveCountry = () => {
    setShowCountry(false);
  };
  const handleMouseEnterDiet = () => {
    setShowDiet(true);
  };

  const handleMouseLeaveDiet = () => {
    setShowDiet(false);
  };
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
        toast.success(response.data);
        console.log("Profile request sent successfully");
        // Update the state to indicate that the request has been sent
        setProfileRequestSent(true);
      } else {
        console.error("Error: userId is not present");
        // toast.error("something went wrong");
      }
    } catch (error) {
      console.error("Error sending profile request:", error);
      toast.error("something went wrong");
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
        toast.success(response.data);
        console.log("Interest request sent successfully");
        setInterestRequestSent(true);
      } else {
        console.error("Error: userId is not present");
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("something went wrong");
      console.error("Error sending interest request:", error);
    }
  };
  console.log(profileDetails, "makl");
  return (
    <div className="  shadow rounded-lg flex flex-col md:px-3  justify-between items-center md:w-auto w-[50vh]  sm:w-[70%] ">
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
        src={profileDetails.selfDetails[0].profilePictureUrl}
        alt="img"
        onError={(e) =>
          (e.target.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo88hNln0LTch7KlXro5JEeSFWUJqBVAxgEtagyZq9g&s")
        }
        className="rounded-full md:w-36 md:h-36 w-36 h-36  mt-8 border-primary border"
      />
      <p className="font-semibold pb-2 pt-3 md:px-0 px-6 text-[19px] text-center md:w-80">
        {profileDetails?.basicDetails[0]?.name?.replace("undefined", "")} <br />{" "}
        ({profileDetails?.basicDetails[0]?.userId})
      </p>

      <span className="flex justify-center  items-center flex-col  mt-3  px-6 text-[16px]">
        <span className="flex justify-between w-60 items-center">
          <span className="font-regular text-start ">
            <p>
              {profileDetails?.basicDetails[0]?.age || "NA"}yrs{" "}
              {profileDetails?.additionalDetails[0]?.height + "ft" || "NA"}
            </p>
            <p>{profileDetails?.basicDetails[0]?.dateOfBirth || "NA"}</p>
            <p>{profileDetails?.additionalDetails[0]?.maritalStatus || "NA"}</p>
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
              <div className="fixed right-0 top-60   mt-2 w-52 p-2 bg-white border border-gray-300 rounded-lg shadow">
                <p>
                  {" "}
                  {profileDetails?.careerDetails[0]?.professionName || "NA"}
                </p>
              </div>
            )}
          </span>
          <span className="font-regular text-end">
            <p className="md:w-36 ">
              {profileDetails?.familyDetails[0]?.community === 18
                ? "Open to all"
                : profileDetails?.familyDetails[0]?.communityName || "NA"}{" "}
            </p>
            <p>
              {profileDetails?.basicDetails[0]?.timeOfBirth?.slice(0, 5) +
                " " +
                profileDetails?.basicDetails[0]?.timeOfBirth?.slice(-2) || "NA"}
            </p>
            <p
              onMouseEnter={handleMouseEnterCountry}
              onMouseLeave={handleMouseLeaveCountry}
              className="cursor-pointer"
            >
              {profileDetails?.additionalDetails[0]?.currentStateName || "NA"},{" "}
              {profileDetails?.additionalDetails[0]?.currentCountryName?.slice(
                0,
                6
              ) || "NA"}
              ...{" "}
            </p>
            {showCountry && (
              <div className="fixed right-0 top-60 text-start  mt-2 w-52 p-2 bg-white border border-gray-300 rounded-lg shadow">
                <p>
                  {" "}
                  {profileDetails?.additionalDetails[0]?.currentStateName ||
                    "NA"}
                  ,
                  {profileDetails?.additionalDetails[0]?.currentCountryName ||
                    "NA"}{" "}
                </p>
              </div>
            )}

            <p
              onMouseEnter={handleMouseEnterDiet}
              onMouseLeave={handleMouseLeaveDiet}
              className="cursor-pointer "
            >
              {" "}
              {(diet?.length > 0 &&
                diet
                  ?.filter(
                    (dietDetail) =>
                      dietDetail.diet_id ==
                      profileDetails?.additionalDetails[0]?.diet
                  )[0]
                  ?.diet_name?.slice(0, 9)) ||
                "NA"}
              ...
            </p>
            {showdiet && (
              <div className="fixed right-0 top-60  text-start mt-2 w-52 p-2 bg-white border border-gray-300 rounded-lg shadow">
                <p>
                  {" "}
                  {(diet?.length > 0 &&
                    diet?.filter(
                      (dietDetail) =>
                        dietDetail.diet_id ==
                        profileDetails?.additionalDetails[0]?.diet
                    )[0]?.diet_name) ||
                    "NA"}
                </p>
              </div>
            )}
          </span>
        </span>

        <div className="flex    md:gap-20 gap-16 md:px-0 px-6  mt-3 text-center pb-3">
          <span className="font-light ">
            <span
              onClick={sendProfileRequest}
              className="bg-primary cursor-pointer text-white rounded-xl px-8 py-1 flex items-center"
            >
              <span>
                {profileRequestSent || profileDetails?.isProfileRequest ? (
                  <TbEyeCheck size={28} />
                ) : (
                  <TbEyePlus size={28} />
                )}
              </span>
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
              className="bg-primary cursor-pointer rounded-xl px-8  py-1 flex items-center text-white"
            >
              <span>
                {profileDetails.isInterestRequest || interstRequestSent ? (
                  <FaUserCheck size={23} />
                ) : (
                  <LuUserPlus size={23} />
                )}
              </span>
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
