import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import Header from "../../components/Header";
import ChatSidebar from "./ChatSidebar";
import DataNotFound from "../../components/DataNotFound";
import DeleteChatPopup from "./DeleteChatPopUp";

import ReportPopup from "./ReportPopUp";
import { IoMdThumbsDown } from "react-icons/io";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [recieverVisible, setRecieverVisible] = useState(false);
  const menuRef = useRef(null);
  const recRef = useRef(null);
  const [isDeleteChatOpen, setIsDeleteChatOpen] = useState(false);
  const [isDeleteReportOpen, setIsDeleteReportOpen] = useState(false);

  const openDeleteReportPopup = () => {
    setIsDeleteReportOpen(true);
  };

  const closeDeleteReport = () => {
    setIsDeleteReportOpen(false);
  };
  const openDeleteChatPopup = () => {
    setIsDeleteChatOpen(true);
  };

  const closeDeleteChat = () => {
    setIsDeleteChatOpen(false);
  };
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMenuVisible(false);
  };

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuReciever = () => {
    setRecieverVisible(!recieverVisible);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } 
    else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputMessage("");
  };

  const chatUsers = [
    {
      profilePictureUrl: "https://example.com/profile1.jpg",
      name: "Alice Smith",
      userId: "CSIDPN2356003",
      time: " 10:00 AM",
    },
    {
      profilePictureUrl: "https://example.com/profile2.jpg",
      name: "Bob Johnson",
      userId: "CSIDPN2356003",
      time: " 10:05 AM",
    },
    {
      profilePictureUrl: "https://example.com/profile3.jpg",
      name: "Charlie Brown",
      userId: "CSIDPN2356003",
      time: " 10:10 AM",
    },
    {
      profilePictureUrl: "https://example.com/profile4.jpg",
      name: "David Wilson",
      userId: "CSIDPN2356003",
      time: " 10:15 AM",
    },
    {
      profilePictureUrl: "https://example.com/profile5.jpg",
      name: "Eve Davis",
      userId: "CSIDPN2356003",
      time: " 10:20 AM",
    },
  ];

  return (
    <>
      <Header />
      <div className="flex ">
        <span className="fixed mt-16 overflow-y-scroll h-[90%] scrollbar-hide">
          <ChatSidebar chatUsers={chatUsers} onSelectUser={handleSelectUser} />
        </span>
        <span className="ml-[35%]">
          {selectedUser ? (
            <>
              <div className="bg-primary relative items-center font-DMsans mt-32 w-[120vh] rounded-2xl px-9 py-3">
                <span className="flex items-center">
                  <span>
                    <img
                      src={selectedUser.profilePictureUrl}
                      onError={(e) =>
                        (e.target.src =
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo88hNln0LTch7KlXro5JEeSFWUJqBVAxgEtagyZq9g&s")
                      }
                      alt=""
                      className="rounded-full w-12 h-12 "
                    />
                  </span>
                  <span className="flex flex-col mx-3 text-white ">
                    <p>{selectedUser.name}</p>
                    <p className="font-thin text-[12px]">Active Now</p>
                  </span>
                  <span
                    className="text-white text-[23px] cursor-pointer absolute right-6"
                    onClick={openDeleteReportPopup}
                  >
                    <IoMdThumbsDown />
                  </span>
                </span>
              </div>

              <div className="items-center text-white bg-[#fcfcfc] h-[20rem] mt-2 rounded-lg overflow-y-scroll scrollbar-hide">
              {/* //sender messages */}
                <span className="flex justify-end mt-3 mx-3 ">
                  <span className="flex items-center  bg-primary rounded-md">
                    <p className="p-2   text-white">Hey, Buddy</p>

                    <span
                      onClick={handleMenuToggle}
                      className="text-white pr-1 cursor-pointer"
                    >
                      <BsThreeDotsVertical />
                    </span>
                    {menuVisible && (
                      <div
                        ref={menuRef}
                        className="absolute z-30 right-16 top-28 bg-white  text-black rounded-lg shadow-lg p-3"
                      >
                        <p className=" my-1 cursor-pointer hover:bg-[#ffdcdc] px-2 hover:rounded-md py-1">
                          Edit
                        </p>
                        <p
                          onClick={openDeleteChatPopup}
                          className=" my-1 cursor-pointer hover:bg-[#ffdcdc] px-2 hover:rounded-md py-1"
                        >
                          Delete Chat
                        </p>
                      </div>
                    )}
                  </span>
                </span>
                {/* //Recieved messages */}
                <span className="flex justify-start mt-3 mx-3 ">
                  <span className="flex items-center  bg-[#ffdcdc] rounded-md relative">
                 

                    <span
                      onClick={handleMenuReciever}
                      className="text-black pl-1 cursor-pointer"
                    >
                      <BsThreeDotsVertical />
                    </span>
                    {recieverVisible && (
                      <div
                        ref={menuRef}
                        className="absolute z-30 w-36 left-0 top-12 bg-white  text-black rounded-lg shadow-lg p-3"
                      >
                        
                        <p
                          onClick={openDeleteChatPopup}
                          className=" my-1 cursor-pointer hover:bg-[#ffdcdc] px-2 hover:rounded-md py-1"
                        >
                          Delete Chat
                        </p>
                      </div>
                    )}
                    <p className="p-2   text-black">Hey, Buddy</p>
                  </span>
                </span>
              </div>
              <span className="relative ">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="bg-[#FCFCFC] py-5 mt-5 w-full rounded-md placeholder:font-DMsans placeholder:font-extralight focus:outline-none px-3"
                    placeholder="Enter Messages..."
                  />
                  <button
                    type="submit"
                    className="absolute right-3 text-[33px] mt-9 text-primary cursor-pointer"
                  >
                    <MdSend />
                  </button>
                </form>
              </span>
            </>
          ) : (
            <DataNotFound
              className="flex flex-col items-center md:ml-36 mt-11 sm:ml-28 sm:mt-20 md:mt-52"
              message="Select a contact to start chat"
              linkText="Explore your perfect matches"
              linkDestination="/all-matches"
            />
          )}
        </span>
      </div>
      <DeleteChatPopup
        isDeleteChatOpen={isDeleteChatOpen}
        closeDeleteChat={closeDeleteChat}
      />
      <ReportPopup
        isDeleteReportOpen={isDeleteReportOpen}
        closeDeleteReport={closeDeleteReport}
      />
    </>
  );
};

export default Chat;
