import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const Match = () => {
  const path = window.location.pathname;
  return (
    <>
      <Header />
      
      <div className="flex  md:justify-center  sm:justify-start justify-start items-center gap-9  md:mt-36 sm:mt-36 mt-9 md:gap-16 overflow-x-scroll mx-6 sm:mx-9  md:overflow-hidden scrollbar-hide  sm:gap-10  ">
        <Link to="/all-matches">
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9  font-medium md:px-6 sm:px-6 w-40 text-center  py-2 cursor-pointer ${
              path === "/all-matches" && "active"
            }`}
          >
            All matches
          </p>
        </Link>
        <Link to="/new-join">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 font-medium md:px-6 sm:px-6 w-44 px-6 text-center py-2 cursor-pointer ${
              path === "/new-join" && "active"
            }`}
          >
            Recently Joined
          </p>{" "}
        </Link>
        <Link to="/shortlisted">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 py-2 font-medium md:px-6 sm:px-6 sm:w-48 w-52 px-6  text-center cursor-pointer ${
              path === "/shortlisted" && "active"
            }`}
          >
            Shortlisted By You
          </p>{" "}
        </Link>
        
        <Link to="/search-results">
          {" "}
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 py-2 font-medium md:px-6 sm:px-6 w-44 px-6  text-center  cursor-pointer ${
              path === "/search-results" && "active"
            }`}
          >
            Search Results
          </p>{" "}
        </Link>
      </div>
        

    </>
  );
};

export default Match;
