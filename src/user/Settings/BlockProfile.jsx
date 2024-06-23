import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import SideBar from "../Dashboard/SideBar";
import Card from "../../components/Card";
import DataNotFound, { BackArrow } from "../../components/DataNotFound";
import { useDispatch, useSelector } from "react-redux";
import apiurl from "../../util";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import BlockCard from "./components/BlockCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlockProfile = () => {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const [isBlocked, setIsBlocked] = useState(false);
  const { userId } = useSelector(userDataStore);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isPage, setIsPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBlockedUsers = async () => {
    setIsLoading(true); 
    if (userId && hasMore) {
      try {
        const response = await apiurl.get(`/get-blocked-users/${userId}?page=${isPage}&limit=5`);
    if (response.data.users.length === 0) {
          setHasMore(false);
        } else {
          setBlockedUsers((prevMatchData) => [...prevMatchData, ...response.data.blockedUsers]);
          setIsPage((prevPage) => prevPage + 1);
        }
        setIsLoading(false);
        // Handle blocked users data
        setIsBlocked(false)
      } catch (error) {
        console.error("Error fetching blocked users:", error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, [userId, isBlocked]);
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
      fetchBlockedUsers();
    }
  }, [fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return (
    <>
      <Header />
      <div className="mt-">
        <SideBar />
      </div>
      <BackArrow className="sm:hidden md:hidden block" />
    
      <div className=" md:px-9 py-3 px-6 mb-36 md:mb-5 md:mx-28 my-5 rounded-md md:ml-96 sm:ml-72 sm:mt-36 sm:mb-9 md:mt-40 mt-7 mx-6">
     
      {isLoading ? (
        <>
        <div className="px-6   md:w-1/4 sm:w-[39%] absolute left-0  top-28 rounded-lg md:block sm:block hidden">
            <Skeleton height={830} />
          </div>
        
          <div className=" w-full mt-9 ">
              <Skeleton height={300} />
            </div>
            <div className=" w-full mt-9 ">
              <Skeleton height={300} />
            </div>
          </>
        ) : blockedUsers && blockedUsers?.length === 0 ? (
            <DataNotFound
              className="flex flex-col items-center  mt-11  sm:mt-20"
              message="You have not blocked any profile"
              linkText="Back to Dashboard"
              linkDestination="/user-dashboard"
            />
          ) : (
          blockedUsers.map((item, index) => (
          <BlockCard
            key={index}
            item={item}
            type={"blockedUsers"}
            setIsBlocked={setIsBlocked}
            
            />
             
            ))
          
          )}
      </div>
   
    </>
  );
};
export default BlockProfile;
