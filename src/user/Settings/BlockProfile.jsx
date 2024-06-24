// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Header from "../../components/Header";
// import SideBar from "../Dashboard/SideBar";
// import Card from "../../components/Card";
// import DataNotFound, { BackArrow } from "../../components/DataNotFound";
// import { useDispatch, useSelector } from "react-redux";
// import apiurl from "../../util";
// import { userDataStore } from "../../Stores/slices/AuthSlice";
// import BlockCard from "./components/BlockCard";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// const BlockProfile = () => {
//   const [isLoading, setIsLoading] = useState(true); // Loading state
//   const [isBlocked, setIsBlocked] = useState(false);
//   const { userId } = useSelector(userDataStore);
//   const [blockedUsers, setBlockedUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const loader = useRef(null);

//   const fetchBlockedUsers = async (page) => {
//     setIsLoading(true);
//     if (userId && hasMore) {
//       try {
//         const response = await apiurl.get(`/get-blocked-users/${userId}?page=${page}`);
//         setIsBlocked(false)
//         const newBlockedUsers = response.data.blockedUsers;
//         if (newBlockedUsers.length === 0) {
//           setHasMore(false);
//         } else {
//           setBlockedUsers((prevBlockedUsers) => {
//             const filteredNewData = newBlockedUsers.filter(
//               (newItem) => !prevBlockedUsers.some((prevItem) => prevItem._id === newItem._id)
//             );
//             return [...prevBlockedUsers, ...filteredNewData];
//           });
//           setCurrentPage((prevPage) => prevPage + 1);
//         }
//         setIsBlocked(false)
//       } catch (error) {
//         console.error("Error fetching blocked users:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchBlockedUsers(currentPage);
//   }, [userId, isBlocked]);

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
//   }, [blockedUsers]);

//   const handleObserver = (entries) => {
//     const target = entries[0];
//     if (target.isIntersecting && hasMore) {
//       fetchBlockedUsers(currentPage);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="mt-">
//         <SideBar />
//       </div>
//       <BackArrow className="sm:hidden md:hidden block" />
//       <div className="md:px-9 py-3 px-6 mb-36 md:mb-5 md:mx-28 my-5 rounded-md md:ml-96 sm:ml-72 sm:mt-36 sm:mb-9 md:mt-40 mt-7 mx-6">
//         {isLoading && blockedUsers.length === 0 ? (
//           <>
//             <div className="px-6 md:w-1/4 sm:w-[39%] absolute left-0 top-28 rounded-lg md:block sm:block hidden">
//               <Skeleton height={830} />
//             </div>
//             <div className="w-full mt-9">
//               <Skeleton height={300} />
//             </div>
//             <div className="w-full mt-9">
//               <Skeleton height={300} />
//             </div>
//           </>
//         ) : blockedUsers && blockedUsers.length === 0 ? (
//           <DataNotFound
//             className="flex flex-col items-center mt-11 sm:mt-20"
//             message="You have not blocked any profile"
//             linkText="Back to Dashboard"
//             linkDestination="/user-dashboard"
//           />
//         ) : (
//           blockedUsers.map((item, index) => (
//             <BlockCard
//               key={index}
//               item={item}
//               type={"blockedUsers"}
//               setIsBlocked={setIsBlocked}
//             />
//           ))
//         )}
//         <div ref={loader} />
//       </div>
//     </>
//   );
// };

// export default BlockProfile;

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

const BlockProfile = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const { userId } = useSelector(userDataStore);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const fetchBlockedUsers = async () => {
    if (userId) {
      try {
        setIsLoading(true);
        const response = await apiurl.get(`/get-blocked-users/${userId}`);
        setBlockedUsers(response?.data?.blockedUsers);
        // Handle blocked users data
        setIsBlocked(false);
      } catch (error) {
        console.error("Error fetching blocked users:", error);
      } finally {
        setIsLoading(false);
      }
    }
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
        {isLoading && blockedUsers.length === 0 ? (
          <>
            <div className="px-6 md:w-1/4 sm:w-[39%] absolute left-0 top-28 rounded-lg md:block sm:block hidden">
              <Skeleton height={830} />
            </div>
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
      </div>
    </>
  );
};
export default BlockProfile;
