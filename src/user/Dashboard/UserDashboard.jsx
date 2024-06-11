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
import AllMatchesCard from "./AllMatchesCard";

const ActivityCard = ({ item }) => {
  const [loading, setLoading] = useState(true);

  const { userData, userId } = useSelector(userDataStore);
  const [matchData, setMatchData] = useState([]);
  const [pendingRequest, setpendingRequests] = useState(0);
  const [sentRequest, setSentRequest] = useState(0);
  const [acceptedRequest, setAcceptedRequest] = useState(0);

  const [shortlist, setShortlist] = useState(0);
  const dispatch = useDispatch();
  const [isBlockedUser, setIsBlockedUser] = useState(false)
  // const isOpen = useSelector(state => state.popup[item._id] || false);
  const userdata = [
    { name: "Pending Invitations", quantity: pendingRequest },
    { name: "Accepted Invitations", quantity: acceptedRequest },
    { name: "Invitations Sent", quantity: sentRequest },
    // {"name": "Recent Visitors", "quantity": 12},
    { name: "Shortlisted Profiles", quantity: shortlist },
    // {"name": "Chat Initiated", "quantity": 7},
    // {"name": "Days Ago Last Login", "quantity": 2}
  ];



  const fetchData = async () => {
    if (userData && userData?.gender) {
      try {
        const partnerData = userData?.partnerPreference[0];
        const partnerDetails = {
          ...partnerData,
          page: 1,
          gender: userData?.gender,
        };
        const response = await apiurl.get(`/getUserPre/${userId}`, {
          params: partnerDetails,
        });
        setMatchData(response.data.users.slice(0, 5));
        setIsBlockedUser(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchDashboardData = async () => {
    if (userData) {
      try {
        const response = await apiurl.get(`/user-dashboard-data/${userId}`);
        const {
          interestRequestsByUser,
          interestRequestsToUser,
          profileRequestsByUser,
          profileRequestsToUser,
          acceptedProfileRequests,
          acceptedInterestRequests,
          shortListed,
        } = response.data;

        setAcceptedRequest(
          acceptedInterestRequests + acceptedProfileRequests || 0
        );
        setSentRequest(interestRequestsByUser + profileRequestsByUser || 0);
        setpendingRequests(interestRequestsToUser + profileRequestsToUser || 0);
        setShortlist(shortListed || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    fetchDashboardData();
  }, [userData, isBlockedUser ]);

  return (
    <>
      <MobileSidebar />
      <Header />
      <SideBar />
      
      {loading ? (
        <>
          {/* {isOpen &&
      <span className="absolute">
       <BlockPop cardId={item._id} />
       </span>} */}
       <div className="px-6  w-1/4 mt-28 rounded-lg absolute md:block sm:block hidden">
            <Skeleton height={800}  />
          </div>
          <div className="flex  flex-wrap items-center justify-around sm:justify-start  gap-3 md:ml-[25%]    md:justify-start  mt-36">
            <Skeleton height={180} width={170} />
            <Skeleton height={180} width={170} />
            <Skeleton height={180} width={170} />
            <Skeleton height={180} width={170} />
            <Skeleton height={180} width={170} />
            <Skeleton height={180} width={170} />
            <Skeleton height={180} width={170} />
          </div>
        </>
      ) : (
        <>
          <div className=" flex  flex-col  items-start  justify-start  ">
            <ResponsiveDetail />

            <div className=" pt-5 md:mt-28  md:pe-20 md:ml-[26%] xl:ml-[18%] sm:ml-[38%]  md:mb-9 md-9 sm-0 mx-6 md:mx-0 mt-20 sm:mt-28 ">
              <p className="font-semibold pb-6 text-[22px] ">
                Your Activity Summary
              </p>
              <span className="flex flex-wrap items-center justify-around sm:justify-start      md:justify-start  ">
                {userdata.map((user) => (
                  <div className=" md:w-40 md:h-full md:py-9 sm:py-0 py-0 h-[20vh] sm:h-[12vh] sm:w-28  w-36 shadow sm:mx-3 rounded-lg flex flex-col justify-center items-center mb-9 md:mb-9 ">
                    <h1 className="text-[30px] font-semibold">
                      {user.quantity}
                    </h1>
                    <p className="pt-2 font-semibold text-[18px] text-center px-8">
                      {user.name}
                    </p>
                  </div>
                ))}
              </span>
            </div>
          </div>
          <div className=" md:ml-[26%] xl:ml-[18%] sm:ml-[39%] ml-6 mb-36">
            <span className="flex items-center justify-between pb-6">
              {" "}
              <p className="font-semibold  text-[21px] ">All Matches</p>
              <Link to="/all-matches">
                {" "}
                <p className="font-normal font-DMsans text-black underline px-6 cursor-pointer">
                  See All
                </p>
              </Link>{" "}
            </span>
            {console.log({ matchData })}
            <div className="flex flex-row   gap-7 overflow-x-scroll  p-3 scrollbar-hide mb-9 ">
              {matchData.map((profileDetails, index) => (
                <AllMatchesCard key={index} profileDetails={profileDetails} setIsBlockedUser ={setIsBlockedUser}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ActivityCard;
