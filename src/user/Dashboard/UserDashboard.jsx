import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

import SideBar from "./SideBar";


import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MobileSidebar from "./MobileSidebar";

import AllMatchesCard from "./AllMatchesCard";
import apiurl from "../../util";

const ActivityCard = ({ item }) => {
  const [loading, setLoading] = useState(true);

  const { userData, userId } = useSelector(userDataStore);
  const [matchData, setMatchData] = useState([]);
  const [pendingRequest, setpendingRequests] = useState(0);
  const [sentRequest, setSentRequest] = useState(0);
  const [acceptedRequest, setAcceptedRequest] = useState(0);

  const [shortlist, setShortlist] = useState(0);

  const [isBlockedUser, setIsBlockedUser] = useState(false);
  const [isPage, setPage] = useState(1);
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
        const partnerDetails = {
          ...userData?.partnerPreference,
          gender: userData?.gender,
        };
        const response = await apiurl.get(
          `/newlyJoined/${userId}?page=${isPage}&limit=5`,
          {
            params: partnerDetails,
          }
        );
        setMatchData(response.data.users?.slice(0, 5));
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

 
  console.log(isPage, "jkkkl");
  useEffect(() => {
    fetchData();
    fetchDashboardData();
  }, [userData, userId, isPage, isBlockedUser]);

  const links = [
    "/inbox/profiles/recieved",
    "/inbox/profiles/accepted",
    "/inbox/profiles/sent",
    "/shortlisted"
  ];
  return (
    <>
      <MobileSidebar />
      <Header />
      <SideBar />
   
          
      {loading ? (
        <>
        
          <span className="px-6   md:w-1/4 sm:w-[39%]  mt-28 rounded-lg absolute md:block sm:block hidden">
            <Skeleton height={830} />
          </span>
          {/* <span className="px-6  w-full mt-0 z-30  md:hidden sm:hidden xl:hidden ">
            <Skeleton height={270} />
          </span> */}
          <div className="md:block sm:hidden xl:block block">
            <div className="flex  flex-wrap items-center justify-around sm:justify-start    gap-3 md:ml-[25%]    md:justify-start  md:mt-36 mt-20">
              <Skeleton height={180} width={170} />
              <Skeleton height={180} width={170} />
              <Skeleton height={180} width={170} />
              <Skeleton height={180} width={170} />
              <Skeleton height={180} width={170} />
              <Skeleton height={180} width={170} />
              <Skeleton height={180} width={170} />
            </div>
            <div className="flex  flex-row items-center justify-around sm:justify-start    gap-3 md:ml-[25%]    md:justify-start  md:mt-9 mt-20">
            <Skeleton height={380} width={370} />
              <Skeleton height={380} width={370} />
              <Skeleton height={380} width={370} />
            </div>
          </div>
          <div className="sm:block hidden md:hidden xl:hidden">
            <div className="flex  flex-wrap items-center sm:justify-start   gap-3  sm:mt-36  sm:ml-[38%]   ">
              <Skeleton height={180} width={130} />
              <Skeleton height={180} width={130} />
              <Skeleton height={180} width={130} />
              <Skeleton height={180} width={130} />
              <Skeleton height={180} width={130} />
              <Skeleton height={180} width={130} />
              <Skeleton height={180} width={130} />
            </div>
            <div className="flex  flex-row items-center sm:justify-start   gap-3  sm:mt-9  sm:ml-[38%]">
            <Skeleton height={380} width={370} />
              <Skeleton height={380} width={370} />

            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" flex  flex-col  items-start  justify-start  ">
         

            <div className=" pt-5 md:mt-28  md:pe-20 md:ml-[26%] xl:ml-[18%] sm:ml-[38%]  md:mb-8 md-9 sm-0 mx-6 md:mx-0 mt-9 sm:mt-28 ">
              <p className="font-semibold font-DMsans pb-5 text-[22px] ">
                Your Activity Summary
              </p>
              <span className="flex flex-wrap items-center justify-around sm:justify-start  font-DMsans     md:justify-start  ">
                {userdata.map((user, index) => (
                  <Link
        to={links[index]} 
        key={user.id}  className=" md:w-40 md:h-full md:py-9 sm:py-0 py-0 h-[20vh] sm:h-[12vh] sm:w-28  w-36 shadow sm:mx-3 rounded-lg flex flex-col justify-center items-center mb-9 md:mb-9 ">
                    <h1 className="text-[30px] font-semibold">
                      {user.quantity}
                    </h1>
                    <p className="pt-2 font-semibold text-[18px] text-center px-8">
                      {user.name}
                    </p>
                  </Link>
                ))}
              </span>
            </div>
          </div>
          <div className=" md:ml-[26%] xl:ml-[18%] sm:ml-[39%] ml-6 mb-36">
            <span className="flex items-center justify-between pb-4">
              {" "}
              <p className="font-semibold font-DMsans  text-[21px] ">Recently Joined</p>
              <Link to="/new-join">
                {" "}
                <p className="font-normal font-DMsans text-black underline px-6 cursor-pointer">
                  See All
                </p>
              </Link>{" "}
            </span>
            {console.log({ matchData })}
            <div className="flex flex-row   gap-7 overflow-x-scroll  py-3 px-1 scrollbar-hide mb-9 ">
              {matchData.map((profileDetails, index) => (
                <AllMatchesCard
                  key={index}
                  // handleCrossClick={handleCrossClick}
                  profileDetails={profileDetails}
                  setPage={setPage}
                  setIsBlockedUser={setIsBlockedUser}
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
