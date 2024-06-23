import React, { useCallback, useEffect, useState } from "react";
import Match from "./Match";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiurl from "../../util";
import { DataNotFound } from "../../components/DataNotFound";
import NoSearchresultPopup from "./NoSearchresultPopup";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../../components/Loading";
const SearchResult = () => {
  const navigate = useNavigate();
  const { userData, userId } = useSelector(userDataStore);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const [usersData, setUsersData] = useState([]);
  const location = useLocation();
  const { state } = location;
  const { searchId, basicSearch } = location.state || {};
  const [isPage, setIsPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loadingText, setLoadingText] = useState("");
  const [loading, setLoading] = useState(false); 

  console.log(basicSearch);

  const redirectToSource = () => {
    if (basicSearch && userId) {
      navigate(`/basic-search`, { state: { basicSearchData: basicSearch } });
    } else if (searchId) {
      navigate(`/searchbyid`, { state: { idData: searchId } });
    } else {
      setError('Invalid source page');
  };
}

  if (!searchId && !basicSearch) {
    return (
      <>
        <Match />
        <DataNotFound
          className="flex flex-col items-center mt-9 "
          message="No filters applied"
          linkText="Back to Dashboard"
          linkDestination="/user-dashboard"
        />
      </>
    );
  }

  const fetchData = async () => {
    if (!hasMore || !userId) return;

    setLoading(true);

    try {
      if (searchId) {
        await searchById(userId, searchId);
      } else if (basicSearch) {
        await searchByDetails(userData?.gender, basicSearch, userId);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
   
    }
  };



  const searchById = async (userId, Id) => {
    try {
      setLoading(true);
      const response = await apiurl.post(
        `/search-user/${userId}?gender=${userData?.gender}&category=${userData?.category}&userIds=${Id}&page=${isPage}&limit=5`
      );
   
      if (response.data.users.length === 0) {
        setHasMore(false);
      } else {
        setUsersData((prevUsersData) => [...prevUsersData, ...response.data.users]);
        setIsPage((prevPage) => prevPage + 1);
      }
      setLoading(false);
    } catch (error) {
      setError('Id does not exist')
      setLoading(false);
      console.error("Error searching user by ID:", error);
      throw error;  
    }
  };

  const searchByDetails = async (gender, searchParams, userId) => {
    try {
      setLoading(true);
      const response = await apiurl.post(
        `/search-users/${userId}?gender=${gender}&category=${userData?.category}&page=${isPage}&limit=5`,
        searchParams
      );
      if (response.data.users.length === 0) {
        setHasMore(false);
      } else {
        setUsersData((prevUsersData) => [...prevUsersData, ...response.data.users]);
        setIsPage((prevPage) => prevPage + 1);
      }
      setLoading(false);
    } catch (error) {
      setError('No matches found')
      setLoading(false);
      console.error("Error searching users:", error);
      throw error;
    }
  };

  const closePopup = () => {
    setError(null);
  };

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
 
    // Re-fetch data to include unblocked user
  };
  useEffect(() => {
    fetchData();
  }, [userId]);
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

      {error && <NoSearchresultPopup message={error} onClose={closePopup} />}
      <div className="flex justify-end md:mr-60  xl:mr-[465px] -translate-y-4">
        <div
          className="border-primary border   text-center rounded-lg px-10 py-1  cursor-pointer text-primary  font-DMsans"
          onClick={redirectToSource}
        >
          Edit Search
        </div>
      </div>
      <div className="mb-28">
      {loading ? (
        <>
            <div className="md:px-96 px-9 w-full mt-20 ">
              <Skeleton height={300} />
            </div>
            <div className="md:px-96 px-9 w-full mt-20 ">
              <Skeleton height={300} />
            </div>
          </>
        ) : usersData?.length === 0 ? (
          <DataNotFound
            className="flex flex-col items-center mt-9 "
            message="No users found"
            linkText="Back to Dashboard"
            linkDestination="/user-dashboard"
          />
        ) : (
          usersData.map((item, index) => (
            <Card
              item={item}
              key={index}
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

export default SearchResult;
