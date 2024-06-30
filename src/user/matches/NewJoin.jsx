
import React, { useEffect, useState } from "react";
import Match from "./Match";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import apiurl from "../../util";
import DataNotFound from "../../components/DataNotFound";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Pagination from "../../Admin/comps/Pagination";
const NewJoin = () => {
  const { userData, userId } = useSelector(userDataStore);
  const [isLoading, setIsLoading] = useState(true);
  const [matchData, setMatchData] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;
    const [totalUsersCount, setTotalUsersCount] = useState(0);

  
    const [totalPagesCount, setTotalPagesCount] = useState({});
  const fetchData = async (page=1) => {
    if (userData && userData?.gender) {
      try {
        const partnerDetails = {
          ...userData?.partnerPreference,
          gender: userData?.gender,
          limit: perPage
        };
        const response = await apiurl.get(`/newlyJoined/${userId}`, {
          params: { ...partnerDetails, page },
        });
        console.log(response.data, "hh");
      
      
        setMatchData(response.data.users);
        setTotalUsersCount(response.data.totalUsersCount);
        setTotalPagesCount(response.data.lastPage);
        setCurrentPage(page);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handlePageChange = (pageNumber) => {
    setIsLoading(true);
    // window.scrollTo(0, 0);
    setTimeout(() => {
      fetchData(pageNumber);
    }, 100); // 3 seconds delay
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
        {matchData.length > 0 && (
        <div className="flex justify-center items-center mt-3 mb-20 ml-4">
          <Pagination
            currentPage={currentPage}
            hasNextPage={currentPage * perPage < totalUsersCount}
            hasPreviousPage={currentPage > 1}
            onPageChange={handlePageChange}
            totalPagesCount={totalPagesCount}
          />
        </div>
      )}
      </div>
    </>
  );
};

export default NewJoin;

