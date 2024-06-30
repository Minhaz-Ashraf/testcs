// import React, { useEffect, useState, useRef } from "react";
// import Match from "./Match";
// import Card from "../../components/Card";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
// import apiurl from "../../util";
// import DataNotFound from "../../components/DataNotFound";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";


// const AllMatch = () => {
//   const { userData, userId } = useSelector(userDataStore);
//   const [isLoading, setIsLoading] = useState(true);
//   const [matchData, setMatchData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [blockedUsers, setBlockedUsers] = useState([]);
//   const loader = useRef(null);

//   const fetchData = async (page) => {
//     if (userData && userData?.gender && hasMore) {
//       try {
//         const partnerData = userData?.partnerPreference[0];
//         const partnerDetails = {
//           ...partnerData,
//           page,
//           gender: userData?.gender,
//         };
//         const response = await apiurl.get(`/getUserPre/${userId}?page=${page}`, {
//           params: partnerDetails,
//         });
//         const newMatchData = response.data.users;
//         console.log(newMatchData, page);
//         if (newMatchData.length === 0) {
//           setHasMore(false); // No more data available
//         } else {
//           setMatchData((prevData) => {
//             // Filter out duplicates
//             const filteredNewData = newMatchData.filter(
//               (newItem) => !prevData.some((prevItem) => prevItem._id === newItem._id)
//             );
//             return [...prevData, ...filteredNewData];
//           });
//           setCurrentPage((prevPage) => prevPage + 1);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [userData]);

//   const handleBlockUser = (id) => {
//     setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, id]);
//     setMatchData((prevMatchData) =>
//       prevMatchData.filter((item) => item._id !== id)
//     );
//   };

//   const handleUnblockUser = (id) => {
//     setBlockedUsers((prevBlockedUsers) =>
//       prevBlockedUsers.filter((userId) => userId !== id)
//     );
//     fetchData(); // Re-fetch data to include unblocked user
//   };

//   const updateMatchData = (id, type, value) => {
//     const updatedMatchData = matchData?.map((item) => {
//       if (item._id === id) {
//         if (type === "shortlist") {
//           return { ...item, isShortListed: !item.isShortListed };
//         }
//       }
//       return item;
//     });

//     setMatchData(updatedMatchData);
//   };

//   useEffect(() => {
//     const observerOptions = {
//       root: null,
//       rootMargin: "20px",
//       threshold: 1.0,
//     };

//     const observer = new IntersectionObserver(handleObserver, observerOptions);
//     if (loader.current) {
//       observer.observe(loader.current);
//     }

//     return () => {
//       if (loader.current) {
//         observer.unobserve(loader.current);
//       }
//     };
//   }, [matchData]);

//   const handleObserver = (entries) => {
//     const target = entries[0];
//     console.log(target.isIntersecting, hasMore);
//     if (target.isIntersecting && hasMore) {
//       fetchData(currentPage);
//     }
//   };

//   return (
//     <>
//       <Match />
//       <div className="mb-28">
//         {isLoading && matchData.length === 0 ? (
//           <>
//             <div className="md:px-96 px-9 w-full mt-9 ">
//               <Skeleton height={300} />
//             </div>
//             <div className="md:px-96 px-9 w-full mt-9 ">
//               <Skeleton height={300} />
//             </div>
//           </>
//         ) : matchData.length === 0 ? (
//           <DataNotFound
//             className="flex flex-col items-center ml-20"
//             message="Data not found"
//             linkText="Back to Dashboard"
//             linkDestination="/user-dashboard"
//           />
//         ) : (
//           matchData?.map((item, index) => (
//             <Card
//               item={item}
//               key={index}
//               fetchData={fetchData}
//               updateData={updateMatchData}
//               handleBlockUser={handleBlockUser}
//               handleUnblockUser={handleUnblockUser}
//               blockedUsers={blockedUsers}
//             />
//           ))
//         )}
//         <div ref={loader} />
//       </div>
//     </>
//   );
// };

// export default AllMatch;







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
import Pagination from "../../Admin/comps/Pagination";

const AllMatch = () => {
  const { userData, userId } = useSelector(userDataStore);
  const [isLoading, setIsLoading] = useState(true);

  const [matchData, setMatchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesCount, setTotalPagesCount] = useState({});
    const perPage = 10;
    const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState([]);
    

  const fetchData = async (page=1) => {
    if (userData && userData?.gender ) {
      try {
        const partnerData = userData?.partnerPreference[0];
        const partnerDetails = {
          ...partnerData,
          page,
          gender: userData?.gender,
          limit: perPage
        };
        const response = await apiurl.get(`/getUserPre/${userId}`, {
          params: { ...partnerDetails, page },
        });
        const newMatchData = response.data.users;
        console.log(response.data, "hh");
        if (newMatchData.length === 0) {
    
        } else {
          setMatchData(newMatchData);
          setTotalUsersCount(response.data.totalUsersCount);
          setTotalPagesCount(response.data.lastPage);
          setCurrentPage(page);
        }
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

 
   
  return (
    <>
      <Match />
      <div className="mb-28">
        {isLoading && matchData.length === 0 ? (
          <>
          <div className="md:px-96 px-9 w-full mt-9 ">
               <Skeleton height={300} />
             </div>
         <div className="md:px-96 px-9 w-full mt-9 ">
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

export default AllMatch;
