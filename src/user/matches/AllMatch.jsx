import React, { useEffect, useState, useRef } from "react";
import Match from "./Match";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import apiurl from "../../util";
import DataNotFound from "../../components/DataNotFound";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AllMatchesCard from "../Dashboard/AllMatchesCard";

const AllMatch = () => {
  const { userData, userId } = useSelector(userDataStore);
  const [isLoading, setIsLoading] = useState(true);

  const [matchData, setMatchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const loader = useRef(null);

  const fetchData = async (page) => {
    if (userData && userData?.gender && hasMore) {
      try {
        const partnerData = userData?.partnerPreference[0];
        const partnerDetails = {
          ...partnerData,
          page,
          gender: userData?.gender,
        };
        const response = await apiurl.get(`/getUserPre/${userId}`, {
          params: partnerDetails,
        });
        const newMatchData = response.data.users;
        console.log(newMatchData, page);
        if (newMatchData.length === 0) {
          setHasMore(false); // No more data available
        } else {
          setMatchData((prevData) => [...prevData, ...newMatchData]);
          setCurrentPage(page);
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
  console.log("matchdata", matchData);
  const updateMatchData = (id, type, value) => {
    console.log("Updating match data:", id, type, value);
    const updatedMatchData = matchData?.map((item) => {
      if (item._id === id) {
        console.log("Match found:", item);
        if (type === "profile") {
          if (type === "shortlist") {
            console.log("Updating isShortListed:", !item.isShortListed);
            return { ...item, isShortListed: !item.isShortListed };
          }
        }
      }
      return item;
    });

    console.log("Updated match data:", updatedMatchData);
    setMatchData(updatedMatchData);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [matchData]);

  const handleObserver = (entries) => {
    const target = entries[0];
    console.log(target.isIntersecting, hasMore);
    if (target.isIntersecting && hasMore) {
      fetchData(currentPage + 1);
    }
  };

  return (
    <>
      <Match />
      <div className="mb-28">
        {isLoading && matchData.length === 0 ? (
          <>
            <div className="px-96  w-full mt-5">
              <Skeleton height={300} />
            </div>
            <div className="px-96  w-full mt-5">
              <Skeleton height={300} />
            </div>
          </>
        ) : matchData.length === 0 ? (
          <DataNotFound
            className="flex flex-col items-center ml-20"
            message="Data not found"
            linkText="Back to Dashboard"
            linkDestination="/user-dashboard"
          />
        ) : (
          matchData?.map((item, index) => (
            <>
            <Card
              item={item}
              key={index}
              fetchData={fetchData}
              updateData={updateMatchData}
              handleBlockUser={handleBlockUser}
              handleUnblockUser={handleUnblockUser}
              blockedUsers={blockedUsers}
            />

</>
            
          ))
        )}
      </div>
    </>
  );
};

export default AllMatch;
