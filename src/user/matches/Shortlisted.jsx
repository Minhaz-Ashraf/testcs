import React, { useEffect, useState } from "react";
import Match from "./Match";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import apiurl from "../../util";
import DataNotFound from "../../components/DataNotFound";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
const Shortlisted = () => {
  const { userId } = useSelector(userDataStore);
  const [isLoading, setIsLoading] = useState(true);
  const [matchData, setMatchData] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const fetchData = async () => {
    if (userId) {
      try {
        const response = await apiurl.get(`/shortlist/get/${userId}`);
        setMatchData(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
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
  return (
    <>
      <Match />
      <div className="mb-28">
        {isLoading ? (
          <>
            <div className="px-96  w-full mt-5">
              <Skeleton height={300} />
            </div>
            <div className="px-96  w-full mt-5">
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
      </div>
    </>
  );
};

export default Shortlisted;
