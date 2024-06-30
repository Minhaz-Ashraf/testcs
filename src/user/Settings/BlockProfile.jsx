
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import SideBar from "../Dashboard/SideBar";
import Card from "../../components/Card";
import DataNotFound, { BackArrow } from "../../components/DataNotFound";
import { useDispatch, useSelector } from "react-redux";
import apiurl from "../../util";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Pagination from "../../Admin/comps/Pagination";

const BlockProfile = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const { userId } = useSelector(userDataStore);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesCount, setTotalPagesCount] = useState({});
    const perPage = 10;
    const [totalUsersCount, setTotalUsersCount] = useState(0);
  const fetchBlockedUsers = async (page=1) => {
    if (userId) {
      try {
        setIsLoading(true);
        const response = await apiurl.get(`/get-blocked-users/${userId}`,{
          params: { page, limit: perPage }
        });
        
        setBlockedUsers(response?.data?.blockedUsers);
        setTotalUsersCount(response.data.totalUsersCount);
        setTotalPagesCount(response.data.lastPage);
        setCurrentPage(page);
        // Handle blocked users data
        setIsBlocked(false);
      } catch (error) {
        console.error("Error fetching blocked users:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setIsLoading(true);
    // window.scrollTo(0, 0);
    setTimeout(() => {
      fetchBlockedUsers(pageNumber);
    }, 100); // 3 seconds delay
  };
  useEffect(() => {
    fetchBlockedUsers();
  }, [userId, isBlocked]);
  return (
    <>
      <Header />
      <div className="mt-">
        <SideBar />
      </div>
      <BackArrow className="sm:hidden md:hidden block" />

      <div className=" md:px-9 py-3 px-6 mb-36 md:mb-5 md:mx-28 my-5 rounded-md md:ml-96 sm:ml-72 sm:mt-36 sm:mb-9 md:mt-40 mt-7 mx-6">
        {isLoading  ? (
          <>
           
            <div className="w-full mt-9">
              <Skeleton height={300} />
            </div>
            <div className="w-full mt-9">
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
            <Card
              key={index}
              item={item}
              type={"blockedUsers"}
              setIsBlocked={setIsBlocked}
            />
          ))
        )}
        {blockedUsers.length > 0 && (
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
export default BlockProfile;
