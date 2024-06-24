import React, { useCallback, useEffect, useState, useRef } from "react";
import Match from "./Match";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import apiurl from "../../util";
import DataNotFound from "../../components/DataNotFound";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const Shortlisted = () => {
  const {  userId } = useSelector(userDataStore);
  const [isLoading, setIsLoading] = useState(true);
  const [matchData, setMatchData] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const fetchData = async (page) => {
    if (userId && hasMore ) {
      try {
        const response = await apiurl.get(`/shortlist/get/${userId}?page=${page}`);
        const newMatchData = response.data.users;
        if (newMatchData.length === 0) {
          setHasMore(false);
        } else {
          setMatchData((prevMatchData) => {
            const filteredNewData = newMatchData.filter(
              (newItem) => !prevMatchData.some((prevItem) => prevItem._id === newItem._id)
            );
            return [...prevMatchData, ...filteredNewData];
          });
          setCurrentPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [userId]);

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
    if (target.isIntersecting && hasMore) {
      fetchData(currentPage);
    }
  };
  return (
    <>
      <Match />
      <div className="mb-28">
        {isLoading ? (
          <>
            <div className="md:px-96 px-9 w-full mt-9 ">
              <Skeleton height={300} />
            </div>
            <div className="md:px-96 px-9 w-full mt-9 ">
              <Skeleton height={300} />
            </div>
          </> // Display a loading message while data is being fetched
        ) : matchData?.length === 0 ? (
          <DataNotFound
            className="flex flex-col items-center ml-20 mt-6"
            message="Data not found"
            linkText="Back to Dashboard"
            linkDestination="/user-dashboard"
          />
        ) : (
          matchData?.map((item, index) => (
            <Card
              key={index}
              item={item?.shortlistedUser}
              type={"shortList"}
              fetchData={fetchData}
              handleBlockUser={handleBlockUser}
              handleUnblockUser={handleUnblockUser}
              blockedUsers={blockedUsers}
            />
          ))
        )}
        <div ref={loader} />
      </div>
    </>
  );
};

export default Shortlisted;
