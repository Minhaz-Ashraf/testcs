




import React, { useEffect, useState } from "react";
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
import Pagination from "../../Admin/comps/Pagination";

const SearchResult = () => {
  const navigate = useNavigate();
  const { userData, userId } = useSelector(userDataStore);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { state } = location;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesCount, setTotalPagesCount] = useState({});
    const perPage = 10;
    const [totalUsersCount, setTotalUsersCount] = useState(0);
  const { searchId, basicSearch } = location.state || {};
  console.log(basicSearch);

  const redirectToSource = () => {
    if (basicSearch && userId) {
      navigate(`/basic-search`, { state: { basicSearchData: basicSearch } });
    } else if (searchId) {
      navigate(`/searchbyid`, { state: { idData: searchId } });
    }else {
      setError('Invalid source page');
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

  const fetchData = async (page) => {
    
    
        setLoading(true);
        try {
          if (searchId) {
            await searchById(userId, searchId, page);
          } else if (basicSearch) {
            await searchByDetails(userData?.gender, basicSearch, userId, page);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
  useEffect(() => {
   fetchData()
  }, [searchId, basicSearch, userId])

  const closePopup = () => {
        setError(null);
      };
  const searchById = async (userId, Id) => {
    try {
      const response = await apiurl.post(
        `/search-user/${userId}?gender=${userData?.gender}&category=${userData?.category}&userIds=${Id}`
      );
      setUsersData(response.data.users);
     

    } catch (error) {
      console.error("Error searching user by ID:", error);
      setError('Id does not exist');

      throw error;
    }
  };

  const searchByDetails = async (gender, searchParams, userId, page=1) => {
    try {
      const response = await apiurl.post(
        `/search-users/${userId}?gender=${gender}&category=${userData?.category}&page=${page}&limit=${perPage},`,
        {
          ...searchParams,
        
        }
      );
      setUsersData(response.data.users);
      setTotalUsersCount(response.data.totalUsersCount);
      setTotalPagesCount(response.data.lastPage);
      console.log(response.data, "hh");
      setCurrentPage(page);

    } catch (error) {
      console.error("Error searching users:", error);
      // setError('No matches found');
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
  const handlePageChange = (pageNumber) => {
  fetchData(pageNumber);
  };
  useEffect(() => {
    fetchData(currentPage); // Pass currentPage to fetchData
  }, [searchId, basicSearch, userId, currentPage]);
  return (
    <>
      <Match />

      {error && <NoSearchresultPopup message={error} onClose={closePopup} />}
      <div className="flex justify-end md:mr-[230px] xl:mr-[455px] -translate-y-4">
        <div
            className="border-primary border text-center rounded-lg px-10 py-1 cursor-pointer text-primary font-DMsans mx-10 sm:mx-36 md:mx-0"
          onClick={redirectToSource}
        >
          Edit Search
        </div>
      </div>
      <div className="mb-28">
      {loading && usersData.length === 0 ? (
          <>
            <div className="md:px-96 px-9 w-full mt-9">
              <Skeleton height={300} />
            </div>
             <div className="md:px-96 px-9 w-full mt-9">
               <Skeleton height={300} />
             </div>
          </>
         ) :
        usersData.length === 0 ? (
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
        {usersData.length > 0 && (
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

export default SearchResult;