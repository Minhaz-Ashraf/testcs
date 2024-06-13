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
import { logo } from "../../assets";

const NotificationReceiver = () => {
  const { userId } = useSelector(userDataStore);
  const { isThere } = useSelector(notificationStore);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  dispatch(isNotNotification());
  useEffect(() => {
    // Establish a socket connection for the current user
    const socket = io("https://admincs.gauravdesign.com");

    // Function to handle incoming notifications
    const handleNotification = (notification) => {
      console.log(notification);
      dispatch(isNotification());
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
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
    } catch (err) {}
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
        <div className="flex flex-col">
          {notifications?.map((notification, index) => (
            <Link
              to={`${
                notification.notificationType === "profilesent"
                  ? "/inbox/profiles/sent"
                  : notification.notificationType === "profileaccepted"
                  ? "/inbox/profiles/accepted"
                  : notification.notificationType === "interestsent"
                  ? "/inbox/interests/sent"
                  : "/inbox/interests/accepted"
              }`}
              key={index}
            >
              <span className="flex items-center gap-2  py-3 pt-6 ">
                <img
                  src={
                    notification?.notificationBy?.selfDetails?.profilePictureUrl
                  }
                  alt=""
                  className="w-9 h-9  rounded-full border border-primary"
                />
                <p className="text-black font-DMsans text-[15px] ">
                  {" "}
                  {userId === notification?.notificationBy?._id
                    ? "You"
                    : notification?.notificationBy?.basicDetails}
                  {notification.notificationText.split("/")[1]}{" "}
                  {userId === notification?.notificationTo?._id
                    ? notification?.notificationTo?.basicDetails
                    : "You"}
                </p>
              </span>
              <hr className="border border-[#e9e9e9]" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationReceiver;
