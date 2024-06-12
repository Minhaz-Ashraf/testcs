import React, { useEffect, useState } from "react";
import Match from "./Match";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiurl from "../../util";
import { DataNotFound } from "../../components/DataNotFound";

const SearchResult = () => {
  const navigate = useNavigate();
  const { userData, userId } = useSelector(userDataStore);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const [usersData, setUsersData] = useState([]);
  const location = useLocation();
  const { state } = location;
  const { searchId, basicSearch } = location.state || {};
  console.log(basicSearch);

  const redirectToSource = () => {
    if (basicSearch && userId) {
      navigate(`/basic-search`, { state: { basicSearchData: basicSearch } });
    } else if (searchId) {
      navigate(`/searchbyid`, { state: { idData: searchId } });
    } else {
      alert("Invalid source page");
    }
  };

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

  useEffect(() => {
    if (searchId && userId) {
      searchById(userId, searchId);
    } else if (basicSearch && userId) {
      searchByDetails(userData?.gender, basicSearch, userId);
    }
  }, [searchId, basicSearch, userId]);

  const searchById = async (userId, Id) => {
    try {
      const response = await apiurl.post(
        `/search-user/${userId}?gender=${userData?.gender}&category=${userData?.category}&userIds=${Id}`
      );
      setUsersData(response.data.users);
    } catch (error) {
      console.error("Error searching user by ID:", error);
      throw error;
    }
  };

  const searchByDetails = async (gender, searchParams, userId) => {
    try {
      const response = await apiurl.post(
        `/search-users/${userId}?gender=${gender}&category=${userData?.category}`,
        searchParams
      );
      setUsersData(response.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
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

  return (
    <>
      <Match />

      <div className="flex justify-end md:mr-60  xl:mr-[465px] -translate-y-4">
        <div
          className="border-primary border   text-center rounded-lg px-10 py-1  cursor-pointer text-primary  font-DMsans"
          onClick={redirectToSource}
        >
          Edit Search
        </div>
      </div>
      <div className="mb-28">
        {usersData.length === 0 ? (
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
