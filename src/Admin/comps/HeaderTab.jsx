import React from "react";

import { Link } from "react-router-dom";

const HeaderTab = () => {
  const path = window.location.pathname;
  return (
    <>

      
      <div className="flex  md:justify-start sm:justify-start justify-start items-center gap-9  md:mt-9 sm:mt-9  mt-9 md:gap-16 overflow-x-scroll mx-6 sm:mx-9 scrollbar-hide  sm:gap-10  ">
       


      <Link to="/admin/active-users">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 font-medium md:px-6 sm:px-6 w-44 px-6 text-center py-2 cursor-pointer ${
              path === "/admin/active-users" && "active"
            }`}
          >
            Active Users
          </p>{" "}
        </Link>
        <Link to="/admin/male-users">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 font-medium md:px-6 sm:px-6 w-44 px-6 text-center py-2 cursor-pointer ${
              path === "/admin/male-users" && "active"
            }`}
          >
            Male Users
          </p>{" "}
        </Link>
        <Link to="/admin/female-users">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 py-2 font-medium md:px-6 sm:px-6 sm:w-48 w-52 px-6  text-center cursor-pointer ${
              path === "/admin/female-users" && "active"
            }`}
          >
            Female Users
          </p>{" "}
        </Link>
        
        <Link to="/admin/successfull-married">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 py-2 font-medium md:px-6 sm:px-6 w-52 px-6  text-center  cursor-pointer ${
              path === "/admin/successfull-married" && "active"
            }`}
          >
            Successful Married
          </p>{" "}
        </Link>

        <Link to="/admin/deleted-users">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 py-2 font-medium md:px-6 sm:px-6 sm:w-48 w-52 px-6  text-center cursor-pointer ${
              path === "/admin/deleted-users" && "active"
            }`}
          >
            Deleted Users
          </p>{" "}
        </Link>
        <Link to="/admin/CategoryA-users">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 py-2 font-medium md:px-6 sm:px-6 sm:w-48 w-52 px-6  text-center cursor-pointer ${
              path === "/admin/CategoryA-users" && "active"
            }`}
          >
            Category A Users
          </p>{" "}
        </Link>
        <Link to="/admin/categoryB-users">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 py-2 font-medium md:px-6 sm:px-6 sm:w-48 w-52 px-6  text-center cursor-pointer ${
              path === "/admin/categoryB-users" && "active"
            }`}
          >
            Category B
          </p>{" "}
        </Link>
        <Link to="/admin/categoryC-users">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 py-2 font-medium md:px-6 sm:px-6 sm:w-48 w-52 px-6  text-center cursor-pointer ${
              path === "/admin/categoryC-users" && "active"
            }`}
          >
            Category C
          </p>{" "}
        </Link>
        <Link to="/admin/uncategorised-users">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 py-2 font-medium md:px-6 sm:px-6 sm:w-48 w-52 px-6  text-center cursor-pointer ${
              path === "/admin/uncategorised-users" && "active"
            }`}
          >
        Un-Categorised
          </p>{" "}
        </Link>
      </div>
        

    </>
  );
};

export default HeaderTab;
