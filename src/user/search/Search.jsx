import React from "react";
import Header from "../../components/Header";
import BasicSearch from "./IdSearch.jsx";
import AdvanceSearch from "./BasicSearch.jsx";

const Search = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-cente ">
        <span>
          <p className="bg-[#FCFCFC] rounded-lg hover:bg-primary hover:text-white mb-6 font-medium px-3 py-1 cursor-pointer">
            Search By Profile ID
          </p>
          <BasicSearch />
        </span>

        <span>
          <AdvanceSearch />
        </span>
      </div>
    </>
  );
};

export default Search;
