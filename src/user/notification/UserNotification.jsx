import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import {
  notificationStore,
  isNotification,
  isNotNotification,
} from "../../Stores/slices/notificationslice";
import { useSelector, useDispatch } from "react-redux";
import apiurl from "../../util";
import { Link } from "react-router-dom";
import { BackArrow } from "../../components/DataNotFound";
import Header from "../../components/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../../components/Loading";

const NotificationLink = ({ notification, userId, index }) => {
  const [clicked, setClicked] = useState(false); // State to track click status

  const handleNotificationClick = () => {
    setClicked(true); // Set clicked state to true when notification is clicked
  };
  const getLink = () => {
    const baseRoute = {
      profilesent: "/inbox/profiles",
      profileaccepted: "/inbox/profiles",
      interestsent: "/inbox/interests",
      interestaccepted: "/inbox/interests",
    };

    let action;
    if (notification.notificationType === "profileaccepted" || notification.notificationType === "interestaccepted") {
      action = "accepted";
    } else {
      action = userId === notification.notificationBy._id ? "sent" : "recieved";
    }

    return `${baseRoute[notification.notificationType]}/${action}`;
  };

  const renderNotificationText = (notification, userId) => {
    const sender = userId === notification?.notificationBy?._id
      ? "You"
      : notification?.notificationBy?.basicDetails;
    
    const receiver = userId === notification?.notificationTo?._id
      ? "You"
      : notification?.notificationTo?.basicDetails;

    let action = "";

    if (notification?.notificationBy?._id === userId) {
      switch (notification.notificationType) {
        case 'interestsent':
          action = "sent the interest request to";
          break;
        case 'profilesent':
          action = "sent the profile request to";
          break;
        case 'profileaccepted':
          action = "accepted the profile request from";
          break;
        case 'interestaccepted':
          action = "accepted the interest request from";
          break;
        default:
          action = notification.notificationText.split("/")[1];
          break;
      }
    } else if (notification?.notificationTo?._id === userId) {
      switch (notification.notificationType) {
        case 'interestsent':
          action = "you recieved the interest request from";
          break;
        case 'profilesent':
          action = "you recieved the profile request from";
          break;
        case 'profileaccepted':
          action = "your profile request was accepted by";
          break;
        case 'interestaccepted':
          action = "your interest request was accepted by";
          break;
        default:
          action = notification.notificationText.split("/")[1];
          break;
      }
    } else {
      action = notification.notificationText.split("/")[1];
    }

    const notificationText = `${sender} ${action} ${receiver}`;
  
  // Reverse the text if the notification._id is equal to userId
  if (notification?.notificationTo?._id === userId) {
    // const reversedAction = action.replace("to", "from").replace("from", "to");
    // return `${receiver} ${action} ${sender}`;
    return `${action} ${sender}`;
  }

  return notificationText;
  };
 
  return (
    <Link to={getLink()}  >
   <span className={`flex items-center gap-2 py-3 pt-6 `}>
        <img
          src={notification?.notificationBy?.selfDetails?.profilePictureUrl}
          alt=""
          className="w-9 h-9  rounded-full border border-primary"
        />
        <p onClick={handleNotificationClick} className= {`text-black font-DMsans text-[15px]  ${clicked ? 'text-black' : 'text-black'}`}>
          {renderNotificationText(notification, userId)}
        </p>
      </span>
      <hr className="border border-[#e9e9e9]" />
    </Link>
  );
};

const NotificationReceiver = () => {
  const { userId } = useSelector(userDataStore);
  const { isThere } = useSelector(notificationStore);
   const [loading, setLoading] = useState(true); 
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  dispatch(isNotNotification());
  useEffect(() => {
    // Establish a socket connection for the current user
    const socket = io(import.meta.env.VITE_APP_DEV_BASE_URL);

    // Function to handle incoming notifications
    const handleNotification = (notification) => {
      console.log(notification);
      dispatch(isNotification());
      // setNotifications((prevNotifications) => [
      //   ...prevNotifications,
      //   notification,
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      
    };

    // Subscribe to the notification channel for the current user
    socket.on(`notification/${userId}`, handleNotification);

    // Clean up the socket event listener and disconnect when the component unmounts
    return () => {
      socket.off(`notification/${userId}`, handleNotification);
      dispatch(isNotNotification());
      socket.disconnect();
    };
  }, [userId]); // Include userId in the dependency array
  console.log(isThere);
  const getNotifications = async () => {
    try {
      const response = await apiurl.get(`/user-notification-data/${userId}`);
      setNotifications(response.data);
       setLoading(false);
    } catch (err) {
     setLoading(false);
     }
  };

  const removeLastTwoWords = (text) => {
    const words = text.split(' ');
    return words.slice(0, -2).join(' ');
  };

  useEffect(() => {
    getNotifications();
  }, [userId]);


  return (
    <>
      <Header />

      <BackArrow
        LinkData="/user-dashboard"
        className="absolute md:ml-24 md:mt-28 sm:mt-28 w-full md:w-52 overflow-hidden "
      />
      <div className="shadow md:px-9 py-3 pb-20 px-6 mb-36 md:mb-16 md:mx-60 my-5 rounded-lg  sm:mt-36 sm:mb-9 md:mt-44 mt-32 mx-6">
        <h2 className="text-primary font-semibold font-montserrat py-7 text-[22px]">
          Notifications
        </h2>
         {loading ? (
          <>
          <div className="mx-3 mt-9">
      <Skeleton height={50} />
    </div>
    <div className="mx-3 mt-9">
      <Skeleton height={50} />
    </div>
    <div className="mx-3 mt-9">
      <Skeleton height={50} />
    </div>
    <div className="mx-3 mt-9">
      <Skeleton height={50} />
    </div>
    <div className="mx-3 mt-9">
      <Skeleton height={50} />
    </div>
  
    <div className="mx-52 mt-20">
              <Loading />
            </div>
    </>
        ) : (
        <div className="flex flex-col">
          {notifications?.map((notification, index) => (
            <NotificationLink
              notification={notification}
              userId={userId}
              index={index}
              key={notification._id}
            />
          ))}
        </div>
            )}
      </div>
    </>
  );
};

export default NotificationReceiver;
