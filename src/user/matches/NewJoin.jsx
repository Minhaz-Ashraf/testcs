// import React, { useEffect, useState, useRef } from "react";
// import Match from "./Match";
// import Card from "../../components/Card";
// import { useSelector } from "react-redux";
// import { userDataStore } from "../../Stores/slices/AuthSlice";
// import apiurl from "../../util";
// import DataNotFound from "../../components/DataNotFound";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import Loading from "../../components/Loading";

// const NewJoin = () => {
//   const { userData, userId } = useSelector(userDataStore);
//   const [isLoading, setIsLoading] = useState(true);
//   const [matchData, setMatchData] = useState([]);
//   const [blockedUsers, setBlockedUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const loader = useRef(null);

//   const fetchData = async (page) => {
//     if (userData && userData?.gender && hasMore) {
//       try {
//         const partnerDetails = {
//           ...userData?.partnerPreference,
//           gender: userData?.gender,
//         };
//         const response = await apiurl.get(`/newlyJoined/${userId}?page=${page}`, {
//           params: partnerDetails,
//         });
//         const newMatchData = response.data.users;
//         if (newMatchData.length === 0) {
//           setHasMore(false);
//         } else {
//           setMatchData((prevMatchData) => {
//             const filteredNewData = newMatchData.filter(
//               (newItem) => !prevMatchData.some((prevItem) => prevItem._id === newItem._id)
//             );
//             return [...prevMatchData, ...filteredNewData];
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

// export default NewJoin;




import React, { useEffect, useState } from "react";
import Match from "./Match";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import apiurl from "../../util";
import DataNotFound from "../../components/DataNotFound";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const NewJoin = () => {
  const { userData, userId } = useSelector(userDataStore);
  const [isLoading, setIsLoading] = useState(true);
  const [matchData, setMatchData] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const fetchData = async () => {
    if (userData && userData?.gender) {
      try {
        const partnerDetails = {
          ...userData?.partnerPreference,
          gender: userData?.gender,
        };
        const response = await apiurl.get(`/newlyJoined/${userId}`, {
          params: partnerDetails,
        });
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
      </div>
    </>
  );
};

export default NewJoin;

