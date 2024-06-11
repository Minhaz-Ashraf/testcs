import React, { useState } from "react";
import Header from "../../components/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";

const IdSearch = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const location = useLocation();
  const { idData } = location.state || {};
  console.log(idData);
  const [searchId, setSearchId] = useState(idData || ""); // Corrected useState usage
  const handleSubmit = () => {
    console.log("Form Submitted");
    navigate("/search-results", { state: { searchId: searchId, source: 'searchbyid' } });
  };
  return (
    <>
      <Header />
      <div className="flex justify-center items-center md:gap-16 md:mt-36 mt-20 sm:mt-44 sm:gap-16">
        <Link to="/searchbyid">
          <p
            className={`bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 font-medium px-6 py-2 cursor-pointer ${
              path === "/searchbyid" && "active"
            }`}
          >
            Search By Profile ID
          </p>
        </Link>
        <Link to="/basic-search">
          <p className="bg-[#FCFCFC] rounded-xl hover:bg-primary hover:text-white mb-9 font-medium px-6 py-2 cursor-pointer">
            Basic Search
          </p>
        </Link>
      </div>
      <div className="md:w-1/2 shadow md:absolute mx-6 md:mx-0 sm:mx-36 mb-2 mt-5 left-[25%] py-5 rounded-lg">
        <span className="flex justify-center items-center "> 
          <div className="input-container w-1/2 ">
            <input
              className="input-field "
              placeholder="Search by ID"
              type="text"
              name="searchId"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <label htmlFor="input-field" className="input-label">
              Search by ID
            </label>
            <span className="input-highlight" />
          </div>
        </span>

        <div
          className="flex justify-center items-center mt-12 mb-16"
          onClick={handleSubmit}
        >
          <span className="bg-primary px-12 py-2 text-[16px] text-white rounded-xl cursor-pointer">
            Search
          </span>
        </div>
      </div>
    </>
  );
};

export default IdSearch;
