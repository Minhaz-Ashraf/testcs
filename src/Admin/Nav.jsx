import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutPop from "../user/PopUps/LogoutPop";

const Nav = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isLogoutOpen, setisLogoutOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openLogoutPopup = () => {
    setisLogoutOpen(true);
  };

  const closeLogout = () => {
    setisLogoutOpen(false);
  };
  
  return (
    <>
      <LogoutPop isLogoutOpen={isLogoutOpen} closeLogout={closeLogout} />
    <div className="bg-primary  px-9 py-9 text-start w-60 h-screen rounded-r-3xl hidden md:block sm:block ">
      <p className="text-white font-montserrat font-medium text-[30px] px-2 py-6">
        Menu
      </p>
      <span>
        <Link to="/admin/dashboard">
          {" "}
          <p
            className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] "  ${
              path === "/admin/dashboard" && "adminnav"
            }`}
          >
            Dashboard
          </p>
        </Link>
        <Link to="/admin/user">
          {" "}
          <p
            className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3 mt-6 rounded-xl text-[17px]  ${
              path === "/admin/user" && "adminnav"
            }`}
          >
            All Users
          </p>
        </Link>
        <Link to="/admin/currency-value">
          {" "}
          <p
            className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] ${
              path === "/admin/currency-value" && "adminnav"
            }`}
          >
            Currency Value
          </p>
        </Link>
        <Link to="/admin/approval-lists">
          {" "}
          <p
            className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] ${
              path === "/admin/approval-lists" && "adminnav"
            }`}
          >
            Approval Page
          </p>
        </Link>
        <Link to="/admin/notifications">
          {" "}
          <p
            className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] ${
              path === "/admin/notifications" && "adminnav"
            }`}
          >
            Notifications
          </p>
        </Link>
        <Link to="/admin/report-lists">
          {" "}
          <p
            className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] ${
              path === "/admin/report-lists" && "adminnav"
            }`}
          >
            Manage Reports
          </p>
        </Link>
        <Link to="">
          {" "}
          <p  onClick={openLogoutPopup} className=" cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px]">
            Logout
          </p>
        </Link>
      </span>
    </div>
    </>

    
  );
};



// {isPopupOpen && (
//   <div
//     className={`fixed inset-0 flex  sidebar-anim   z-50  font-poppins overflow-y-scroll scrollbar-hide   ${ isPopupOpen ? "block" : "hidden"
//       }`}
//   >
//     <div className=" w-1/2   relative">
//       <button
//         className="     cursor-pointer text-[39px] left-36 sm:left-[38vh] mt-5 absolute text-primary"
//         onClick={closePopup}
//       >
//         <IoClose />
//       </button>
//     </div>

//     <div className="bg-[#FCFCFC] w-full rounded-l-3xl overflow-y-scroll">
//     <p className="text-white font-montserrat font-medium text-[30px] px-2 py-6">
//         Menu
//       </p>
//       <span>
//         <Link to="/admin/dashboard">
//           {" "}
//           <p
//             className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] "  ${
//               path === "/admin/dashboard" && "adminnav"
//             }`}
//           >
//             Dashboard
//           </p>
//         </Link>
//         <Link to="/admin/user">
//           {" "}
//           <p
//             className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3 mt-6 rounded-xl text-[17px]  ${
//               path === "/admin/user" && "adminnav"
//             }`}
//           >
//             All Users
//           </p>
//         </Link>
//         <Link to="/currency-value">
//           {" "}
//           <p
//             className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] ${
//               path === "/admin/currency-value" && "adminnav"
//             }`}
//           >
//             Currency Value
//           </p>
//         </Link>
//         <Link to="/admin/approval-lists">
//           {" "}
//           <p
//             className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] ${
//               path === "/admin/approval-lists" && "adminnav"
//             }`}
//           >
//             Approval Page
//           </p>
//         </Link>
//         <Link to="/admin/notifications">
//           {" "}
//           <p
//             className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] ${
//               path === "/admin/notifications" && "adminnav"
//             }`}
//           >
//             Notifications
//           </p>
//         </Link>
//         <Link to="/admin/report-lists">
//           {" "}
//           <p
//             className={` cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] ${
//               path === "/admin/report-lists" && "adminnav"
//             }`}
//           >
//             Manage Reports
//           </p>
//         </Link>
//         <Link to="">
//           {" "}
//           <p  onClick={openLogoutPopup} className=" cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px]">
//             Logout
//           </p>
//         </Link>
//       </span>
// </div>
//     </div>
//      )
//     }

export default Nav;
