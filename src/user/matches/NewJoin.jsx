import React, { useCallback, useEffect, useState } from "react";
import Match from "./Match";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import apiurl from "../../util";
import DataNotFound from "../../components/DataNotFound";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../../components/Loading";
const NewJoin = () => {
  const { userData, userId } = useSelector(userDataStore);
  const [isLoading, setIsLoading] = useState(true);
  const [matchData, setMatchData] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isPage, setIsPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  console.log(isPage);
  const fetchData = async () => {
    if (userData && userData?.gender && hasMore) {

      try {
        const partnerDetails = {
          ...userData?.partnerPreference,
          gender: userData?.gender,
        };
        const response = await apiurl.get(`/newlyJoined/${userId}?page=${isPage}&limit=5`, {
          params: partnerDetails,
        });
        if (response.data.users.length === 0) {
          setHasMore(false);
        } else {
          setMatchData((prevMatchData) => [...prevMatchData, ...response.data.users]);
          setIsPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

  const handleBlockUser = (id) => {
    setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, id]);
    setMatchData((prevMatchData) =>
      prevMatchData.filter((item) => item._id !== id)
    );
  };

  const handleUnblockUser = (id) => {
    setBlockedUsers((prevBlockedUsers) =>
      prevBlockedUsers.filter((userId) => userId !== id)
    );
    fetchData(); // Re-fetch data to include unblocked user
  };

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return (
    <>
      <Match />
      <div className="mb-28">
      {isLoading && matchData.length === 0 ? (
          <>
            <div className="md:px-96 px-9 w-full mt-20 ">
              <Skeleton height={300} />
            </div>
            <div className="md:px-96 px-9 w-full mt-20 ">
              <Skeleton height={300} />
            </div>
          </> // Display a loading message while data is being fetched
        ) : matchData.length === 0 ? (
          <DataNotFound
            className="flex flex-col items-center ml-20"
            message="Data not found"
            linkText="Back to Dashboard"
            linkDestination="/user-dashboard"
          />
        ) : (
          matchData.map((item, index) => (
            <Card
              item={item}
              key={index}
              fetchData={fetchData}
              handleBlockUser={handleBlockUser}
              handleUnblockUser={handleUnblockUser}
              blockedUsers={blockedUsers}
            />
          ))
        )}
    
      </div>
    </>
  );
};

export default NewJoin;
