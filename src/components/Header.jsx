import React, { useState } from "react";
import { logo, menu } from "../assets/index";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { GiLovers } from "react-icons/gi";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { BsChatLeftText, BsFillGrid1X2Fill } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { HiMenu } from "react-icons/hi";
import { notificationStore } from "../Stores/slices/notificationslice";
import { useSelector } from "react-redux";

import MobileSidebar from "../user/Dashboard/MobileSidebar";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isPopupOpen, setPopupOpen] = useState(false);
  const {isThere} = useSelector(notificationStore);


  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  return (
    <>
      <nav className="md:px-6 px-6 bg-[#FCFCFC] navshadow hidden md:block sm:block fixed  w-full  z-30">
        <div className="flex items-center ">
          <Link to="/user-dashboard">
            <img src={logo} alt="logo" className="md:w-28 w-[9vh] pt-2" />
          </Link>
          <span className="md:block sm:block hidden">
            <ul className="flex items-center text-[16px] font-semibold absolute md:right-12 sm:right-5 md:gap-3 top-8">
              <Link to="/user-dashboard">
                <li
                  className={`cursor-pointer flex items-center hover:bg-secondary hover:text-white rounded-lg px-2 py-1 ${
                    (path === "/user-dashboard" ||
                      path === "/partner-edit" ||
                      path === "/profile" ||
                      path === "/image-edit"||
                      path === "/settings/contact-info"||
                      path === "/settings/delete-profile"||
                      path === "/settings/phonenumber"||
                      path === "/settings/email") &&
                    "activeheader"
                  }`}
                >
                  <span className="pe-2">
                    <BsFillGrid1X2Fill size={22} />
                  </span>
                  Dashboard
                </li>
              </Link>
              <Link to="/searchbyid">
                <li
                  className={`cursor-pointer flex items-center hover:bg-secondary hover:text-white rounded-lg px-2 py-1 ${
                    (path === "/basic-search" ||
                      path.includes("/searchbyid")) &&
                    "activeheader"
                  }`}
                >
                  <span className="pe-2">
                    <IoSearchSharp size={23} />
                  </span>
                  Search
                </li>
              </Link>
              <Link to="/all-matches">
                <li
                  className={`cursor-pointer flex items-center hover:bg-secondary hover:text-white rounded-lg px-3 py-1 ${
                    (path === "/all-matches" ||
                      path.includes("/new-join") ||
                      path.includes("/new-join") ||
                      path.includes("/shortlisted") ||
                      path.includes("/search-result")) &&
                    "activeheader"
                  }`}
                >
                  <span className="px-2">
                    <GiLovers size={23} />
                  </span>
                  Matches
                </li>
              </Link>
              <Link to="/inbox/profiles/recieved">
                <li
                  className={`cursor-pointer flex items-center hover:bg-secondary hover:text-white rounded-lg px-3 py-1 ${
                    path === "/inbox/profiles/recieved" ||
                    path.includes("/inbox/profiles/sent") ||
                    path.includes("/inbox/profiles/accepted") ||
                    path.includes("/inbox/profiles/declined") ||
                    path.includes("/inbox/interests/recieved") ||
                    path.includes("/inbox/interests/sent") ||
                    path.includes("/inbox/interests/accepted") ||
                    path.includes("/inbox/interests/declined")
                      ? "activeheader"
                      : ""
                  }`}
                >
                  <span className="px-2">
                    <HiOutlineInboxArrowDown size={23} />
                  </span>
                  Inbox
                </li>
              </Link>
              <Link to="/chat">
                <li
                  className={`cursor-pointer flex items-center hover:bg-secondary hover:text-white rounded-lg px-3 py-1 ${
                    path === "/chat" && "activeheader"
                  }`}
                >
                  <span className="px-2">
                    <BsChatLeftText size={20} />
                  </span>
                  Chat
                </li>
              </Link>
              <Link to = "/user-notification">
              <li className={`cursor-pointer flex items-center  rounded-lg px-2 py-1 relative ${
                    path === "/user-notification" && "border border-primary "
                  }`}>
                {isThere === true ? <> <span className=" bg-primary rounded-full  text-white text-[9px] font-light  px-1 absolute right-[1px] top-1">New</span>
   
        
            <GoBell className="text-[30px] " />
    </>
 :  <GoBell className="text-[28px] " />}
              </li>
              </Link>
            </ul>
          </span>
        </div>
      </nav>

      {/* responsive navigation header-bottom */}
      <div className="px-5 w-screen bottom-5 fixed  z-30">
        <div className="sm:hidden md:hidden xl:hidden ss:hidden bg-primary rounded-3xl py-5">
          <ul className="flex items-center justify-evenly">
            <Link to="/user-dashboard">
              <li
                className={`flex items-center text-white cursor-pointer ${
                   (location.pathname === "/user-dashboard"||
                      location.pathname === "/partner-edit" ||
                      location.pathname === "/profile" ||
                      location.pathname === "/image-edit"||
                      location.pathname === "/settings/contact-info"||
                      location.pathname === "/settings/delete-profile"||
                          location.pathname === "/settings/block-profile"||
                      location.pathname === "/settings/phonenumber"||
                      location.pathname === "/settings/email" ) &&
                  "activeheader-mobile"
                }`}
              >
                <BsFillGrid1X2Fill  className="w-6 h-6 mr-1" />
                { (location.pathname === "/user-dashboard"||
                  location.pathname === "/partner-edit" ||
                      location.pathname === "/profile" ||
                      location.pathname === "/image-edit"||
                      location.pathname === "/settings/contact-info"||
                      location.pathname === "/settings/block-profile"||
                      location.pathname === "/settings/delete-profile"||
                      location.pathname === "/settings/phonenumber"||
                      location.pathname === "/settings/email" ) && <span>Dashboard</span>}
              </li>
            </Link>
            <Link to="/searchbyid">
              <li
                className={`flex items-center text-white cursor-pointer ${
                  (location.pathname === "/basic-search" ||
                     location.pathname === "/searchbyid" ) &&
                    "activeheader-mobile"
                }`}
              >
                <IoSearchSharp className="w-6 h-6 mr-1" />
                {(location.pathname === "/basic-search" || location.pathname === "/searchbyid") && <span>Search</span>}
              </li>
            </Link>
            <Link to="/all-matches">
              <li
                className={`flex items-center text-white cursor-pointer ${
                  (location.pathname === "/all-matches" ||
                    path.includes("/new-join") ||
                    path.includes("/new-join") ||
                    path.includes("/shortlisted") ||
                    path.includes("/search-result")) &&
                  "activeheader-mobile"
                }`}
              >
                <GiLovers className="w-6 h-6 mr-1" />
                {(location.pathname === "/all-matches" ||
                  path.includes("/new-join") ||
                  path.includes("/new-join") ||
                  path.includes("/shortlisted") ||
                  path.includes("/search-result")) &&
                  "activeheader-mobile" && <span>Matches</span>}
                `
              </li>
            </Link>
            <Link to="/inbox/profiles/recieved">
              <li
                className={`flex items-center text-white cursor-pointer ${
                  (location.pathname === "/inbox/profiles/recieved" ||
                    path.includes("/inbox/profiles/sent") ||
                    path.includes("/inbox/profiles/accepted") ||
                    path.includes("/inbox/profiles/declined") ||
                    path.includes("/inbox/interests/recieved") ||
                    path.includes("/inbox/interests/sent") ||
                    path.includes("/inbox/interests/accepted") ||
                    path.includes("/inbox/interests/declined")) &&
                  "activeheader-mobile"
                }`}
              >
                <HiOutlineInboxArrowDown className="w-6 h-6 mr-1" />
                {(location.pathname === "/inbox/profiles/recieved" ||
                  path.includes("/inbox/profiles/sent") ||
                  path.includes("/inbox/profiles/accepted") ||
                  path.includes("/inbox/profiles/declined") ||
                  path.includes("/inbox/interests/recieved") ||
                  path.includes("/inbox/interests/sent") ||
                  path.includes("/inbox/interests/accepted") ||
                  path.includes("/inbox/interests/declined")) && (
                  <span>Inbox</span>
                )}
              </li>
            </Link>
            <Link to="/chat">
              <li
                className={`flex items-center text-white cursor-pointer ${
                  location.pathname === "/chat" && "activeheader-mobile"
                }`}
              >
                <BsChatLeftText className="w-5 h-5 mr-1" />
                {location.pathname === "/chat" && <span>Chat</span>}
              </li>
            </Link>
          </ul>
        </div>
      </div>

      {/* //responsive header-top */}

      <span className="md:hidden sm:hidden  flex justify-between items-center mx-6 mt-1  ">
        <Link to="/user-dashboard ">
          <img src={logo} alt="logo" className="md:w-[17vh] w-[13vh] pt-2 " />
        </Link>
        <span className="flex items-center gap-6 relative">
          <span className=" border  rounded-full w-[10px] h-[10px] absolute right-[63px] top-1"></span>
          <Link to = "/user-notification">
              <li className={`cursor-pointer flex items-center  rounded-lg px-2 py-1 relative ${
                    path === "/user-notification" && "border border-primary "
                  }`}>
                {isThere === true ? <> <span className=" bg-primary rounded-full  text-white text-[9px] font-light  px-1 absolute right-[1px] top-1">New</span>
   
        
            <GoBell className="text-[30px] " />
    </>
 :  <GoBell className="text-[28px] " />}
              </li>
              </Link>

          <HiMenu
            onClick={openPopup}
            src={menu}
            className="text-[35px]"
            alt="menu"
          />
        </span>
      </span>

      <span className="mt-8 ">
        <MobileSidebar isPopupOpen={isPopupOpen} closePopup={closePopup} />
      </span>
    </>
  );
};

export default Header;
