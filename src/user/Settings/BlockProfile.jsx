import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import SideBar from "../Dashboard/SideBar";
import Card from "../../components/Card";
import DataNotFound, { BackArrow } from "../../components/DataNotFound";
import { useDispatch, useSelector } from "react-redux";
import apiurl from "../../util";
import { userDataStore } from "../../Stores/slices/AuthSlice";


const BlockProfile = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const { userId } = useSelector(userDataStore);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const fetchBlockedUsers = async () => {
    if(userId){
      try {
        const response = await apiurl.get(`/get-blocked-users/${userId}`);
        setBlockedUsers(response.data.blockedUsers);
        // Handle blocked users data
        setIsBlocked(false)
      } catch (error) {
        console.error("Error fetching blocked users:", error);
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
      {blockedUsers && blockedUsers?.length === 0 ? (
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
